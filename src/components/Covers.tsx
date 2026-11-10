import Image from "next/image";
import { FinanceDashboard, FoodXScreens } from "./visuals";
import { Placeholder } from "./ui";

/** Cover visual for each case study, used on the home card and the case study header. */
export function Cover({ slug, label }: { slug: string; label: string }) {
  if (slug === "skalx") {
    return (
      <div className="overflow-hidden rounded-xl border border-line">
        <Image
          src="/work/skalx/hero.jpg"
          alt="SkalX landing page: Know what works. Then make it."
          width={2880}
          height={1800}
          sizes="(min-width: 1280px) 1150px, 100vw"
          className="h-auto w-full"
          priority
        />
      </div>
    );
  }
  if (slug === "datareveal") {
    return (
      <div className="rounded-xl border border-line bg-panel p-4 sm:p-6">
        <FinanceDashboard />
      </div>
    );
  }
  if (slug === "foodx") {
    return (
      <div className="rounded-xl border border-line bg-panel p-4 sm:p-6">
        <FoodXScreens />
      </div>
    );
  }
  return <Placeholder label={label} />;
}
