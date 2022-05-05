import md5 from "js-md5";

// 花里胡哨的盐
const SALT = "XX~~manbu~~blog~~XX";

/**
 * 加盐加密方法
 * @param {*} val
 * @returns
 */
export function md5EncryHex(val) {
  return md5(SALT + val);
}
