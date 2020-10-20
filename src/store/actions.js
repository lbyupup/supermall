// 导入常量 这样的话就算函数名写错也没事 反正大家一起错了
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    // 看看cartList里有没有已经存在的商品
    let oldProduct = context.state.cartList.find(
      item => item.iid === payload.iid
    );
    // 判断 oldPrice 是否有值
    if (oldProduct) {
      // 这里相当于上个for循环的item(cartList)里的count +1
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  }
};
