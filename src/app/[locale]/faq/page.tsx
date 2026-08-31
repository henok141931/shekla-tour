import { Navigation } from "@/components/Navigation";

export default function FaqPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[120px] pb-[80px] bg-paper min-h-screen">
        <div className="max-w-container max-w-[800px] mx-auto">
          <div className="eyebrow mb-[20px] text-muted">Questions</div>
          <h1 className="text-[48px] font-serif font-bold mb-[40px]">Before you go.</h1>
          
          <div className="space-y-[20px]">
            <div className="border-t border-line pt-[20px]">
              <h3 className="font-serif text-[24px] mb-[10px]">How do I book a trip?</h3>
              <p className="text-muted">Choose an active trip and use the booking action to connect with the travel team. They can confirm the current details and availability with you.</p>
            </div>
            <div className="border-t border-line pt-[20px]">
              <h3 className="font-serif text-[24px] mb-[10px]">What happens when a trip is not scheduled?</h3>
              <p className="text-muted">Instead of showing an empty calendar, you can join the waitlist. You'll be among the first people to know when the next trip is announced.</p>
            </div>
            <div className="border-t border-line pt-[20px]">
              <h3 className="font-serif text-[24px] mb-[10px]">Are all trips the same length?</h3>
              <p className="text-muted">No. Trip duration depends on the destination and the specific departure. Always check the trip details before booking.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
