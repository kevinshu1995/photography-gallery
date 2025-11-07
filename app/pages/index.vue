<template>
    <UContainer as="main">
        <header class="min-h-[70vh] flex items-center">
            <div>
                <BaseAnimationHeading class="uppercase text-[10vw] font-black leading-none">photography</BaseAnimationHeading>
                <BaseTextSlider />
            </div>
        </header>
        <div class="pt-0 pb-40">
            <p class="text-[24px]">
                This site features work I'm proud to share. <br />
                I hope you enjoy it—feel free to <ULink class="underline" to="#contact">reach out</ULink> anytime!
            </p>
        </div>
        <BaseImageGallery :gallery="gallery" v-if="gallery && gallery.length > 0" />
        <div id="contact" class="flex items-center justify-center pt-70 pb-60">
            <div class="flex flex-col md:flex-row justify-center text-center gap-8 max-w-[600px]">
                <div>
                    <NuxtImg class="max-w-[250px]" src="/me.jpg" alt="" />
                </div>
                <div class="space-y-5">
                    <p style="text-align: justify">
                        <span class="text-[32px] font-bold">Hey!</span><br />
                        I'm a Taiwan-based engineer who loves photography, usually out on weekends chasing sunrise in the mountains or candid moments on city streets. I focus on landscapes and
                        portraits, working with natural light to keep things honest and heartfelt. This site collects moments I’m proud to share—feel free to look around or say hi anytime.
                    </p>
                    <div class="flex flex-col gap-3 items-start w-full">
                        <ULink class="flex items-center gap-1 underline" to="https://www.instagram.com/kevinshu">
                            <span class="leading-none">Instagram</span>
                            <UIcon name="mdi:arrow-top-right" />
                        </ULink>

                        <ULink class="flex items-center gap-1 underline" to="mailto:kevin.hsu.hws@gmail.com">
                            <span class="leading-none">Email</span>
                            <UIcon name="mdi:arrow-top-right" />
                        </ULink>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<script lang="ts" setup>
// useAsyncData 在 SSG build 時會執行，資料會被寫入靜態 HTML
const { data: gallery } = await useAsyncData("gallery-images", () => {
    return queryCollection("gallery").where("published", "=", true).order("DateTimeOriginal", "DESC").all();
});
</script>

