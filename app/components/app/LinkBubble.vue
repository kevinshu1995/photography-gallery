<template>
    <div class="fixed inset-x-0 bottom-0 pb-6 px-8 flex items-center justify-end">
        <div class="rounded-full backdrop-blur bg-white/70 border border-gray-100 shadow-xl/10 py-1 px-4 flex items-center">
            <UButton v-for="link in sites" size="lg" class="cursor-pointer text-highlighted gap-0" target="_blank" :to="link.link" variant="link" color="neutral">
                <template v-if="link.label">
                    <span>{{ link.label }}</span>
                    <UIcon name="mdi:arrow-top-right" />
                </template>

                <UIcon :name="link.icon" v-if="link.icon" />
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
const sites = [
    {
        label: "",
        icon: "simple-icons:instagram",
        link: "https://www.instagram.com/kevinshu/",
    },
    {
        label: "",
        icon: "simple-icons:github",
        link: "https://github.com/kevinshu1995",
    },
    {
        label: "Website",
        icon: "",
        link: "https://hsiu.soy",
    },
];
</script>

