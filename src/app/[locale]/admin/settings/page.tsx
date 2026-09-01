import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { updateSettingsAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

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
            <ImageUploader 
              name="heroImage" 
              defaultImage={settings.heroImage || undefined}
              helperText="This is the large background image at the very top of the homepage." 
            />
          </div>

          {/* STORY IMAGE SETTING */}
          <div className="border border-line rounded-xl p-[20px]">
            <h2 className="font-serif text-[22px] font-bold mb-[10px]">Story Section Image</h2>
            <ImageUploader 
              name="storyImage" 
              defaultImage={settings.storyImage || undefined}
              helperText="This is the image displayed next to 'Go somewhere worth remembering'." 
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
