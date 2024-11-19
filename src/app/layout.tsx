import type { Metadata } from "next";
import "@/css/collage.css";
import "@/css/components.css";
import "@/css/content-menu.css";
import "@/css/footer.css";
import "@/css/globals.css";
import "@/css/layout.css";
import "@/css/lhs.css";
import "@/css/pages.css";
import "@/css/property-card.css";
import "@/css/sidebar.css";

import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { PropertyProvider } from "@/lib/context";
import { SideBar } from "@/components/SideBar";
// import { Logo } from "@/lib/utils";
import { Suspense } from "react";
import LHSLoader from "@/components/LHSLoader"; // Add this import
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically

export const metadata: Metadata = {
  title: "LHS Concept",
  description: "Propiedades de Lujo en Madrid", //lifestyle, luxury, location familiy oriented
  keywords: "luxury, lifestyle, Madrid, exclusive, homes, family-oriented, real estate, high-end living, propiedades de lujo en madrid, propiedades seelectas",

  openGraph: {
    title: "LHS Concept",
    description: "Propiedades de Lujo en Madrid",
    type: "website", //article for lifestyle page 
    url: "https://www.lhsconcept.com",

    images: [
      {
        url: "/assets/logo-main.jpeg", // Image URL for WhatsApp, Facebook, Pinterest
        width: 2546,
        height: 1500,
        type: "image/jpeg",
        alt: "Propiedades de Lujo en Madrid",
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
    description: "Propiedades de Lujo en Madrid",
    images: ["/assets/logo-main.jpeg"],

  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
    // minimumScale: 1,
    // maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },

  // icons: {
  //   icon: '/favicon.ico',
  // },
  //language: es
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
          <Suspense fallback={<LHSLoader />}>
            <div className="layout-div">
              <SideBar />
              <main style={{ flex: 1, padding: '2px' }}>
                {children}
              </main>
            </div>
            {/* <div className="logo-mob">
              <h1 className="text-3xl font-bold text-center tracking-wide uppercase py-4 px-6">
                Propiedades En Madrid
              </h1>
            </div> */}
          </Suspense>
        </PropertyProvider>
      </body>
    </html>
  );
}
