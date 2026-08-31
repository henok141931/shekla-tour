import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[120px] pb-[80px] bg-paper min-h-screen">
        <div className="max-w-container max-w-[800px] mx-auto">
          <div className="eyebrow mb-[20px] text-muted">About Us</div>
          <h1 className="text-[48px] font-serif font-bold mb-[40px]">Why Shekla Tour and Travels</h1>
          <div className="prose prose-lg text-ink/80">
            <p>
              Shekla Tour and Travels is dedicated to curating premium weekend escapes across Ethiopia's most beautiful destinations.
            </p>
            <p>
              Forget the predictable weekend. We curate short escapes around Ethiopia's landscapes, stays, and experiences so the journey feels as memorable as the destination.
            </p>
            {/* Add more about content here */}
          </div>
        </div>
      </main>
    </>
  );
}
