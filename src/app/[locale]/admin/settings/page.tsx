import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { updateSettingsAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";

const prisma = new PrismaClient();

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let settings: Record<string, string> = {};
  const dbSettings = await prisma.siteSetting.findMany();
  dbSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[32px] font-serif font-bold text-ink">Site Settings</h1>
      </div>
      
      <div className="max-w-[800px] bg-white p-[30px] rounded-[16px] shadow-sm">
        <form action={updateSettingsAction} className="flex flex-col gap-[30px]">
          
          {/* HERO IMAGE SETTING */}
          <div className="border border-line rounded-xl p-[20px]">
            <h2 className="font-serif text-[22px] font-bold mb-[10px]">Homepage Hero Image</h2>
            <p className="text-sm text-muted mb-[15px]">This is the large background image at the very top of the homepage.</p>
            
            {settings.heroImage && (
              <div className="mb-[15px]">
                <img src={settings.heroImage} alt="Current Hero" className="w-full h-[200px] object-cover rounded-lg" />
              </div>
            )}
            
            <input 
              type="file" 
              name="heroImage" 
              accept="image/*" 
              className="w-full p-[10px] border border-line rounded-[8px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
            />
          </div>

          {/* STORY IMAGE SETTING */}
          <div className="border border-line rounded-xl p-[20px]">
            <h2 className="font-serif text-[22px] font-bold mb-[10px]">Story Section Image</h2>
            <p className="text-sm text-muted mb-[15px]">This is the image displayed next to "Go somewhere worth remembering".</p>
            
            {settings.storyImage && (
              <div className="mb-[15px]">
                <img src={settings.storyImage} alt="Current Story" className="w-[300px] h-[300px] object-cover rounded-lg" />
              </div>
            )}
            
            <input 
              type="file" 
              name="storyImage" 
              accept="image/*" 
              className="w-full p-[10px] border border-line rounded-[8px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
