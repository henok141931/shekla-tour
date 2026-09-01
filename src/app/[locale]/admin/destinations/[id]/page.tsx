import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { updateDestinationAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

const prisma = new PrismaClient();

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  let dest = null;
  let dbError = "";

  try {
    dest = await prisma.destination.findUnique({
      where: { id },
    });
  } catch (e: any) {
    dbError = e.message || "Unknown DB Error";
  }

  if (dbError) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Database Connection Error</h1>
        <pre className="bg-gray-800 text-red-400 p-4 rounded-lg overflow-auto text-xs">{dbError}</pre>
      </div>
    );
  }

  if (!dest) {
    return <div className="p-10">Destination not found</div>;
  }

  return (
    <div className="max-w-[600px] bg-white p-[30px] rounded-[16px] shadow-sm">
      <h1 className="text-[28px] font-serif font-bold text-ink mb-[20px]">Edit Destination</h1>
      
      <form action={updateDestinationAction} className="flex flex-col gap-[20px]">
        <input type="hidden" name="id" value={dest.id} />
        
        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Name</label>
          <input type="text" name="name" defaultValue={dest.name} className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Description</label>
          <textarea name="description" defaultValue={dest.description} className="w-full p-[12px] border border-line rounded-[8px] h-[100px]" required />
        </div>

        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Theme</label>
            <input type="text" name="theme" defaultValue={dest.theme || ""} placeholder="e.g. HIGHLANDS" className="w-full p-[12px] border border-line rounded-[8px]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Status</label>
            <select name="isActive" defaultValue={dest.isActive ? "true" : "false"} className="w-full p-[12px] border border-line rounded-[8px]">
              <option value="true">Active</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        </div>

        <div className="border-t border-line pt-[20px] mt-[10px]">
          <ImageUploader 
            name="image" 
            defaultImage={dest.heroImage || undefined}
            label="Update Hero Image" 
            helperText="Upload a new image to replace the current one." 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
