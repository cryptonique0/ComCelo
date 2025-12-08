import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ComCelo",
  description: "1v1 tactical duels on Celo within Farcaster Frames"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <div className="min-h-screen max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
