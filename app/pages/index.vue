<template>
    <div>
        <div v-if="gallery && gallery.length > 0">
            <img v-for="item in gallery" :key="item.image" :src="item.image" :alt="item.image" loading="lazy" />
        </div>
    </div>
</template>

<script lang="ts" setup>
// useAsyncData 在 SSG build 時會執行，資料會被寫入靜態 HTML
const { data: gallery } = await useAsyncData("gallery-images", () => {
    return queryCollection("gallery").all();
});
</script>

