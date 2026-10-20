import type { Metadata } from "next";

export const SITE_URL = "https://www.milanjoshi.com.np";
export const SITE_NAME = "Milan Joshi";

export function createPageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_NP",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
