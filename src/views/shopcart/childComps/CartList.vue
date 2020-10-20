<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :cartListItem="item"
      :key="index"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    // 计算属性 计算store中的getters
    ...mapGetters(["cartList"]),
  },
};
</script>
<style scoped>
</style>