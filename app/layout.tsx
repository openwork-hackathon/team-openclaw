import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenClaw Dashboard",
  description: "Autonomous Geopolitics + Crypto Trading Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-50`}>
        <main className="min-h-screen p-4 terminal-shell">
          {children}
        </main>
      </body>
    </html>
  );
}
