import { Link } from "@/i18n/routing";

interface TripCardProps {
  title: string;
  destinationName: string;
  duration: string;
  price: string;
  status: "ACTIVE" | "WAITLIST" | "SOLD_OUT" | "INACTIVE";
  image: string;
  slug: string;
}

export function TripCard({ title, destinationName, duration, price, status, image, slug }: TripCardProps) {
  if (status === "INACTIVE") return null;

  return (
    <article className="bg-offwhite rounded-[20px] p-[14px] flex flex-col sm:grid sm:grid-cols-[180px_1fr_auto] gap-[22px] items-center transition-all duration-300 shadow-[0_2px_0_rgba(0,0,0,0.03)] hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
      <div className="h-[250px] sm:h-[150px] w-full rounded-[14px] overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="w-full text-center sm:text-left">
        <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold">
          {destinationName} · Weekend Escape
        </div>
        <h3 className="font-serif font-medium text-[24px] sm:text-[31px] tracking-[-0.035em] my-[7px]">
          {title}
        </h3>
        <div className="text-[13px] text-muted">
          {duration} · Guided experience
        </div>
      </div>
      <div className="w-full sm:w-auto text-center sm:text-right whitespace-nowrap">
        <strong className="font-serif text-[22px] sm:text-[27px] font-medium block">
          {price}
        </strong>
        <span
          className={`inline-block mt-[8px] px-[9px] py-[6px] rounded-full text-[9px] font-bold tracking-[0.08em] uppercase ${
            status === "ACTIVE"
              ? "bg-[#e3eee6] text-[#315d45]"
              : "bg-[#f1e4d8] text-[#91562e]"
          }`}
        >
          {status.replace("_", " ")}
        </span>
        <Link
          href={`/trips/${slug}`}
          className="inline-flex mt-[14px] items-center justify-center gap-[12px] px-[21px] py-[15px] rounded-full text-[13px] font-bold transition-all border border-[#111] text-[#111] hover:bg-[#111] hover:text-white"
        >
          {status === "ACTIVE" ? "Book now" : "Notify me"} ↗
        </Link>
      </div>
    </article>
  );
}
