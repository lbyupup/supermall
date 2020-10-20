<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />全选
      <div class="totalPrice">合计:￥{{ totalPrice }}</div>
      <div class="calculate">去付款({{ checkLength }})</div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {
      checkedGoods: [],
    };
  },
  computed: {
    totalPrice() {
      // 保存选中的商品 是一个数组
      this.checkedGoods = this.$store.state.cartList.filter((item) => {
        return item.checked;
      });
      // 判断数组里面的商品数 为0 则返回0￥
      if (this.checkedGoods.length === 0) {
        return 0;
      } else {
        // 0是初始值 preValue 是每次相加之后的和
        return this.checkedGoods.reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0);
      }
    },
    checkLength() {
      return this.checkedGoods.length;
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #f0f0f0;
}
.check-content {
  line-height: 40px;
  display: flex;
  height: 100%;
}
.check-button {
  margin-top: 4px;
  margin-left: 5px;
}
.totalPrice {
  text-align: center;
  font-size: 15px;
  width: 153px;
}
.calculate {
  background-color: red;
  color: #fff;
  width: 100px;
  text-align: center;
}
</style>