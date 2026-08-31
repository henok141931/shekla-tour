import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { updateTripAction } from "@/app/actions/admin";
import { SubmitButton } from "@/components/SubmitButton";

const prisma = new PrismaClient();

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
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
          <label className="block text-sm font-bold text-ink mb-[5px]">Update Cover Image</label>
          <p className="text-xs text-muted mb-[10px]">Upload a new image to replace the current one.</p>
          <input type="file" name="image" accept="image/*" className="w-full p-[10px] border border-line rounded-[8px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          
          {trip.image && (
            <div className="mt-[10px]">
              <p className="text-xs text-muted mb-2">Current Image:</p>
              <img src={trip.image} alt={trip.title} className="w-full h-[150px] object-cover rounded-[8px]" />
            </div>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
