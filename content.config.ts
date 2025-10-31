import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
    collections: {
        gallery: defineCollection({
            type: "data",
            source: "gallery/**.json",
            schema: z.object({
                fileId: z.string(),
                name: z.string(),
                image: z.string(),
                description: z.string(),
                date: z.string(),
                tags: z.array(z.string()),
                location: z.string(),
                customLocation: z.string(),
                published: z.boolean(),
                weight: z.number(),
                editedTime: z.string(),
                DateTimeOriginal: z.string(),
                DateTimeDigitized: z.string(),
                ExposureTime: z.string(),
                FNumber: z.string(),
                ExposureMode: z.string(),
                ExposureProgram: z.string(),
                ISOSpeedRatings: z.string(),
                Copyright: z.string(),
                Artist: z.string(),
                Make: z.string(),
                LensSpecification: z.string(),
                Model: z.string(),
                Orientation: z.string(),
                PixelXDimension: z.string(),
                PixelYDimension: z.string(),
                FocalLength: z.string(),
            }),
        }),
    },
});

