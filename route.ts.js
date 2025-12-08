diff --git a/app/api/health/route.ts b/app/api/health/route.ts
new file mode 100644
--- /dev/null
+++ b/app/api/health/route.ts
+import { NextResponse } from "next/server";
+
+export const runtime = "edge";
+
+export async function GET() {
+  return NextResponse.json({
+    ok: true,
+    service: "ComCelo",
+    timestamp: Date.now()
+  });
+}
diff --git a/app/api/state/route.ts b/app/api/state/route.ts
new file mode 100644
--- /dev/null
+++ b/app/api/state/route.ts
+import { NextRequest, NextResponse } from "next/server";
+
+export const runtime = "edge";
+
+export async function GET(request: NextRequest) {
+  const { searchParams } = new URL(request.url);
+  const gameId = searchParams.get("gameId") || "0";
+
+  return NextResponse.json({
+    gameId,
+    status: "placeholder",
+    message: "State retrieval to be wired to Celo smart contract",
+    units: [],
+    turn: 0
+  });
+}