const denoJson = {
  imports: {
    "jquery-jsx/":
      "https://raw.githubusercontent.com/ikasoba/deno-jquery-jsx/main/",
    "jquery-jsx/jsx-runtime":
      "https://raw.githubusercontent.com/ikasoba/deno-jquery-jsx/main/jsx-runtime.ts",
  },
  compilerOptions: {
    "jsx": "react-jsx",
    "jsxImportSource": "jquery-jsx",
    "jsxFactory": "h",
    "lib": ["deno.window", "dom"],
  },
};

const serveScript = `import { genConfig, serve } from "jquery-jsx/build.ts";
import { copy } from "npm:esbuild-plugin-copy";

const opt = await genConfig(
  ["src/**/*.tsx"],
  [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["src/*.{html,css}"],
        to: ["./.out/"],
      },
      watch: true,
    }),
  ],
);

serve(3000, opt);`;

Deno.writeTextFile("./deno.json", JSON.stringify(denoJson, null, "  "));
Deno.writeTextFile("./serve.ts", serveScript);
