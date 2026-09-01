import { Navigation } from "@/components/Navigation";

export default function ContactPage() {
  return (
    <div className="bg-bg min-h-screen">
      <Navigation />
      <div className="max-w-[800px] mx-auto pt-[150px] px-[24px] pb-[100px]">
        <h1 className="text-[40px] font-serif font-bold text-ink mb-[30px]">Contact Us</h1>
        <div className="bg-white p-[40px] rounded-[24px] shadow-sm">
          <p className="text-[16px] text-ink/80 leading-[1.6] mb-[20px]">
            Have a question or want to book a custom trip? Reach out to us using the contact details below.
          </p>
          <div className="flex flex-col gap-[15px] text-[15px] font-medium">
            <p>Phone / WhatsApp: <a href="tel:+251969919548" className="text-blue-600 hover:underline">+251 96 991 9548</a></p>
            <p>Instagram: <a href="https://www.instagram.com/shekla_tour_and_travel/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@shekla_tour_and_travel</a></p>
            <p>TikTok: <a href="https://www.tiktok.com/@shekla_tour_and_travel" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@shekla_tour_and_travel</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
