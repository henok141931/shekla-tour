import { Navigation } from "@/components/Navigation";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";

const prisma = new PrismaClient();

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let trip = null;
  
  try {
    trip = await prisma.trip.findUnique({
      where: { slug },
      include: { destination: true },
    });
  } catch (e) {
    console.error(e);
  }

  // Fallback for demo when DB is empty/unconnected
  if (!trip) {
    if (slug === "wenchi-highland-escape") {
      trip = {
        id: "demo-1",
        title: "Wenchi Highland Escape",
        destination: { name: "Wenchi Crater Lake" },
        duration: "3 days",
        price: 4500,
        currency: "ETB",
        status: "ACTIVE",
        inclusions: ["Guide", "Transport", "Meals"],
        exclusions: ["Personal expenses"],
      } as any;
    } else {
      notFound();
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-[120px] pb-[80px] bg-paper min-h-screen">
        <div className="max-w-container">
          <div className="bg-white p-[40px] rounded-[24px] shadow-sm max-w-[800px] mx-auto">
            <div className="eyebrow mb-[10px] text-muted">{trip.destination?.name}</div>
            <h1 className="text-[48px] font-serif font-bold mb-[20px]">{trip.title}</h1>
            
            <div className="grid grid-cols-3 gap-[10px] mb-[40px]">
              <div className="bg-[#e8e3d9] p-[14px] rounded-[12px]">
                <small className="block uppercase tracking-[0.1em] text-[8px] text-muted">Duration</small>
                <strong className="block mt-[4px] text-[13px]">{trip.duration}</strong>
              </div>
              <div className="bg-[#e8e3d9] p-[14px] rounded-[12px]">
                <small className="block uppercase tracking-[0.1em] text-[8px] text-muted">Price</small>
                <strong className="block mt-[4px] text-[13px]">{trip.currency} {trip.price}</strong>
              </div>
              <div className="bg-[#e8e3d9] p-[14px] rounded-[12px]">
                <small className="block uppercase tracking-[0.1em] text-[8px] text-muted">Status</small>
                <strong className="block mt-[4px] text-[13px]">{trip.status}</strong>
              </div>
            </div>

            <div className="prose prose-lg mb-[40px]">
              <h3>Inclusions</h3>
              <ul>
                {(() => {
                  try {
                    const incs = typeof trip.inclusions === 'string' ? JSON.parse(trip.inclusions) : trip.inclusions || [];
                    return incs.map((inc: string, i: number) => <li key={i}>{inc}</li>);
                  } catch (e) {
                    return <li>{trip.inclusions}</li>;
                  }
                })()}
              </ul>
            </div>

            <div className="mt-[40px] pt-[30px] border-t border-line">
              <h3 className="font-serif text-[24px] mb-[20px]">
                {trip.status === "ACTIVE" ? "Request to Book" : "Join Waitlist"}
              </h3>
              
              <form className="flex flex-col gap-[15px]" action="/api/leads" method="POST">
                <input type="hidden" name="tripId" value={trip.id} />
                <input type="hidden" name="source" value={trip.status === "ACTIVE" ? "booking" : "waitlist"} />
                <input type="text" name="name" placeholder="Your name" className="p-[14px] rounded-[12px] border border-line w-full" required />
                <input type="email" name="email" placeholder="Email address" className="p-[14px] rounded-[12px] border border-line w-full" required />
                <input type="tel" name="phone" placeholder="Phone number" className="p-[14px] rounded-[12px] border border-line w-full" required />
                <button type="submit" className="bg-green text-white font-bold py-[15px] rounded-full hover:bg-green-light">
                  Continue ↗
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
