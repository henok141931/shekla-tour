import { Link } from "@/i18n/routing";

export function Footer() {
  return (
    <footer className="bg-ink text-white py-[70px] pb-[30px]">
      <div className="max-w-container">
        <div className="flex flex-col md:flex-row justify-between gap-[50px] pb-[70px]">
          <div>
            <h2 className="font-serif text-[40px] font-medium">BEYOND ADDIS</h2>
            <p className="text-[#777c75] text-[13px] max-w-[300px] mt-[12px]">
              Curated weekend escapes across Ethiopia. Go further without going away for long.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[45px] md:gap-[70px]">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#777c75] mb-[15px]">Explore</h4>
              <Link href="/destinations" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Destinations</Link>
              <Link href="/trips" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Trips</Link>
              <Link href="/about" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Why Us</Link>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#777c75] mb-[15px]">Connect</h4>
              <Link href="/faq" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">FAQ</Link>
              <a href="https://wa.me/251900000000" target="_blank" rel="noopener noreferrer" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">WhatsApp</a>
              <a href="#" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Instagram</a>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#777c75] mb-[15px]">Legal</h4>
              <Link href="/privacy" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-[22px] flex flex-col sm:flex-row justify-between text-[#666b65] text-[11px] gap-[8px]">
          <span>© {new Date().getFullYear()} Shekla Tour and Travels. All rights reserved.</span>
          <span>Designed & developed by the agent.</span>
        </div>
      </div>
    </footer>
  );
}
