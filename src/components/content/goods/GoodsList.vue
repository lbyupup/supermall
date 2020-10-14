<template>
  <div class="goods">
    <goods-list-item v-for="(item, i) in goods" :key="i" :goods-item="item" />
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      tyoe: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>