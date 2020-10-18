export function debounce(func, delay) {
  // 防抖函数
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // 改变定时器this指向
      func.apply(this, args);
    }, delay);
  };
}

// 格式化时间戳函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
// 04:04:04
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
