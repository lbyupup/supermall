import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 解决移动端300ms延迟
// 移动端鼠标快速点击插件
import FastClick from "fastclick";

// 自定义插件
import toast from "components/common/toast";

Vue.config.productionTip = false;
// 添加事件总线
Vue.prototype.$bus = new Vue();

// 安装自定义插件
Vue.use(toast);

// 解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
