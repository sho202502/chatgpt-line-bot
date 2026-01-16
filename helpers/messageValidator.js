// メッセージ判定ヘルパー

/**
 * 文例生成対象外かどうかを判定（ブラックリスト方式）
 * @param {string} messageText - 判定対象のメッセージテキスト
 * @returns {boolean} 除外対象の場合true
 */
function isIgnoreMessage(messageText) {
  // 明確に連絡帳と無関係なものだけを除外
  const ignorePatterns = [
    /^https?:\/\//,
    /使い方/,
    /ヘルプ/,
    /設定/,
  ];

  return ignorePatterns.some((p) => p.test(messageText));
}

module.exports = {
  isIgnoreMessage
};
