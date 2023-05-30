/**
 * 데이터 빈값 체크
 * @param {object} form
 * @returns {boolean}
 */
exports.checkForm = (form) => {
  if (form) {
    for (let item in form) {
      if (isCheckNull(form[item])) {
        return false;
      }
    }
  }
  return true;
};

/**
 * 타겟의 빈값 체크
 * @param {any} target
 * @returns {boolean}
 */
exports.isCheckNull = (target) => {
  return !(target === null || target === "" || target === undefined);
};
