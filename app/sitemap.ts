import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/colophon`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
  ];
}
