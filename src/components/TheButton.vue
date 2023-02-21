<template>
  <button 
    class="rounded-md py-1 px-4 font-semibold tracking-wide"
    :class="[type, color]"
    @click="$emit('action')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'bg-gray-500'
    },
    color: {
      type: String,
      default: 'text-white'
    }
  }
}
</script>

<style>

</style>