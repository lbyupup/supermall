<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button
        :is-checked="cartListItem.checked"
        @click.native="checkClick"
      />
    </div>

    <!-- 商品图 -->
    <div class="item-img">
      <img :src="cartListItem.image" alt="商品图片" />
    </div>

    <!-- 商品信息 -->
    <div class="item-info">
      <div class="item-title">{{ cartListItem.title }}</div>
      <div class="item-desc">{{ cartListItem.desc }}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{ cartListItem.price }}</div>
        <div class="item-count right">x{{ cartListItem.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },

  props: {
    cartListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      // 这里修改了checked vuex里面的也会修改
      this.cartListItem.checked = !this.cartListItem.checked;
    },
  },
};
</script>
<style scoped>
#shop-item {
  display: flex;
  width: 100%;
  border-bottom: 2px solid #ccc;
  padding: 10px;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img img {
  width: 80px;
  height: 120px;
  border-radius: 5px;
  margin-right: 10px;
  display: block;
}
.item-info {
  overflow: hidden;
}
.item-title,
.item-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  margin-bottom: 15px;
}
.item-desc {
  font-size: 13px;
  color: #333;
}
.item-bottom {
  margin-top: 40px;
}
.item-price {
  color: red;
  font-size: 18px;
}
.item-count {
  margin-right: 10px;
  font-size: 18px;
}
</style>