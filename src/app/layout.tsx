import type { Metadata } from "next";
import { Roboto, Ubuntu } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Driving Licence - Apply Licence Now",
  description: "Get information and apply for your driving licence online. Fast, secure, and reliable service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${roboto.variable} ${ubuntu.variable} font-roboto antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-V3CX9NG3FN" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3CX9NG3FN');
          `}
        </Script>
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
