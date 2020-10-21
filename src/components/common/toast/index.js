import Toast from "./Toast";

const obj = {};

obj.install = function(Vue) {
  // 这个方法不行 因为Toast组件还没创建
  // document.body.appendChild(Toast.$el);

  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2. new的方式 根据组件构造器 创建一个组件对象
  const toast = new toastContrustor();

  // 3. 将组件对象手动挂载到某一个元素
  toast.$mount(document.createElement("div"));

  // 4. toast.$el 就是对象的div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};

export default obj;
