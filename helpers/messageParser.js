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
 * メッセージからタグを抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {Array<string>} 抽出されたタグの配列
 */
function extractTags(message) {
  const tagKeywords = {
    '散歩': ['散歩', 'お散歩', '公園'],
    '遊び': ['遊び', '遊んで', '遊具'],
    '食事': ['食事', '給食', 'ごはん', '昼食'],
    '睡眠': ['睡眠', '昼寝', 'お昼寝'],
    '日常': ['様子', '活動', '過ごし'],
    '行事': ['行事', 'イベント', '遠足', '運動会', '発表会'],
    'お知らせ': ['お知らせ', '連絡', '案内'],
    '欠席': ['欠席', '休み', 'お休み'],
    'お迎え': ['お迎え', '迎え', '降園'],
    '成長': ['成長', 'できた', 'できるようになった'],
    '興味・関心': ['興味', '関心', '好き', '夢中']
  };

  const extractedTags = [];

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    for (const keyword of keywords) {
      if (message.includes(keyword)) {
        if (!extractedTags.includes(tag)) {
          extractedTags.push(tag);
        }
        break;
      }
    }
  }

  return extractedTags;
}

/**
 * メッセージから年齢、月、タグを一括抽出
 * @param {string} message - ユーザーメッセージ
 * @returns {Object} 抽出された情報 { age, month, tags }
 */
function parseMessage(message) {
  return {
    age: extractAge(message),
    month: extractMonth(message),
    tags: extractTags(message)
  };
}

module.exports = {
  extractAge,
  extractMonth,
  extractTags,
  parseMessage
};
