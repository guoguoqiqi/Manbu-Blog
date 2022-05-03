/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:31:24
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 22:31:24
 */

export default (date) => {
  if (!date) return "e";
  const dt = new Date(date);
  let y = dt.getFullYear(),
    m = dt.getMonth() + 1,
    d = dt.getDate(),
    h = dt.getHours(),
    mm = dt.getMinutes(),
    ss = dt.getSeconds();

  m = String(m).padStart(2, "0");
  d = String(d).padStart(2, "0");
  h = String(h).padStart(2, "0");
  mm = String(mm).padStart(2, "0");
  ss = String(ss).padStart(2, "0");

  return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
};
