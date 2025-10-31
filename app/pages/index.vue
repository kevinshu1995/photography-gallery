<template>
    <UContainer as="main">
        <header class="min-h-[70vh] flex items-center">
            <div>
                <h1 class="uppercase text-[10vw] font-black leading-none">photography</h1>
                <p>Moments, made lasting.</p>
                <p>Light. Frame. Story.</p>
                <p>From moments to meaning.</p>
                <p>Every shutter tells a story.</p>
                <p>Time pauses, life remains.</p>
                <p>Turning moments into memories.</p>
            </div>
        </header>
        <BaseImageGallery :gallery="gallery" v-if="gallery && gallery.length > 0" />
    </UContainer>
</template>

<script lang="ts" setup>
// useAsyncData 在 SSG build 時會執行，資料會被寫入靜態 HTML
const { data: gallery } = await useAsyncData("gallery-images", () => {
    return queryCollection("gallery").where("published", "=", true).all();
});
</script>

