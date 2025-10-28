import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function getImagesRecursive(dir: string, baseDir: string): Promise<string[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    let images: string[] = [];

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            // 遞迴處理子資料夾
            const subImages = await getImagesRecursive(fullPath, baseDir);
            images = images.concat(subImages);
        } else {
            const ext = entry.name.substring(entry.name.lastIndexOf(".")).toLowerCase();
            if (imageExtensions.includes(ext)) {
                // 轉換成前端可用的路徑
                // /path/to/project/public/img/photo.jpg -> /img/photo.jpg
                const relativePath = fullPath.replace(baseDir, "").replace(/\\/g, "/");
                images.push(relativePath);
            }
        }
    }

    return images;
}

export default defineEventHandler(async event => {
    try {
        // 在 Nuxt 4，public 資料夾位於根目錄
        // process.cwd() 在開發和 build 時都指向專案根目錄
        const publicImgDir = join(process.cwd(), "public", "img");

        const images = await getImagesRecursive(publicImgDir, join(process.cwd(), "public"));

        return images.sort();
    } catch (error) {
        console.error("Error reading images directory:", error);
        return [];
    }
});

