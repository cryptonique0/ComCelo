diff --git a/test/ComCeloCore.test.ts b/test/ComCeloCore.test.ts
new file mode 100644
--- /dev/null
+++ b/test/ComCeloCore.test.ts
+import { expect } from "chai";
+import { ethers } from "hardhat";
+
+describe("ComCeloCore", () => {
+  it("deploys with default state", async () => {
+    const Factory = await ethers.getContractFactory("ComCeloCore");
+    const core = await Factory.deploy();
+    await core.waitForDeployment();
+
+    const address = await core.getAddress();
+    expect(address).to.properAddress;
+  });
+});