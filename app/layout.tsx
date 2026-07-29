import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "Collin Brown — Workplace operations & employee experience",
  description:
    "Collin Brown’s workplace operations and employee experience portfolio, representing work delivered through a global commercial real estate firm for a technology client in San Francisco.",
  keywords: [
    "Office Manager",
    "Workplace Coordinator",
    "Workplace Manager",
    "Employee Experience Coordinator",
    "Employee Experience Manager",
    "Workplace Operations",
    "Vendor Management",
  ],
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: {
    title: "Collin Brown — Workplace operations & employee experience",
    description:
      "Creating reliable, welcoming workplaces through clear operations, vendor partnerships, and employee-focused service.",
    type: "website",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: `${siteUrl}/og.png`,
              width: 1734,
              height: 907,
              alt: "Collin Brown’s workplace operations and employee experience portfolio.",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Collin Brown — Workplace operations & employee experience",
    description: "Reliable workplaces live in the details.",
    ...(siteUrl ? { images: [`${siteUrl}/og.png`] } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
