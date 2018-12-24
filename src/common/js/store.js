// 存储
export function saveToLocal(id, key, value) {
  // 必须指定是window空间下的  nodejs没有localStorage
  // 只有当js运行在浏览器环境下才有localStorage
  let seller = window.localStorage.__selller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.__selller__ = JSON.stringify(seller);
};
// 读取
export function locaFromLocal(id, key, def) {
  let seller = window.localStorage.__selller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
