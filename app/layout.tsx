
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AccessibilityTools from "@/components/AccessibilityTools";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Milan Joshi",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Milan Joshi",
      url: SITE_URL,
      sameAs: ["https://linkedin.com/in/milanjoshi18"],
      knowsAbout: [
        "Web development",
        "Project coordination",
        "Digital strategy",
        "Research and documentation",
        "Life insurance",
      ],
    },
  ],
};

export const metadata: Metadata = {
  ...createPageMetadata(
    "Milan Joshi | Digital, Projects & Insurance",
    "Milan Joshi is a Nepal-based web developer and project coordinator offering digital strategy, research, project delivery and life insurance guidance.",
    "/"
  ),
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-to-content" href="#main-content">
          Skip to content
        </a>
        <div className="site-content">
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        <AccessibilityTools />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
