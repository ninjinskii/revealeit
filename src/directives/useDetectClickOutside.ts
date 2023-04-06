import { onMounted, onUnmounted, Ref } from "vue";

export default function useDetectOutsideClick(
  component: Ref,
  excludeId: string,
  callback: () => any,
) {
  if (!component) {
    return;
  }

  const listener = (event: Event) => {
    const isExcluded = event.target instanceof HTMLElement &&
      event.target.id === excludeId;
    const isSelf = event.target !== component.value &&
      event.composedPath().includes(component.value);

    if (isExcluded || isSelf) {
      return;
    }

    callback();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onUnmounted(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
