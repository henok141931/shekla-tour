import { PrismaClient } from "@prisma/client";
import { Navigation } from "@/components/Navigation";
import { TripCard } from "@/components/TripCard";
import { Link } from "@/i18n/routing";

const prisma = new PrismaClient();

export default async function TripsGalleryPage() {
  let upcomingTrips: any[] = [];
  let galleryImages: any[] = [];

  try {
    upcomingTrips = await prisma.trip.findMany({
      where: { status: { in: ['ACTIVE', 'WAITLIST'] } },
      include: { destination: true },
      orderBy: { createdAt: "desc" },
    });

    galleryImages = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <Navigation />
      <main className="pt-[150px] pb-[100px] max-w-container mx-auto">
        
        {/* Upcoming Escapes Section */}
        <section className="mb-[100px]">
          <div className="eyebrow">Upcoming Escapes</div>
          <h1 className="font-serif font-medium text-[clamp(48px,5vw,72px)] leading-[0.92] tracking-[-0.055em] mt-[10px] mb-[40px]">
            Join the next <em className="italic">journey.</em>
          </h1>
          
          <div className="grid gap-[20px]">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  title={trip.title}
                  destinationName={trip.destination?.name || ""}
                  duration={trip.duration || ""}
                  price={`ETB ${trip.price}`}
                  status={trip.status as any}
                  image={trip.image || trip.destination?.heroImage || "/images/image5.jpg"}
                  slug={trip.slug}
                />
              ))
            ) : (
              <p className="text-muted">No upcoming trips at the moment. Check out our past travels below!</p>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-[40px]">
            <div>
              <div className="eyebrow">The Gallery</div>
              <h2 className="font-serif font-medium text-[clamp(40px,4vw,60px)] leading-[0.92] tracking-[-0.055em] mt-[10px]">
                Moments from the <em className="italic">road.</em>
              </h2>
            </div>
            <p className="text-muted max-w-[300px] mt-[20px] md:mt-0 text-[14px]">
              A collection of memories from past Shekla weekend escapes across Ethiopia.
            </p>
          </div>

          {galleryImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-[20px] space-y-[20px]">
              {galleryImages.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={img.url} 
                    alt={img.caption || "Shekla Gallery Image"} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-[20px] pt-[40px] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-bold">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-[100px] bg-gray-50 rounded-[20px] border border-line">
              <h3 className="font-serif text-[24px] mb-[10px]">No memories uploaded yet</h3>
              <p className="text-muted text-[14px]">Check back later for photos from our weekend escapes.</p>
            </div>
          )}
        </section>

      </main>
    </>
  );
}
