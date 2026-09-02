"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const HERO_IMAGES = [
  "/images/hero1.webp",
  "/images/hero2.webp",
  "/images/hero3.webp",
];

export function HeroSlider() {
  const t = useTranslations("HomePage");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[100svh] bg-[#0B3D2E] relative text-white flex items-end overflow-hidden" id="home">
      {/* Background Images with Crossfade */}
      {HERO_IMAGES.map((src, index) => (
        <div 
          key={src} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
        >
          <img
            src={src}
            alt={`Hero ${index + 1}`}
            className={`h-full w-full object-cover ${index === currentIndex ? 'animate-[heroZoom_12s_ease-out_forwards]' : ''}`}
          />
        </div>
      ))}

      {/* Forest Green Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient-overlay"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-container mx-auto pt-[150px] pb-[74px] md:pb-[45px] w-full">
        <div className="flex justify-between items-start mb-[75px] md:mb-[70px]">
          <div className="text-[12px] flex items-center gap-[9px]">
            <span className="w-[7px] h-[7px] bg-white rounded-full"></span> CURATED WEEKEND ESCAPES IN ETHIOPIA
          </div>
          <div className="font-serif text-[15px]">
            0{currentIndex + 1} / 0{HERO_IMAGES.length}
          </div>
        </div>
        
        <h1 className="font-serif font-medium text-[clamp(55px,17vw,85px)] sm:text-[clamp(58px,9vw,132px)] leading-[0.86] tracking-[-0.065em] max-w-[1050px]">
          {t('title').split('.')[0]}.<br />
          <em className="italic font-medium">{t('title').split('.')[1]}.</em>
        </h1>
        
        <div className="mt-[45px] flex flex-col md:flex-row md:justify-between md:items-end gap-[30px]">
          <p className="max-w-[420px] text-[16px] md:text-[14px] text-white/80">
            {t('subtitle')}
          </p>
          <div className="flex gap-[12px] flex-wrap">
            <Link
              href="/trips"
              className="relative overflow-hidden inline-flex items-center justify-center gap-[12px] px-[21px] py-[15px] rounded-full text-[13px] font-bold transition-all bg-white text-[#111] hover:-translate-y-[2px]"
            >
              {t('exploreTrips')} <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
