import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arasarkovil.com"),
  title: "Arasar Kovil — Kamala Varadharajar Perumal & Sundara Mahalakshmi Temple | Chengalpattu",
  description:
    "Visit the ancient Arasar Kovil temple in Chengalpattu, Tamil Nadu — home to the sacred six-toed Goddess Sundara Mahalakshmi and Lord Kamala Varadharajar. A powerful Shukra Parihara Sthalam with musical stone pillars dating back to the Chola dynasty.",
  keywords: [
    "Arasar Kovil",
    "Sundara Mahalakshmi Temple",
    "Kamala Varadharajar",
    "Chengalpattu temple",
    "Shukra Parihara Sthalam",
    "six toed Lakshmi",
    "Tamil Nadu temples",
    "Hindu temple",
    "musical pillars",
    "Akshaya Ganapathi",
    "அரசர் கோவில்",
    "சுந்தர மகாலட்சுமி",
  ],
  authors: [{ name: "Arasar Kovil Temple Trust" }],
  openGraph: {
    title: "Arasar Kovil — Sacred Temple of Sundara Mahalakshmi",
    description:
      "Experience the divine — where the six-toed Goddess blesses devotees with eternal prosperity. An ancient temple with musical stone pillars on the banks of the Palar River.",
    type: "website",
    locale: "en_IN",
    siteName: "Arasar Kovil Temple",
    images: [
      {
        url: "/images/hero-temple.png",
        width: 1200,
        height: 630,
        alt: "Arasar Kovil Temple — Sundara Mahalakshmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arasar Kovil — Sacred Temple of Sundara Mahalakshmi",
    description:
      "Visit the ancient temple of the six-toed Goddess Lakshmi in Chengalpattu, Tamil Nadu.",
    images: ["/images/hero-temple.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://arasarkovil.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    name: "Arasar Kovil — Kamala Varadharajar Perumal Temple",
    alternateName: "Sundara Mahalakshmi Temple",
    description:
      "Ancient Hindu temple housing the sacred six-toed Goddess Sundara Mahalakshmi and Lord Kamala Varadharajar. A powerful Shukra Parihara Sthalam on the banks of the Palar River.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Arasar Koil",
      addressLocality: "Madurantakam",
      addressRegion: "Tamil Nadu",
      postalCode: "603308",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        ],
        opens: "07:30",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
        ],
        opens: "16:00",
        closes: "19:30",
      },
    ],
    image: "/images/hero-temple.png",
    telephone: "+919698510956",
  };

  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased relative min-h-screen">
        {/* Parallax Background */}
        <div 
          className="fixed inset-0 -z-30 opacity-15"
          style={{
            backgroundImage: "url('/images/hero-temple.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        {children}
      </body>
    </html>
  );
}
