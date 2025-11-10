<template>
    <div ref="container">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { animate, onScroll, cubicBezier } from "animejs";
import type { AnimationParams, ScrollObserverParams } from "animejs";

const props = defineProps<{
    configs?: AnimationParams;
    onScrollConfigs?: ScrollObserverParams;
}>();
const refContainer = useTemplateRef("container");

onMounted(async () => {
    await nextTick();
    if (refContainer.value) {
        animate(refContainer.value, {
            ease: cubicBezier(0.1, 0.7, 0.5, 1),
            duration: 500,
            loop: false,
            autoplay: onScroll({
                sync: "play",
                target: refContainer.value,
                // debug: true,
                ...(props.onScrollConfigs || {}),
            }),
            ...(props.configs || {}),
        });
    }
});
</script>

