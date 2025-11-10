<template>
    <ul class="relative overflow-hidden text-[20px]">
        <li v-for="(text, index) in texts" :key="text" ref="animated-texts" :class="[!hasOnMounted && index !== 0 && 'absolute', !hasOnMounted && 'opacity-0']">{{ text }}</li>
    </ul>
</template>

<script setup lang="ts">
import { createTimeline, stagger, utils, splitText } from "animejs";
import type { Timeline } from "animejs";

const props = defineProps<{
    delay: number;
}>();

const { state: isPageAnimationLoaded } = useGlobalPageLoaded();

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

const hasOnMounted = ref(false);

const tl = shallowRef<Timeline | null>(null);

onMounted(async () => {
    await nextTick();
    if (refTexts.value) {
        hasOnMounted.value = true;
        tl.value = createTimeline({
            loop: true,
            delay: props.delay, // 等 h1 動畫完成
            defaults: { ease: "inOut(3)", duration: 1000 },
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
            if (tl.value) {
                tl.value
                    .add(
                        words,
                        {
                            y: ["100%", "0%"],
                            opacity: 1,
                            delay: 300,
                        },
                        stagger(100, { from: "random" })
                    )
                    .add(
                        words,
                        {
                            y: ["0%", "-100%"],
                            opacity: 0,
                            delay: 800,
                        },
                        stagger(100, { from: "random" })
                    )
                    .reset();
            }
        });
    }
});

watch(isPageAnimationLoaded, async () => {
    await nextTick();
    if (tl.value) {
        tl.value.play();
    }
});
</script>

