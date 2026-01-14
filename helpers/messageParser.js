// メッセージ解析ヘルパー

/**
 * メッセージから年齢情報を抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {number|null} 抽出された年齢（0〜5）、見つからない場合はnull
 */
function extractAge(message) {
  // 「0歳児」「1歳」「2才」などのパターンにマッチ
  const agePatterns = [
    /(\d+)歳児/,
    /(\d+)歳/,
    /(\d+)才/
  ];

  for (const pattern of agePatterns) {
    const match = message.match(pattern);
    if (match) {
      const age = parseInt(match[1], 10);
      if (age >= 0 && age <= 5) {
        return age;
      }
    }
  }

  return null;
}

/**
 * メッセージから月情報を抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {number|null} 抽出された月（1〜12）、見つからない場合はnull
 */
function extractMonth(message) {
  // 「4月」「12月」などのパターンにマッチ
  const monthPattern = /(\d{1,2})月/;
  const match = message.match(monthPattern);

  if (match) {
    const month = parseInt(match[1], 10);
    if (month >= 1 && month <= 12) {
      return month;
    }
  }

  return null;
}

/**
 * メッセージから年齢、月を一括抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {Object} 抽出された情報 { age, month }
 */
function parseMessage(message) {
  return {
    age: extractAge(message),
    month: extractMonth(message)
  };
}

module.exports = {
  extractAge,
  extractMonth,
  parseMessage
};
