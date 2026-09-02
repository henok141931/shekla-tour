"use client";

import { useEffect, useState } from "react";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href="https://wa.me/251969919548?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20weekend%20escape%20with%20Shekla%20Tour!"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-[30px] right-[30px] z-50 bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[35px] h-[35px]"
      >
        <path d="M12.031 0C5.385 0 0 5.388 0 12.037c0 2.12.553 4.195 1.603 6.012L.15 23.364l5.45-1.429a11.967 11.967 0 006.431 1.862h.005c6.645 0 12.032-5.388 12.032-12.037S18.677 0 12.031 0zm0 21.782h-.004a9.924 9.924 0 01-5.064-1.385l-.363-.215-3.766.987.998-3.666-.236-.376A9.873 9.873 0 011.996 12.04c0-5.529 4.5-10.026 10.035-10.026 2.68 0 5.197 1.045 7.091 2.94a10.016 10.016 0 012.937 7.086c-.001 5.531-4.502 10.03-10.035 10.03m5.5-7.51c-.302-.15-1.785-.881-2.062-.982-.277-.101-.478-.15-.68.151-.201.302-.781.983-.956 1.183-.176.202-.352.227-.654.076-1.411-.715-2.522-1.846-3.23-3.26-.149-.3-.016-.464.135-.615.136-.135.302-.352.453-.528.151-.176.202-.302.302-.503.1-.202.05-.377-.025-.528-.076-.151-.68-1.637-.932-2.241-.245-.589-.494-.509-.68-.518-.175-.009-.377-.01-.578-.01-.202 0-.528.076-.805.377-.277.302-1.057 1.032-1.057 2.516 0 1.485 1.082 2.92 1.233 3.12.151.202 2.128 3.249 5.155 4.555.72.311 1.282.497 1.721.635.723.23 1.382.197 1.902.12.583-.086 1.785-.729 2.037-1.434.251-.705.251-1.309.176-1.435-.075-.126-.277-.202-.578-.353" />
      </svg>
    </a>
  );
}
