
import fs from "node:fs";
import esbuild from "esbuild";

const html = fs.readFileSync("ui.html", "utf8");

await esbuild.build({
  entryPoints: ["src/code.ts"],
  bundle: true,
  outfile: "dist/code.js",
  target: "es2017",
  define: {
    __html__: JSON.stringify(html)
  }
});

console.log("DesignLint build completed!");
