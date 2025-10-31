<template>
    <ul class="relative overflow-hidden text-[20px]">
        <li v-for="text in texts" :key="text" ref="animated-texts">{{ text }}</li>
    </ul>
</template>

<script setup lang="ts">
import { createTimeline, stagger, utils, splitText } from "animejs";

const refTexts = useTemplateRef("animated-texts");

const texts = computed(() => {
    return [
        "Moments, made lasting.",
        "Light. Frame. Story.",
        "From moments to meaning.",
        "Every shutter tells a story.",
        "Time pauses, life remains.",
        "Time pauses, life remains.",
        "Turning moments into memories.",
    ];
});

onMounted(() => {
    if (refTexts.value) {
        const tl = createTimeline({
            loop: true,
            defaults: { ease: "inOut(3)", duration: 800 },
        });
        utils.$(refTexts.value).forEach(($text, index) => {
            if (index !== 0) {
                utils.set($text, { position: "absolute", left: "0", top: "0" });
            }
            const { words } = splitText($text as HTMLElement, {
                words: { wrap: "clip" },
                chars: true,
            });
            utils.set(words, { y: "100%", opacity: 0 });
            tl.add(
                words,
                {
                    y: ["100%", "0%"],
                    opacity: 1,
                },
                stagger(100, { from: "random" })
            ).add(
                words,
                {
                    y: ["0%", "-100%"],
                    opacity: 0,
                    delay: 300,
                },
                stagger(100, { from: "random" })
            );
        });
    }
});
</script>

