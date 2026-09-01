import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { createDestinationAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

export default async function NewDestinationPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div className="max-w-[600px] bg-white p-[30px] rounded-[16px] shadow-sm">
      <h1 className="text-[28px] font-serif font-bold text-ink mb-[20px]">Create Destination</h1>
      
      <form action={createDestinationAction} className="flex flex-col gap-[20px]">
        
        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Name</label>
          <input type="text" name="name" className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Slug</label>
          <input type="text" name="slug" className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Description</label>
          <textarea name="description" className="w-full p-[12px] border border-line rounded-[8px] h-[100px]" required />
        </div>

        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Theme</label>
            <input type="text" name="theme" placeholder="e.g. HIGHLANDS" className="w-full p-[12px] border border-line rounded-[8px]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Status</label>
            <select name="isActive" className="w-full p-[12px] border border-line rounded-[8px]">
              <option value="true">Active</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        </div>

        <div className="border-t border-line pt-[20px] mt-[10px]">
          <ImageUploader 
            name="image" 
            label="Destination Cover Image" 
            helperText="Upload an engaging photo that represents this destination." 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
