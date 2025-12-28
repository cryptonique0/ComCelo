import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ComCelo ⚔️ Tactical Combat Arena",
  description: "1v1 tactical duels on Base blockchain. Command your warriors in epic turn-based combat."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#102219] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
