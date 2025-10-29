import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineNuxtModule } from "@nuxt/kit";

function getAllImages(dir: string, prefix = ""): string[] {
    let results: string[] = [];
    const files = readdirSync(dir);
    for (const file of files) {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(getAllImages(fullPath, prefix + file + "/"));
        } else {
            const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
            if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)) {
                results.push("/img/" + prefix + file);
            }
        }
    }
    return results;
}

export default defineNuxtModule({
    meta: {
        name: "gallery-images-module",
    },
    setup(_, nuxt) {
        // 這裡的 nuxt 有型別
        nuxt.hook("build:before", () => {
            const imgDir = join(process.cwd(), "public", "img");
            const images = getAllImages(imgDir);
            const outputPath = join(process.cwd(), "public", "gallery-images.json");
            writeFileSync(outputPath, JSON.stringify(images, null, 2));

            console.log("gallery-images.json saved");
        });
    },
});

