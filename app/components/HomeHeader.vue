<template>
    <header class="min-h-screen flex items-center relative">
        <div>
            <HeaderHeading class="uppercase text-[8vw] font-black leading-none" :duration="headingDuration">photography</HeaderHeading>
            <HeaderTextSlider :delay="headingDuration" />
        </div>
        <div class="absolute left-0 bottom-0 mb-8 flex items-center justify-start">
            <p ref="description" :class="['text-[24px]', !!refDescription || 'opacity-0']">
                This site features work I'm proud to share. <br />
                I hope you enjoy it—feel free to <ULink class="underline" to="#contact">reach out</ULink> anytime!
            </p>
        </div>
    </header>
</template>

<script setup lang="ts">
import { createTimeline, type Timeline } from "animejs";

const { state: isPageAnimationLoaded } = useGlobalPageLoaded();
const headingDuration = ref(1000);

const refDescription = useTemplateRef("description");

const tl = shallowRef<Timeline | null>(null);

onMounted(async () => {
    await nextTick();
    if (refDescription.value) {
        tl.value = createTimeline({ delay: headingDuration.value });

        tl.value
            .add(refDescription.value, {
                duration: 1000,
                opacity: {
                    from: 0,
                    to: 1,
                },
            })
            .reset();
    }
});

watch(isPageAnimationLoaded, async () => {
    await nextTick();
    if (isPageAnimationLoaded.value && tl.value) {
        tl.value.play();
    }
});
</script>

