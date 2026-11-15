import { build, createServer, preview } from "vite";
import { spawn } from "node:child_process";

// Keep Vite in this process: Playwright's shell process-tree shutdown can stall
// on Windows. Every run owns its server and closes it after the test child exits.
let server;
let production;
async function closeServers() {
  await server?.close();
  if (production)
    await new Promise((resolve) => production.httpServer.close(resolve));
}
try {
  const previousEnvironment = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  await build();
  if (previousEnvironment === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = previousEnvironment;
  server = await createServer({
    server: { host: "127.0.0.1", port: 4173, strictPort: true },
  });
  production = await preview({
    preview: { host: "127.0.0.1", port: 4175, strictPort: true },
  });
  await server.listen();
  const child = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    { stdio: "inherit", env: { ...process.env, ENDZONE_E2E_SERVER: "1" } },
  );
  const code = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
  await closeServers();
  process.exit(code);
} catch (error) {
  await closeServers();
  console.error(error);
  process.exit(1);
}
