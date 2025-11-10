export function useGlobalPageLoaded() {
    const loadingAnimationHasEnded = useState("loadingAnimationHasEnded", () => false);

    function update(state: boolean) {
        loadingAnimationHasEnded.value = state;
    }

    const state = computed(() => loadingAnimationHasEnded.value);

    return {
        state,
        update,
    };
}

