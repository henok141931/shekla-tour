import { Navigation } from "@/components/Navigation";
import { DestinationCard } from "@/components/DestinationCard";
import { TripCard } from "@/components/TripCard";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { HeroSlider } from "@/components/HeroSlider";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const t = await getTranslations("HomePage");

  let trips: any[] = [];
  try {
    trips = await prisma.trip.findMany({
      take: 3,
      include: { destination: true },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <Navigation />
      <main>
        {/* HERO SECTION */}
        <HeroSlider />
        
        {/* INTRO SECTION */}
        <section className="py-[120px] bg-paper">
          <div className="max-w-container grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[45px] md:gap-[80px]">
            <div className="eyebrow">01 — The idea</div>
            <div>
              <h2 className="font-serif font-medium text-[clamp(44px,5vw,72px)] leading-[0.98] tracking-[-0.05em] max-w-[820px]">
                Three destinations.<br />
                <em className="italic">Three ways to escape.</em>
              </h2>
              <div className="mt-[20px] md:mt-[40px]">
                <p className="text-[16px] md:text-[18px] text-muted max-w-[520px]">
                  Forget the predictable weekend. We curate short escapes around Ethiopia's landscapes, stays and experiences — so the journey feels as memorable as the destination.
                </p>
              </div>
              <div className="h-[1px] bg-line mt-[50px]"></div>
            </div>
          </div>
        </section>

        {/* DESTINATIONS SECTION */}
        <section className="py-[82px] md:py-[120px] bg-paper" id="destinations">
          <div className="max-w-container">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-[30px] mb-[55px]">
              <div>
                <div className="eyebrow">02 — Destinations</div>
                <h2 className="font-serif font-medium text-[clamp(45px,6vw,78px)] leading-[0.95] tracking-[-0.055em] mt-[10px]">
                  Choose your<br />
                  <em className="italic">escape.</em>
                </h2>
              </div>
              <p className="max-w-[330px] text-muted text-[14px]">
                From cool highland landscapes to warm mineral springs and refined village retreats, every destination has a different rhythm.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-[24px]">
              <DestinationCard
                name="Wenchi Crater Lake"
                description="Cool highlands, dramatic landscapes and an escape that rewards the curious."
                image="/images/image2.jpg"
                slug="wenchi-crater-lake"
                index="01"
                themeType="HIGHLANDS"
                size="tall"
              />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-[24px] sm:grid-cols-2 md:grid-cols-1">
                <DestinationCard
                  name="Doho Lodge"
                  description="Warm earth, hot springs and time that moves a little slower."
                  image="/images/image3.jpg"
                  slug="doho-lodge"
                  index="02"
                  themeType="ESCAPE"
                  size="small"
                />
                <DestinationCard
                  name="Beynouna Village"
                  description="A quieter, more refined way to step away from the city."
                  image="/images/image4.jpg"
                  slug="beynouna-village"
                  index="03"
                  themeType="RETREAT"
                  size="small"
                />
              </div>
            </div>
          </div>
        </section>
        {/* TRIPS SECTION */}
        <section className="py-[120px] bg-[#e9e5db]" id="trips">
          <div className="max-w-container grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-[45px] md:gap-[80px]">
            <div>
              <div className="eyebrow">03 — Weekend trips</div>
              <h2 className="font-serif font-medium text-[clamp(48px,5vw,72px)] leading-[0.92] tracking-[-0.055em] mt-[10px]">
                Your next<br />
                <em className="italic">escape.</em>
              </h2>
              <p className="mt-[25px] text-muted max-w-[330px]">
                Short on time doesn't have to mean short on experience. Pick a destination, choose your weekend and let the rest unfold.
              </p>
            </div>
            
            <div className="grid gap-[14px]">
              {trips.length > 0 ? (
                trips.map((trip) => (
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
                <p className="text-muted">No trips available at the moment.</p>
              )}
            </div>
          </div>
        </section>
        {/* STORY SECTION */}
        <section className="bg-green text-white pb-0">
          <div className="max-w-container grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] min-h-[550px] md:min-h-[720px] items-center gap-[45px]">
            <div className="pt-[90px] pb-[45px] md:py-[100px] md:pr-[50px]">
              <div className="eyebrow">04 — Beyond the weekend</div>
              <h2 className="font-serif font-medium text-[clamp(50px,6vw,88px)] leading-[0.9] tracking-[-0.06em] mt-[10px]">
                Go somewhere<br />
                <em className="italic">worth remembering.</em>
              </h2>
              <p className="text-white/68 max-w-[420px] my-[30px]">
                Travel doesn't have to mean taking weeks off. Sometimes all you need is a different road, a different view and a weekend that feels longer than it was.
              </p>
              <Link
                href="/about"
                className="relative overflow-hidden inline-flex items-center justify-center gap-[12px] px-[21px] py-[15px] rounded-full text-[13px] font-bold transition-all bg-white text-[#111] hover:-translate-y-[2px]"
              >
                Why travel with us ↗
              </Link>
            </div>
            <div className="h-[420px] md:h-[720px] overflow-hidden -mx-[16px] md:mx-0">
              <img
                src="/images/image6.jpg"
                alt="Travelers enjoying an outdoor journey"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="py-[82px] md:py-[120px] bg-[#121612] text-white" id="experience">
          <div className="max-w-container grid grid-cols-1 md:grid-cols-2 gap-[55px] md:gap-[90px]">
            <div>
              <div className="eyebrow">05 — The experience</div>
              <h2 className="font-serif text-[clamp(50px,6vw,82px)] font-medium leading-[0.9] tracking-[-0.06em] mt-[10px]">
                Less planning.<br />
                More <em className="italic">living.</em>
              </h2>
            </div>
            <div className="border-t border-white/20">
              {[
                {
                  num: "01",
                  title: "Curated, not crowded.",
                  text: "Thoughtful weekend experiences designed around the character of each destination.",
                },
                {
                  num: "02",
                  title: "Made for real weekends.",
                  text: "Short, focused itineraries for people who want to get away without disappearing for a week.",
                },
                {
                  num: "03",
                  title: "One less thing to organize.",
                  text: "Discover the destination, choose your trip and connect with the team when you're ready.",
                },
              ].map((feature, i) => (
                <div key={i} className="py-[28px] border-b border-white/20 grid grid-cols-[50px_1fr] gap-[20px]">
                  <span className="text-[11px] text-[#aab2aa]">{feature.num}</span>
                  <div>
                    <h3 className="font-serif text-[25px] font-medium">{feature.title}</h3>
                    <p className="text-[13px] text-white/55 mt-[7px] max-w-[420px]">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-[#b36e3e] text-white min-h-[650px] flex items-center text-center px-[20px]">
          <div className="w-full max-w-[900px] mx-auto py-[82px] md:py-[120px]">
            <div className="eyebrow">08 — Your next escape</div>
            <h2 className="font-serif font-medium text-[clamp(58px,9vw,115px)] leading-[0.82] tracking-[-0.07em] mt-[10px]">
              Where will you<br />
              <em className="italic">go next?</em>
            </h2>
            <p className="max-w-[430px] mx-auto my-[28px] text-white/75">
              The road is already there. All that's missing is your weekend.
            </p>
            <div className="flex justify-center gap-[12px] flex-wrap">
              <Link
                href="/trips"
                className="relative overflow-hidden inline-flex items-center justify-center gap-[12px] px-[21px] py-[15px] rounded-full text-[13px] font-bold transition-all bg-white text-[#111] hover:-translate-y-[2px]"
              >
                Explore trips ↗
              </Link>
              <a
                href="https://wa.me/251900000000?text=Hi%2C%20I'm%20interested%20in%20your%20weekend%20trips."
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center justify-center gap-[12px] px-[21px] py-[15px] rounded-full text-[13px] font-bold transition-all border border-white/45 text-white hover:bg-white hover:text-[#111] hover:-translate-y-[2px]"
              >
                Talk on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

