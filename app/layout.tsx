import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/whatsapp-button";

// Use system fonts as fallback (Google Fonts causing network issues)
const fontConfig = {
  sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', Times, serif",
};

export const metadata: Metadata = {
  title: "Nakasoga Textile Centre - Premium East African Textiles & Fashion",
  description: "Beautiful, high-quality fabrics, clothing, and home textiles with African soul. Visit us at Magoba Arcade or City Mall. Shop authentic Ankara, Kitenge, and traditional East African fashion.",
  keywords: ["African textiles", "Ankara fabric", "Kitenge", "East African fashion", "traditional fabrics", "African clothing", "Nakasoga", "Kampala textiles"],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Nakasoga Textile Centre - Premium East African Textiles & Fashion",
    description: "Beautiful, high-quality fabrics, clothing, and home textiles with African soul. Visit us at Magoba Arcade or City Mall.",
    type: "website",
    locale: "en_UG",
    images: [
      {
        url: "/logo.jpg",
        width: 768,
        height: 1344,
        alt: "Nakasoga Textile Centre Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-sans: ${fontConfig.sans};
              --font-serif: ${fontConfig.serif};
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
