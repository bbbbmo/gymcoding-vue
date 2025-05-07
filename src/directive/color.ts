import type { DirectiveBinding } from 'vue'

function color(el: HTMLElement, binding: DirectiveBinding) {
  el.style.color = binding.value
}

export default color
