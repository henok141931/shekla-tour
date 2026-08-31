import { Link } from "@/i18n/routing";

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
  slug: string;
  index: string;
  themeType: string;
  size: "tall" | "small";
}

export function DestinationCard({ name, description, image, slug, index, themeType, size }: DestinationCardProps) {
  const parts = name.split(" ");
  const formattedName =
    parts.length > 1 ? (
      <>
        {parts[0]}
        <br />
        {parts.slice(1).join(" ")}
      </>
    ) : (
      name
    );

  return (
    <article
      className={`relative overflow-hidden text-white rounded-[24px] isolate cursor-pointer group ${
        size === "tall" ? "min-h-[520px] md:min-h-[680px]" : "min-h-[350px] md:min-h-[320px]"
      }`}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] cubic-bezier(0.2,0.7,0.2,1) group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent -z-10 pointer-events-none"></div>
      
      <div className="absolute z-10 left-[34px] right-[34px] bottom-[30px]">
        <div className="text-[11px] tracking-[0.16em] mb-[12px] text-white font-extrabold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {index} / {themeType}
        </div>
        <h3 className="font-serif font-medium text-[clamp(42px,5vw,68px)] leading-[0.9] tracking-[-0.05em] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          {formattedName}
        </h3>
        <p className="mt-[16px] max-w-[430px] text-white text-[15px] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {description}
        </p>
        <Link
          href={`/destinations/${slug}`}
          className="inline-flex mt-[22px] border-b border-white/65 pb-[4px] text-[13px] font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] hover:border-white transition-colors"
        >
          Explore {parts[0]} ↗
        </Link>
      </div>
    </article>
  );
}
