// メッセージ判定ヘルパー
const { IGNORE_PATTERNS } = require('../config');

/**
 * 文例生成対象外かどうかを判定（ブラックリスト方式）
 * @param {string} messageText - 判定対象のメッセージテキスト
 * @returns {boolean} 除外対象の場合true
 */
function isIgnoreMessage(messageText) {
  return IGNORE_PATTERNS.some((p) => p.test(messageText));
}

module.exports = {
  isIgnoreMessage
};
