import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/work",
  "/impact",
  "/credentials",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
