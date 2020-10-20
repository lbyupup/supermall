// 导入常量 这样的话就算函数名写错也没事 反正大家一起错了
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  // mutations 唯一目的是修改state的状态
  // mutations 中的每个方法尽可能完成的事件单一点

  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
