import { BuildOptions, Plugin } from "../deps/esbuild.ts";
import { context } from "../deps/esbuild.ts";
import { denoPlugins } from "../deps/esbuild_deno_loader.ts";
import { expandGlob } from "../deps/fs.ts";
import { resolve, toFileUrl } from "../deps/path.ts";

export const glob = async (pattern: string) => {
  const res = [];

  for await (const item of expandGlob(pattern)) {
    res.push(item.path);
  }

  return res;
};

export const genConfig = async (
  entryPoints: string[],
  plugins: Plugin[],
): Promise<BuildOptions> => {
  return {
    format: "esm",
    plugins: [
      ...denoPlugins({ configPath: resolve("./deno.json") }),
      ...plugins,
    ],
    outdir: ".out/",
    bundle: true,
    splitting: true,
    minify: true,
    entryPoints: (await Promise.all(entryPoints.map((x) => glob(x)))).flat()
      .map((x) => toFileUrl(x).toString()),
    jsxImportSource: "jquery-jsx",
    jsxFactory: "h",
    jsx: "automatic",
  };
};

export const serve = async (port: number, config: BuildOptions) => {
  const ctx = await context(config);

  console.log(`http://localhost:${port}`);

  await ctx.serve({
    port: port,
    servedir: config.outdir!,
  });
};

export const build = async (config: BuildOptions) => {
  const ctx = await context(config);

  await ctx.rebuild();

  await ctx.dispose();
};
