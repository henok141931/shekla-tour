import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { TripCard } from "@/components/TripCard";

const prisma = new PrismaClient();

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: { trips: true },
  });

  if (!destination) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="pt-[150px] pb-[100px] max-w-container mx-auto">
        <div className="mb-[60px]">
          <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-medium mb-[20px]">{destination.name}</h1>
          <p className="text-lg text-muted max-w-[600px]">{destination.description}</p>
        </div>

        <div className="mb-[60px] h-[400px] rounded-[24px] overflow-hidden">
          <img 
            src={destination.heroImage || "/images/image7.jpg"} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-serif text-[32px] font-medium mb-[30px]">Available Escapes in {destination.name}</h2>
        
        <div className="grid gap-[20px]">
          {destination.trips.length > 0 ? (
            destination.trips.map((trip) => (
              <TripCard
                key={trip.id}
                title={trip.title}
                destinationName={destination.name}
                duration={trip.duration || ""}
                price={`ETB ${trip.price}`}
                status={trip.status as any}
                image={trip.image || destination.heroImage || "/images/image5.jpg"}
                slug={trip.slug}
              />
            ))
          ) : (
            <p className="text-muted p-[30px] bg-gray-50 rounded-xl border border-line">No active escapes currently available for this destination.</p>
          )}
        </div>
      </main>
    </>
  );
}
