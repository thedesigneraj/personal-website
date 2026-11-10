import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/work";
import { concepts } from "@/lib/concepts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...works.map((w) => ({ url: `${site.url}/work/${w.slug}`, priority: 0.8 })),
    ...concepts.map((c) => ({ url: `${site.url}/concepts/${c.slug}`, priority: 0.6 })),
  ];
}
