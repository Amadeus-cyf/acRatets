import { gzipSync } from "node:zlib";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const assetsDirectory = resolve("dist/assets");
const maxTotalJavaScriptGzipBytes = 200 * 1024;
const maxChunkBytes = 300 * 1024;

const assetNames = await readdir(assetsDirectory);
const javaScriptNames = assetNames.filter((name) => name.endsWith(".js"));

if (javaScriptNames.length === 0) {
    throw new Error("No JavaScript bundles were found. Run the build first.");
}

const bundles = await Promise.all(
    javaScriptNames.map(async (name) => {
        const contents = await readFile(resolve(assetsDirectory, name));
        return {
            name,
            bytes: contents.byteLength,
            gzipBytes: gzipSync(contents).byteLength,
        };
    })
);

const oversizedChunks = bundles.filter(({ bytes }) => bytes > maxChunkBytes);
const totalGzipBytes = bundles.reduce(
    (total, bundle) => total + bundle.gzipBytes,
    0
);

console.log(
    `JavaScript bundle: ${(totalGzipBytes / 1024).toFixed(1)} KiB gzip across ${bundles.length} chunks`
);

if (oversizedChunks.length > 0) {
    const details = oversizedChunks
        .map(({ name, bytes }) => `${name}: ${(bytes / 1024).toFixed(1)} KiB`)
        .join(", ");
    throw new Error(`JavaScript chunk budget exceeded (${details})`);
}

if (totalGzipBytes > maxTotalJavaScriptGzipBytes) {
    throw new Error(
        `Total JavaScript budget exceeded: ${(totalGzipBytes / 1024).toFixed(1)} KiB gzip > 200 KiB gzip`
    );
}
