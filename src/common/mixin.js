import { debounce } from "./utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    // debounce 是封装的防抖函数
    let refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    // 图片加载完之后刷新一次 scroll的高度
    this.$bus.$on("detaiulItemIamgeLoad", this.itemImgListener);
  }
};
