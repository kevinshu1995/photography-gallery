<template>
    <component :is="as" class="space-y-4">
        <NuxtImg :src="src" :alt="alt" densities="x1 x2" placeholder format="webp" loading="lazy" />

        <div class="text-[14px] space-y-2 hidden">
            <p class="text-[16px]" v-if="detail.description">{{ detail.description }}</p>
            <ul class="flex flex-wrap gap-2">
                <UBadge v-for="tag in detail.tags" :key="tag" as="li" color="neutral" variant="outline">{{ tag }}</UBadge>
            </ul>
            <div class="hidden">
                <USeparator />
                <p v-if="detail.LensSpecification">{{ detail.LensSpecification }}</p>
                <ul class="space-y-2">
                    <li v-for="item in detailList" :key="item.label" class="flex gap-1 items-center">
                        <UIcon :name="item.icon" />
                        <span class="leading-none">{{ item.label }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </component>
</template>

<script setup lang="ts">
import type { Collections } from "@nuxt/content";
const props = defineProps<{
    as: string;
    src: string;
    alt: string;
    detail: Collections["gallery"];
}>();

const camera = computed(() => `${props.detail.Make} ${props.detail.Model}`.trim());

const detailList = computed(() => {
    return [
        {
            icon: "carbon:calendar",
            label: dayjs(props.detail.DateTimeOriginal).format("MMM. YYYY"),
        },
        {
            icon: "carbon:camera",
            label: camera.value,
        },
        {
            icon: "carbon:aperture",
            label: props.detail.ExposureTime,
        },
        {
            icon: "carbon:timer",
            label: props.detail.FNumber,
        },
        {
            icon: "carbon:iso-outline",
            label: props.detail.ISOSpeedRatings,
        },
    ].filter(item => item.label);
});
</script>

