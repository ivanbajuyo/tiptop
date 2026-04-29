import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tip Top Distribution, Inc. | Food Service Distribution — Metro Manila",
  description:
    "Trusted food service distributor with 50+ brands, 200+ business clients, and 7-day delivery across Metro Manila. Bulk pricing for restaurants, hotels, cafes, and food businesses. Call or order online today.",
  keywords: [
    "Tip Top Distribution",
    "food service distribution Philippines",
    "wholesale food Metro Manila",
    "beverage distributor",
    "B2B food supply",
    "bulk food Philippines",
    "restaurant supply Taguig",
    "market leader brands",
    "food service distributor",
    "restaurant delivery Manila",
    "food wholesale Taguig",
    "catering supply Manila",
  ],
  authors: [{ name: "Tip Top Distribution Inc." }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Tip Top Distribution, Inc. — Reliable Food Supply for Metro Manila Businesses",
    description:
      "50+ trusted brands, competitive bulk pricing, and 7-day delivery. The food service distributor Metro Manila businesses rely on.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
