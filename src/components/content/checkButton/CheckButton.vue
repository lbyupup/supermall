<template>
  <div class="check-button">
    <img :class="{ check: isChecked }" src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    // 这的 isChecked 是由vuex里面的状态决定的
    isChecked: {
      type: Boolean,
    },
  },
};
</script>
<style scoped>
.check-button img {
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid hotpink;
}
.check {
  background-color: hotpink;
}
</style>