import type { Metadata } from "next";
import "@/css/globals.css";
import "@/css/pages.css";
import "@/css/components.css";
import "@/css/search-filter.css";
import "@/css/lhs.css";
import "@/css/collage.css";
import "@/css/test.css";
import "@/css/property-card.css";
import "@/css/airbnb.css";
import "@/css/sidebar.css";
import "@/css/layout.css";

import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { PropertyProvider } from "@/lib/context";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically


export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Exculsive Madrid Living. Offering a luxry lifestyle, in search for the best homes.", //lifestyle, luxury, location familiy oriented
  keywords: "luxury, lifestyle, Madrid, exclusive, homes, family-oriented, real estate, high-end living",

  openGraph: {
    title: "LHS Concept",
    description: "Exclusive Madrid Living. Offering a luxury lifestyle, in search for the best homes.",
    type: "website", //article for lifestyle page 
    url: "https://www.lhsconcept.com",

    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", // Image URL for WhatsApp, Facebook, Pinterest
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Luxury homes in Madrid",
      },
    ],

    // Additional Open Graph tags:
    determiner: "the", // Default determiner when displaying your site. Values: auto, the, a, an, blank (auto by default)
    siteName: "LHSConcept.com", // The name of your website
  },
  twitter: {
    card: "summary_large_image", // summary, summary_large_image, app, player
    site: "@lhsconcept",
    title: "LHS Concept",
    creator: "Lourdes Hernansanz",
    description: "Discover the best luxury homes in Madrid for family-oriented living.",
    images: ["https://yourwebsite.com/twitter-image.jpg"], // Image URL for Twitter

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <PropertyProvider>
          {children}
        </PropertyProvider>
      </body>
    </html>
  );
}




/*
Twitter carad video embedment for EVENT page
*/