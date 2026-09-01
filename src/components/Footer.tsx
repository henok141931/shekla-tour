import { Link } from "@/i18n/routing";

export function Footer() {
  return (
    <footer className="bg-ink text-white py-[70px] pb-[30px]">
      <div className="max-w-container">
        <div className="flex flex-col md:flex-row justify-between gap-[50px] pb-[70px]">
          <div>
            <img src="/logon.png" alt="Shekla Tour and Travel" className="h-[60px] w-auto mb-[15px]" />
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
              <Link href="/faq" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">FAQ</Link>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#777c75] mb-[15px]">Connect</h4>
              <Link href="/contact" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Contact Us</Link>
              <a href="tel:+251969919548" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">+251 96 991 9548</a>
              <a href="https://wa.me/251969919548" target="_blank" rel="noopener noreferrer" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">WhatsApp</a>
              <a href="https://www.instagram.com/shekla_tour_and_travel/" target="_blank" rel="noopener noreferrer" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@shekla_tour_and_travel" target="_blank" rel="noopener noreferrer" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">TikTok</a>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-[#777c75] mb-[15px]">Legal</h4>
              <Link href="/privacy" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-[13px] my-[8px] text-[#ddd] hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-[22px] flex flex-col sm:flex-row justify-between text-[#666b65] text-[11px] gap-[8px]">
          <span>© {new Date().getFullYear()} Shekla Tour and Travel. All rights reserved.</span>
          <span>Designed & developed by MMCY Tech</span>
        </div>
      </div>
    </footer>
  );
}
