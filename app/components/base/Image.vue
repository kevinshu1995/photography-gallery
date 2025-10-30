<template>
    <div>
        <NuxtImg :src="src" :alt="alt" densities="x1 x2" placeholder format="webp" loading="lazy" ref="img" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    src: string;
    alt: string;
}>();
</script>

