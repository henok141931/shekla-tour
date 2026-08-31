import { Navigation } from "@/components/Navigation";
import { DestinationCard } from "@/components/DestinationCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DestinationsPage() {
  // Fetch destinations from the database
  // Note: We use a try/catch here so the page doesn't crash if the DB is empty or not connected yet during build
  let destinations: any[] = [];
  try {
    destinations = await prisma.destination.findMany({
      where: { isActive: true },
    });
  } catch (error) {
    console.error("Database not connected yet", error);
  }

  return (
    <>
      <Navigation />
      <main className="pt-[120px] bg-paper min-h-screen">
        <section className="py-[82px] md:py-[120px]">
          <div className="max-w-container">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-[30px] mb-[55px]">
              <div>
                <div className="eyebrow">All Destinations</div>
                <h1 className="font-serif font-medium text-[clamp(45px,6vw,78px)] leading-[0.95] tracking-[-0.055em] mt-[10px]">
                  Discover your<br />
                  <em className="italic">escape.</em>
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {destinations.length > 0 ? (
                destinations.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    name={dest.name}
                    description={dest.description}
                    image={dest.heroImage || "/images/image7.jpg"}
                    slug={dest.slug}
                    index={`0${i + 1}`}
                    themeType={dest.theme || "DESTINATION"}
                    size="tall"
                  />
                ))
              ) : (
                <p className="text-muted">No destinations available at the moment. Please check back later.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

