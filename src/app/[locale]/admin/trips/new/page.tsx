import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { createTripAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

const prisma = new PrismaClient();

export default async function NewTripPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const destinations = await prisma.destination.findMany();

  return (
    <div className="max-w-[600px] bg-white p-[30px] rounded-[16px] shadow-sm">
      <h1 className="text-[28px] font-serif font-bold text-ink mb-[20px]">Create New Trip</h1>
      
      <form action={createTripAction} className="flex flex-col gap-[20px]">
        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Destination</label>
          <select name="destinationId" className="w-full p-[12px] border border-line rounded-[8px]" required>
            <option value="">Select a destination...</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Trip Title</label>
          <input type="text" name="title" className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Slug (URL friendly name)</label>
          <input type="text" name="slug" className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>

        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Price (ETB)</label>
            <input type="number" name="price" className="w-full p-[12px] border border-line rounded-[8px]" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Duration</label>
            <input type="text" name="duration" placeholder="e.g. 2 Days" className="w-full p-[12px] border border-line rounded-[8px]" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Status</label>
          <select name="status" className="w-full p-[12px] border border-line rounded-[8px]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="WAITLIST">WAITLIST</option>
            <option value="SOLD_OUT">SOLD_OUT</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="border-t border-line pt-[20px] mt-[10px]">
          <ImageUploader 
            name="image" 
            label="Trip Cover Image" 
            helperText="Upload an engaging photo that represents this specific trip." 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
