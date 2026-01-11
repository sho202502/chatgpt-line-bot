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
 * メッセージからカテゴリを推測
 * @param {string} message - ユーザーメッセージ
 * @returns {string|null} 推測されたカテゴリ、見つからない場合はnull
 */
function extractCategory(message) {
  const categoryKeywords = {
    'daily_report': ['散歩', '活動', '遊び', '食事', '睡眠', '様子'],
    'event_notice': ['行事', 'イベント', 'お知らせ', '遠足', '運動会'],
    'absence': ['欠席', '休み', 'お休み'],
    'pickup': ['お迎え', '迎え', '降園']
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (message.includes(keyword)) {
        return category;
      }
    }
  }

  return null;
}

/**
 * メッセージから年齢、月、カテゴリを一括抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {Object} 抽出された情報 { age, month, category }
 */
function parseMessage(message) {
  return {
    age: extractAge(message),
    month: extractMonth(message),
    category: extractCategory(message)
  };
}

module.exports = {
  extractAge,
  extractMonth,
  extractCategory,
  parseMessage
};
