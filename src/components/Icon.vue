<template>
  <i
    :class="`mdi mdi-${name}`"
    :style="{ color, fontSize: size }"
  />
</template>

<script>
export default {
  props: {
    name: String,
    color: String,
    size: {
      type: String,
      default: "24px"
    }
  }
};
</script>
