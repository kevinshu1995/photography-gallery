import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
    collections: {
        gallery: defineCollection({
            type: "data",
            source: "gallery/**.json",
            schema: z.object({
                image: z.string(),
                description: z.string(),
                date: z.string(),
                tags: z.array(z.string()),
                location: z.string(),
                published: z.boolean(),
                weight: z.number(),
            }),
        }),
    },
});

