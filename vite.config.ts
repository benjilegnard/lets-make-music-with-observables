import { defineConfig, PluginOption } from "vite";
import preact from "@preact/preset-vite";
import { dirname, resolve, join } from "node:path";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** returns an object with all entry points ( main index.html and examples folder) */
const getFilesInput = () => {
  const results = readdirSync(join(__dirname, "examples"));
  return results.reduce(
    (acc, val) => {
      acc[val] = resolve(__dirname, `examples/${val}/index.html`);
      console.log("val", val);
      return acc;
    },
    // initial value of accumulator
    {
      main: resolve(__dirname, "index.html"),
    },
  );
};

/** reload markdown file on changes */
const CustomHmr: () => PluginOption = () => ({
  name: "custom-hmr",
  enforce: "post",
  apply: "serve",
  handleHotUpdate({ file, server }) {
    if (file.endsWith(".md")) {
      console.log("markdown file changed, reloading...");
      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    }
  },
});

export default defineConfig({
  plugins: [CustomHmr(), preact()],
  build: {
    rollupOptions: {
      input: getFilesInput(),
    },
  },
});
