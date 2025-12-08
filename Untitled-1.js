diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@
   "scripts": {
     "build": "hardhat compile",
     "test": "hardhat test",
-    "lint": "eslint . --ext .ts,.tsx,.js",
-    "format": "prettier --write \"**/*.{ts,tsx,js,json,md}\""
+    "lint": "eslint . --ext .ts,.tsx,.js",
+    "format": "prettier --write \"**/*.{ts,tsx,js,json,md}\"",
+    "dev": "next dev",
+    "next:build": "next build",
+    "next:start": "next start"
   },
   "dependencies": {
-    "@openzeppelin/contracts": "^4.9.5"
+    "@openzeppelin/contracts": "^4.9.5",
+    "next": "^14.1.0",
+    "react": "^18.2.0",
+    "react-dom": "^18.2.0"
   },
   "devDependencies": {
@@
-    "eslint-config-prettier": "^9.1.0",
-    "eslint-plugin-import": "^2.29.1"
+    "eslint-config-prettier": "^9.1.0",
+    "eslint-plugin-import": "^2.29.1",
+    "@types/react": "^18.2.39",
+    "@types/react-dom": "^18.2.17"
   }
 }
diff --git a/tsconfig.json b/tsconfig.json
--- a/tsconfig.json
+++ b/tsconfig.json
@@
   "compilerOptions": {
     "target": "es2020",
     "module": "commonjs",
     "moduleResolution": "node",
     "esModuleInterop": true,
     "strict": true,
     "skipLibCheck": true,
     "forceConsistentCasingInFileNames": true,
     "resolveJsonModule": true,
-    "outDir": "dist"
+    "outDir": "dist",
+    "jsx": "react-jsx",
+    "allowSyntheticDefaultImports": true
   },
-  "include": ["hardhat.config.ts", "scripts", "test", "contracts", "types"],
+  "include": ["hardhat.config.ts", "scripts", "test", "contracts", "types", "app", "pages", "next-env.d.ts"],
   "exclude": ["node_modules"]
 }
diff --git a/next-env.d.ts b/next-env.d.ts
new file mode 100644
--- /dev/null
+++ b/next-env.d.ts
+/// <reference types="next" />
+/// <reference types="next/image-types/global" />
+
+// NOTE: This file should not be edited
diff --git a/next.config.mjs b/next.config.mjs
new file mode 100644
--- /dev/null
+++ b/next.config.mjs
+/** @type {import('next').NextConfig} */
+const nextConfig = {
+  reactStrictMode: true,
+  output: "standalone",
+  experimental: {
+    typedRoutes: true
+  }
+};
+
+export default nextConfig;
diff --git a/app/layout.tsx b/app/layout.tsx
new file mode 100644
--- /dev/null
+++ b/app/layout.tsx
+import type { Metadata } from "next";
+import "./globals.css";
+
+export const metadata: Metadata = {
+  title: "ComCelo",
+  description: "1v1 tactical duels on Celo within Farcaster Frames"
+};
+
+export default function RootLayout({ children }: { children: React.ReactNode }) {
+  return (
+    <html lang="en">
+      <body className="bg-slate-950 text-slate-50">
+        <div className="min-h-screen max-w-4xl mx-auto p-6">{children}</div>
+      </body>
+    </html>
+  );
+}
diff --git a/app/page.tsx b/app/page.tsx
new file mode 100644
--- /dev/null
+++ b/app/page.tsx
+export default function HomePage() {
+  return (
+    <main className="space-y-6">
+      <header className="space-y-2">
+        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Farcaster Frame-first</p>
+        <h1 className="text-4xl font-semibold">ComCelo</h1>
+        <p className="text-slate-300 max-w-2xl">
+          A 1v1 turn-based tactical duel on a compact 3x3 grid. Built for Farcaster Frames, secured by
+          Celo. Heroes, soldiers, and archers clash in quick, high-stakes bouts.
+        </p>
+      </header>
+      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
+        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
+        <ul className="space-y-2 text-sm text-slate-200">
+          <li>• View frames (coming soon)</li>
+          <li>• Start a duel (on-chain)</li>
+          <li>• Read the docs</li>
+        </ul>
+      </section>
+    </main>
+  );
+}
diff --git a/app/globals.css b/app/globals.css
new file mode 100644
--- /dev/null
+++ b/app/globals.css
+@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
+
+:root {
+  --bg: #0a0d14;
+  --fg: #e2e8f0;
+  --accent: #67e8f9;
+}
+
+* {
+  box-sizing: border-box;
+}
+
+body {
+  margin: 0;
+  font-family: 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
+  background: radial-gradient(circle at 20% 20%, rgba(103, 232, 249, 0.08), transparent 35%),
+    radial-gradient(circle at 80% 30%, rgba(129, 140, 248, 0.08), transparent 40%),
+    var(--bg);
+  color: var(--fg);
+}
+
+a {
+  color: inherit;
+  text-decoration: none;
+}
diff --git a/app/api/frames/start/route.ts b/app/api/frames/start/route.ts
new file mode 100644
--- /dev/null
+++ b/app/api/frames/start/route.ts
+import { NextResponse } from "next/server";
+
+export const runtime = "edge";
+
+export async function GET() {
+  const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
+
+  return NextResponse.json({
+    image: "https://placehold.co/600x400/0f172a/67e8f9?text=ComCelo+Frame",
+    post_url: `${origin}/api/frames/start`,
+    buttons: [
+      { label: "Start Duel", action: "post" },
+      { label: "Spectate", action: "post" }
+    ],
+    input: { text: "Enter opponent address" },
+    metadata: {
+      title: "ComCelo Frame"
+    }
+  });
+}
+
+export async function POST(request: Request) {
+  const body = await request.json().catch(() => ({}));
+
+  return NextResponse.json({
+    ok: true,
+    message: "Frame action received (placeholder)",
+    received: body
+  });
+}