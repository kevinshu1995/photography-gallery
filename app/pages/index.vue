<template>
    <div v-if="images && images.length > 0" class="gallery">
        <img v-for="image in images" :key="image" :src="image" :alt="image" loading="lazy" />
    </div>
</template>

<script lang="ts" setup>
// useAsyncData 在 SSG build 時會執行，資料會被寫入靜態 HTML
const { data: images } = await useAsyncData("gallery-images", () => $fetch<string[]>("/api/images"));

// Debug: 開發時查看圖片數量
if (import.meta.dev) {
    console.log(`找到 ${images.value?.length || 0} 張圖片`, images.value);
}
</script>

