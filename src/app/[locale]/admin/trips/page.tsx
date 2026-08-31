import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminTripsPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  let trips: any[] = [];
  try {
    trips = await prisma.trip.findMany({
      orderBy: { createdAt: "desc" },
      include: { destination: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-[30px]">
        <h1 className="text-[32px] font-serif font-bold text-ink">Manage Trips</h1>
        <a href="/en/admin/trips/new" className="bg-ink text-white px-[20px] py-[10px] rounded-full text-sm font-bold hover:bg-black transition-colors">
          + New Trip
        </a>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        {trips.length > 0 ? trips.map((trip: any) => (
          <div key={trip.id} className="bg-white p-[20px] rounded-[16px] shadow-sm flex flex-col sm:flex-row gap-[20px]">
            <div className="flex-1">
              <div className="text-xs text-muted uppercase tracking-wider font-bold mb-[5px]">
                {trip.destination?.name}
              </div>
              <h3 className="font-serif text-[20px] font-bold mb-[10px]">{trip.title}</h3>
              <div className="text-sm text-muted mb-[15px]">
                {trip.duration} A {trip.currency} {trip.price}
              </div>
              
              <div className="flex gap-[10px] items-center">
                <span className={`px-[10px] py-[4px] rounded-full text-xs font-bold ${
                  trip.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  trip.status === 'WAITLIST' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trip.status}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-[10px] justify-center sm:border-l sm:border-line sm:pl-[20px]">
              <a href={`/en/admin/trips/${trip.id}`} className="text-sm text-center text-ink border border-line px-[15px] py-[8px] rounded-lg hover:bg-gray-50">
                Edit
              </a>
            </div>
          </div>
        )) : (
          <div className="p-[30px] text-muted text-center col-span-2">No trips found.</div>
        )}
      </div>
    </div>
  );
}
