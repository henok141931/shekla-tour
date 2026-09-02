import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[120px] pb-[80px] bg-paper min-h-screen">
        <div className="max-w-container max-w-[800px] mx-auto">
          <div className="eyebrow mb-[20px] text-muted">About Us</div>
          <h1 className="text-[48px] font-serif font-bold mb-[40px]">Why Shekla Tour and Travels</h1>
          
          <div className="prose prose-lg text-ink/80 leading-relaxed">
            <p className="text-[22px] font-serif text-ink mb-[30px]">
              Shekla Tour and Travels is dedicated to curating premium weekend escapes across Ethiopia's most beautiful destinations.
            </p>
            
            <p className="mb-[20px]">
              Forget the predictable weekend. We curate short escapes around Ethiopia's landscapes, stays, and experiences so the journey feels as memorable as the destination. Traveling shouldn't mean taking weeks off from your life. Sometimes, all you need is a different road, a different view, and a weekend that feels longer than it actually was.
            </p>

            <h2 className="text-[28px] font-serif font-bold mt-[50px] mb-[20px] text-ink">Curated, Not Crowded</h2>
            <p className="mb-[20px]">
              We believe in thoughtful weekend experiences designed around the unique character of each destination. Whether it's the crisp highland air of Wenchi Crater Lake, the soothing mineral springs of Doho Lodge, or the refined cultural retreat at Beynouna Village, every destination has a different rhythm. We make sure you experience it authentically.
            </p>

            <h2 className="text-[28px] font-serif font-bold mt-[50px] mb-[20px] text-ink">Made for Real Weekends</h2>
            <p className="mb-[20px]">
              Our itineraries are short, focused, and designed for people who want to get away without disappearing for a week. We handle the logistics—transportation, accommodation, and guided experiences—so you have one less thing to organize. 
            </p>

            <p className="font-bold text-ink mt-[40px]">
              The road is already there. All that's missing is your weekend. Discover your destination, choose your trip, and let the rest unfold.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
