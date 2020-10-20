<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>
<script>
// 导入组件
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import Scroll from "components/common/scroll/Scroll";
import CartBottomBar from "./childComps/CartBottomBar";

// 导入vuex的辅助函数
import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  computed: {
    // vuex 提供的一个方法 可以吧getters中的函数混合然后直接转化为计算属性
    // 第一种语法 cartLength为计算属性名
    // ...mapGetters(["cartLength", "cartList"]),
    // 第二种语法 键值对 键就是计算属性名 名可以自定义
    ...mapGetters({ length: "cartLength" }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
.content {
  height: calc(100% - 133px);
  overflow: hidden;
}
</style>