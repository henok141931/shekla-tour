import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { updateTripAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";

const prisma = new PrismaClient();

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { id },
  });

  if (!trip) {
    return <div className="p-10">Trip not found</div>;
  }

  return (
    <div className="max-w-[600px] bg-white p-[30px] rounded-[16px] shadow-sm">
      <h1 className="text-[28px] font-serif font-bold text-ink mb-[20px]">Edit Trip</h1>
      
      <form action={updateTripAction} className="flex flex-col gap-[20px]">
        <input type="hidden" name="id" value={trip.id} />
        
        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Trip Title</label>
          <input type="text" name="title" defaultValue={trip.title} className="w-full p-[12px] border border-line rounded-[8px]" required />
        </div>

        <div className="grid grid-cols-2 gap-[20px]">
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Price (ETB)</label>
            <input type="number" name="price" defaultValue={trip.price || 0} className="w-full p-[12px] border border-line rounded-[8px]" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-[5px]">Duration</label>
            <input type="text" name="duration" defaultValue={trip.duration || ""} className="w-full p-[12px] border border-line rounded-[8px]" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-[5px]">Status</label>
          <select name="status" defaultValue={trip.status} className="w-full p-[12px] border border-line rounded-[8px]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="WAITLIST">WAITLIST</option>
            <option value="SOLD_OUT">SOLD_OUT</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="border-t border-line pt-[20px] mt-[10px]">
          <ImageUploader 
            name="image" 
            defaultImage={trip.image || undefined}
            label="Update Cover Image" 
            helperText="Upload a new image to replace the current one." 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
