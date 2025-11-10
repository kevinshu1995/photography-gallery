<template>
    <div class="fixed w-full h-full inset-0 z-99 bg-black/90 loading-bg" style="--animation-duration: 3s" ref="loading">
        <div class="w-full h-full glowing-line flex items-center justify-center">
            <span class="animate-pulse uppercase text-white text-[10vw] font-bold">Loading</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createTimeline } from "animejs";

const refLoading = useTemplateRef("loading");

const { update: pageAnimationLoaded } = useGlobalPageLoaded();

onMounted(async () => {
    await nextTick();
    await new Promise(resolve => setTimeout(resolve, 300));
    if (refLoading.value) {
        const tl = createTimeline({ defaults: { duration: 500 } });
        tl.add(
            refLoading.value,
            {
                ease: "outIn",
                "--animation-duration": {
                    from: () => 3 + "s",
                    to: () => 0.3 + "s",
                },
            },
            0
        ).add(
            refLoading.value,
            {
                opacity: {
                    from: 1,
                    to: 0,
                },
                onComplete() {
                    if (refLoading.value) {
                        refLoading.value.style = "display: none";
                        pageAnimationLoaded(true);
                    }
                },
            },
            "*=0.3"
        );
    }
});
</script>

<style scoped>
@property --gradient-angle-1 {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
}

@property --gradient-angle-2 {
    syntax: "<angle>";
    inherits: false;
    initial-value: -180deg;
}

.glowing-line {
    --c: #222;
    --p: 10%;
    background:
        linear-gradient(var(--c), var(--c)) padding-box,
        conic-gradient(from var(--gradient-angle-1, 0deg), transparent, #fff var(--p), transparent calc(var(--p) * 2)) border-box,
        conic-gradient(from var(--gradient-angle-2, 0deg), transparent, #fff var(--p), transparent calc(var(--p) * 2)) border-box;

    animation: glowing-line var(--animation-duration) linear infinite;
    border: 1px solid transparent;
}
@keyframes glowing-line {
    from {
        --gradient-angle-1: 0deg;
        --gradient-angle-2: -180deg;
    }
    to {
        --gradient-angle-1: 360deg;
        --gradient-angle-2: 180deg;
    }
}
</style>

