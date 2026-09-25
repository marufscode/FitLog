import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col bg-base font-sans text-white antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1b1f28",
                border: "1px solid #2d313b",
                color: "#ffffff",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
