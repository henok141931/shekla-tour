"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  // If we are on the homepage, the nav sits over a dark hero image. 
  // Otherwise, it sits over the light beige page background.
  const isHome = pathname === "/";
  const isDarkText = !isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-[22px] transition-all duration-350 ease-in-out ${
        isDarkText ? "text-ink" : "text-white"
      } ${
        scrolled ? "bg-ink/92 backdrop-blur-[16px] !py-[14px]" : ""
      } ${menuOpen ? "bg-ink !text-white" : ""}`}
    >
      <div className="max-w-container flex items-center justify-between gap-[30px]">
        <Link href="/" className="flex items-center">
          <img src="/images/logon.png" alt="Shekla Tour and Travel" className="h-[45px] w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-[30px] text-[13px] font-medium">
          <Link href="/destinations" className="opacity-80 hover:opacity-100 transition-opacity duration-200">
            {t("destinations")}
          </Link>
          <Link href="/trips" className="opacity-80 hover:opacity-100 transition-opacity duration-200">
            {t("trips")}
          </Link>
          <Link href="/about" className="opacity-80 hover:opacity-100 transition-opacity duration-200">
            {t("whyUs")}
          </Link>
          <Link href="/faq" className="opacity-80 hover:opacity-100 transition-opacity duration-200">
            {t("faq")}
          </Link>
        </div>

        <Link
          href="/trips"
          className={`hidden md:inline-block px-[17px] py-[11px] rounded-full text-[12px] font-bold transition-colors ${
            isDarkText 
              ? "bg-ink text-white hover:bg-black" 
              : "bg-white text-[#111] hover:bg-gray-100"
          }`}
        >
          {t("exploreTrips")} ↗
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[26px] leading-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-[65px] px-[24px] pb-[30px] pt-[25px] bg-ink text-white flex flex-col gap-[18px] md:hidden shadow-xl">
          <Link href="/destinations" onClick={() => setMenuOpen(false)}>
            {t("destinations")}
          </Link>
          <Link href="/trips" onClick={() => setMenuOpen(false)}>
            {t("trips")}
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            {t("whyUs")}
          </Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)}>
            {t("faq")}
          </Link>
        </div>
      )}
    </nav>
  );
}
