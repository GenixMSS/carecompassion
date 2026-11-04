import type { MetadataRoute } from "next";
import { SERVICE_PILLARS } from "@/data/services";
import { COUNTIES, CITIES } from "@/data/locations";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://genixmss.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/service-areas",
    "/facility-staffing",
    "/careers",
    "/portal",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/license",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const pillarRoutes = SERVICE_PILLARS.map((pillar) => ({
    url: `${baseUrl}/services/${pillar.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const subServiceRoutes = SERVICE_PILLARS.flatMap((pillar) =>
    pillar.subServices.map((sub) => ({
      url: `${baseUrl}/services/${pillar.slug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  const countyRoutes = COUNTIES.map((county) => ({
    url: `${baseUrl}/service-areas/counties/${county.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityRoutes = CITIES.map((city) => ({
    url: `${baseUrl}/service-areas/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...pillarRoutes,
    ...subServiceRoutes,
    ...countyRoutes,
    ...cityRoutes,
    ...blogRoutes,
  ];
}

