<template>
    <h1 ref="animated-text" :class="[!hasOnMounted && 'absolute', !hasOnMounted && 'opacity-0']">
        <slot />
    </h1>
</template>

<script setup lang="ts">
import { createTimeline, stagger, utils, splitText } from "animejs";

const refText = useTemplateRef("animated-text");

const hasOnMounted = ref(false);

onMounted(async () => {
    await nextTick();
    if (refText.value) {
        hasOnMounted.value = true;
        const tl = createTimeline({
            loop: false,
            defaults: { ease: "inOut(3)", duration: 1000 },
        });
        const $text = utils.$(refText.value)[0] as HTMLElement;
        const { chars } = splitText($text as HTMLElement, {
            chars: true,
        });

        utils.set(chars, { y: "100%", filter: "blur(10px)", opacity: 0 });
        tl.add(
            chars,
            {
                y: [() => utils.random(-100, 100, 10) + "%", "0%"],
                filter: "blur(0px)",
                opacity: 1,
            },
            stagger(100)
        );
    }
});
</script>

