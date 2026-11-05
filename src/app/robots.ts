import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/portal/dashboard", "/api/"],
    },
    sitemap: "https://genixmss.com/sitemap.xml",
  };
}

