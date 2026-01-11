// メッセージ判定ヘルパー

/**
 * 文例生成依頼かどうかを判定
 * @param {string} messageText - 判定対象のメッセージテキスト
 * @returns {boolean} 文例生成依頼の場合true
 */
function isExampleRequest(messageText) {
  const patterns = [
    /文例/,
    /書いて/,
    /作成/,
    /作って/,
    /例文/,
    /テンプレート/,
    /お便り/,
  ];

  return patterns.some(pattern => pattern.test(messageText));
}

module.exports = {
  isExampleRequest
};
