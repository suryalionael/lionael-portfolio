import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const personId = `${site.url}/#person`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Lionael Surya",
      alternateName: "Lionael Dwitama",
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: "Data Science Student",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Seneca Polytechnic",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      sameAs: [site.github, site.linkedin],
      knowsAbout: [
        "Data Engineering",
        "Analytics Engineering",
        "Machine Learning",
        "Software Engineering",
        "Apache Kafka",
        "Apache Spark",
        "dbt",
        "Python",
        "SQL",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      publisher: { "@id": personId },
      inLanguage: "en",
    },
    ...projects.map((project) => ({
      "@type": "CreativeWork",
      "@id": `${site.url}/#${project.slug}`,
      name: project.title,
      url: `${site.url}/#${project.slug}`,
      description: project.summary,
      author: { "@id": personId },
      keywords: project.tags.join(", "),
      ...(project.links.github && { sameAs: project.links.github }),
    })),
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
