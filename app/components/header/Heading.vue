<template>
    <h1 ref="animated-text" :class="[!!refText || 'absolute', !!refText || 'opacity-0']">
        <slot />
    </h1>
</template>

<script setup lang="ts">
import { createTimeline, stagger, utils, splitText, type Timeline } from "animejs";

const props = defineProps<{
    duration: number;
}>();

const refText = useTemplateRef("animated-text");

const { state: isPageAnimationLoaded } = useGlobalPageLoaded();

const tl = shallowRef<Timeline | null>(null);

onMounted(async () => {
    await nextTick();

    if (refText.value) {
        tl.value = createTimeline({
            loop: false,
            defaults: { ease: "inOut(3)", duration: props.duration },
        });
        const $text = utils.$(refText.value)[0] as HTMLElement;
        const { chars } = splitText($text as HTMLElement, {
            chars: true,
        });

        utils.set(chars, { y: "100%", filter: "blur(10px)", opacity: 0 });
        tl.value
            .add(
                chars,
                {
                    y: [() => utils.random(-100, 100, 10) + "%", "0%"],
                    filter: "blur(0px)",
                    opacity: 1,
                },
                stagger(100)
            )
            .reset();
    }
});

watch(isPageAnimationLoaded, async () => {
    await nextTick();
    if (tl.value) {
        tl.value.play();
    }
});
</script>

