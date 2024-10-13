"use strict";
const CHS_RANGE_START = 19968;
const CHS_RANGE_END = 40869;
function getRandomChsChar() {
  const randomCharCode = Math.floor(Math.random() * (CHS_RANGE_END - CHS_RANGE_START + 1)) + CHS_RANGE_START;
  return String.fromCharCode(randomCharCode);
}
function getRandomChsString(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += getRandomChsChar();
  }
  return result;
}
exports.g = getRandomChsString;
//# sourceMappingURL=character.js.map
