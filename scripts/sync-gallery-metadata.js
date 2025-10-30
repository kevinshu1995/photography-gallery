import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ExifReader from "exifreader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_FOLDER = path.join(__dirname, "../public/img");
const METADATA_FOLDER = path.join(__dirname, "../content/gallery");

/**
 * 從 EXIF 數據中提取有用的資訊
 */
function extractExifData(tags) {
    const exif = {
        DateTime: "", // 編輯時間 {"2025:06:05 23:29:44"}
        DateTimeOriginal: "", // 拍攝時間 {"2025:03:17 14:22:52"}
        DateTimeDigitized: "", // 拍攝時間 {"2025:03:17 14:22:52"}
        ExposureTime: "", // 快門速度 {'1/640'}
        FNumber: "", // 快門速度 {'f/10.0'}
        ExposureMode: "", // {"Auto exposure"}
        ExposureProgram: "", // {"Aperture priority"}
        ISOSpeedRatings: "", // {125}
        Copyright: "",
        Artist: "",
        Make: "", // {'SONY'}
        LensSpecification: "", // {'55-55 mm f/1.8'}
        Model: "", // {"ILCE-7C"}
        Orientation: "", // {"top-left"}
        PixelXDimension: "", // {4598}
        PixelYDimension: "", // {3059}
        FocalLength: "", // {"55 mm"}
    };

    try {
        Object.keys(exif).forEach(key => {
            exif[key] = tags?.exif?.[key]?.description ?? null;
        });
    } catch (error) {
        console.warn("Error extracting EXIF data:", error.message);
    }

    return {
        ...exif,
    };
}

async function syncGalleryMetadata() {
    // 確保 metadata 資料夾存在
    await fs.mkdir(METADATA_FOLDER, { recursive: true });

    // 讀取所有圖片
    const imageFiles = await fs.readdir(IMAGE_FOLDER);
    const validImages = imageFiles.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    // // 讀取現有的 metadata 檔案
    // let existingMetadata = [];
    // try {
    //     const metadataFiles = await fs.readdir(METADATA_FOLDER);
    //     existingMetadata = metadataFiles.filter(f => f.endsWith(".json")).map(f => f.replace(".json", ""));
    // } catch (err) {
    //     // 資料夾不存在，忽略
    // }

    // 為每個新圖片建立 metadata 檔案（如果不存在）
    for (const imageFile of validImages) {
        const baseName = path.parse(imageFile).name;
        const metadataPath = path.join(METADATA_FOLDER, `${baseName}.json`);
        const imagePath = path.join(IMAGE_FOLDER, imageFile);

        try {
            await fs.access(metadataPath);
            // 檔案已存在，跳過
            console.log(`✓ Metadata exists: ${baseName}.json`);
        } catch {
            const fileBuffer = await fs.readFile(imagePath);
            const tags = ExifReader.load(fileBuffer, { expanded: true });
            const exif = extractExifData(tags);

            // 檔案不存在，建立新的
            const metadata = {
                image: `/img/${imageFile}`,
                description: "",
                date: "",
                tags: [],
                location: "",
                published: true,
                weight: 0,
                ...exif,
            };

            await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
            console.log(`✓ Created: ${baseName}.json`);
        }
    }

    console.log(`\n✅ Sync completed: ${validImages.length} images processed`);
}

syncGalleryMetadata().catch(console.error);

