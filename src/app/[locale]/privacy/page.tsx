import { Navigation } from "@/components/Navigation";

export default function PrivacyPage() {
  return (
    <div className="bg-bg min-h-screen">
      <Navigation />
      <div className="max-w-[800px] mx-auto pt-[150px] px-[24px] pb-[100px]">
        <h1 className="text-[40px] font-serif font-bold text-ink mb-[30px]">Privacy Policy</h1>
        <div className="bg-white p-[40px] rounded-[24px] shadow-sm">
          <div className="prose prose-sm sm:prose-base text-ink/80">
            <p className="mb-4">Last updated: September 2026</p>
            
            <h3 className="text-lg font-bold text-ink mt-8 mb-4">1. Information We Collect</h3>
            <p className="mb-4">
              We collect information that you provide directly to us when booking a tour, subscribing to our newsletter, or contacting us. This may include your name, email address, phone number, and payment information.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">2. How We Use Your Information</h3>
            <p className="mb-4">
              We use the information we collect to process your bookings, communicate with you about your trip, send you marketing communications (if you have opted in), and improve our services.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">3. Information Sharing</h3>
            <p className="mb-4">
              We do not sell your personal information. We only share your information with trusted third-party service providers (like hotels and transport companies) necessary to fulfill your travel arrangements.
            </p>

            <h3 className="text-lg font-bold text-ink mt-8 mb-4">4. Your Rights</h3>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information at any time. Please contact us to exercise these rights.
            </p>

            <p className="mt-8 italic text-sm">
              Note: This is a placeholder Privacy Policy document. Please replace with your official legal terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
