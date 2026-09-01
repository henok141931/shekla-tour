import { Navigation } from "@/components/Navigation";

export default function TermsPage() {
  return (
    <div className="bg-bg min-h-screen">
      <Navigation />
      <div className="max-w-[800px] mx-auto pt-[150px] px-[24px] pb-[100px]">
        <h1 className="text-[40px] font-serif font-bold text-ink mb-[30px]">Terms and Conditions</h1>
        <div className="bg-white p-[40px] rounded-[24px] shadow-sm">
          <div className="prose prose-sm sm:prose-base text-ink/80">
            <p className="mb-4">Last updated: September 2026</p>
            
            <h3 className="text-lg font-bold text-ink mt-8 mb-4">1. Agreement to Terms</h3>
            <p className="mb-4">
              By booking a trip with Shekla Tour and Travel, you agree to be bound by these Terms and Conditions. Please read them carefully before making any bookings.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">2. Booking and Payments</h3>
            <p className="mb-4">
              All bookings are subject to availability. A deposit may be required to secure your reservation. Full payment terms will be communicated during the booking process.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">3. Cancellations and Refunds</h3>
            <p className="mb-4">
              Cancellations made within specific timeframes may be subject to penalty fees. Please refer to your specific itinerary for detailed cancellation policies.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">4. Liability</h3>
            <p className="mb-4">
              Shekla Tour and Travel acts solely as an agent for the various independent suppliers that provide hotel accommodations, transportation, sightseeing activities, or other services connected with your tour. We are not liable for any injury, damage, loss, or accident arising from these services.
            </p>

            <p className="mt-8 italic text-sm">
              Note: This is a placeholder Terms and Conditions document. Please replace with your official legal terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
