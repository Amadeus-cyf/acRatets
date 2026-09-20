import { gzipSync } from "node:zlib";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const assetsDirectory = resolve("dist/assets");
const maxTotalJavaScriptGzipBytes = 200 * 1024;
const maxChunkBytes = 300 * 1024;
const maxTotalImageBytes = 750 * 1024;
const maxImageBytes = 250 * 1024;

const assetNames = await readdir(assetsDirectory);
const javaScriptNames = assetNames.filter((name) => name.endsWith(".js"));
const imageNames = assetNames.filter((name) =>
    /\.(?:avif|jpe?g|png|webp)$/i.test(name)
);

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
const images = await Promise.all(
    imageNames.map(async (name) => {
        const contents = await readFile(resolve(assetsDirectory, name));
        return { name, bytes: contents.byteLength };
    })
);
const totalImageBytes = images.reduce((total, image) => total + image.bytes, 0);
const oversizedImages = images.filter(({ bytes }) => bytes > maxImageBytes);

console.log(
    `JavaScript bundle: ${(totalGzipBytes / 1024).toFixed(1)} KiB gzip across ${bundles.length} chunks`
);
console.log(
    `Local images: ${(totalImageBytes / 1024).toFixed(1)} KiB across ${images.length} assets`
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

if (oversizedImages.length > 0) {
    const details = oversizedImages
        .map(({ name, bytes }) => `${name}: ${(bytes / 1024).toFixed(1)} KiB`)
        .join(", ");
    throw new Error(`Individual image budget exceeded (${details})`);
}

if (totalImageBytes > maxTotalImageBytes) {
    throw new Error(
        `Total image budget exceeded: ${(totalImageBytes / 1024).toFixed(1)} KiB > 750 KiB`
    );
}
