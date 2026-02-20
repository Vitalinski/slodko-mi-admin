import type { DirectiveBinding } from "vue";

interface ClickOutsideHTMLElement extends HTMLElement {
  __clickOutsideHandler__?: (event: MouseEvent) => void;
}

export const vClickOutside = {
  beforeMount(el: ClickOutsideHTMLElement, binding: DirectiveBinding) {
    el.__clickOutsideHandler__ = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event);
      }
    };
    if (el.__clickOutsideHandler__) {
      setTimeout(() => {
        document.addEventListener("click", el.__clickOutsideHandler__!);
      }, 0);
    }
  },

  unmounted(el: ClickOutsideHTMLElement) {
    document.removeEventListener("click", el.__clickOutsideHandler__!);
    delete el.__clickOutsideHandler__;
  },
};
