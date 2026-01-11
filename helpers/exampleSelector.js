// 例文選択ヘルパー
const contactExamples = require('../data/contactExamples.json');

/**
 * 年齢と月に基づいて適切な例文を取得
 * @param {Object} options - フィルタリングオプション
 * @param {number} options.age - 子どもの年齢（0〜5歳）
 * @param {number} options.month - 月（1〜12）null可
 * @param {string} options.category - カテゴリ（daily_report, event_noticeなど）null可
 * @param {number} options.limit - 取得する例文の最大数（デフォルト: 3）
 * @returns {Array} フィルタリングされた例文の配列
 */
function selectExamples(options = {}) {
  const { age, month, category, limit = 3 } = options;

  let filtered = contactExamples.examples;

  // 年齢でフィルタリング
  if (age !== undefined && age !== null) {
    filtered = filtered.filter(ex => ex.age === age);
  }

  // 月でフィルタリング（nullの場合は全月対象として扱う）
  if (month !== undefined && month !== null) {
    filtered = filtered.filter(ex => ex.month === null || ex.month === month);
  }

  // カテゴリでフィルタリング
  if (category) {
    filtered = filtered.filter(ex => ex.category === category);
  }

  // 制限数を適用
  return filtered.slice(0, limit);
}

/**
 * 例文を読みやすい形式にフォーマット
 * @param {Array} examples - 例文の配列
 * @returns {string} フォーマットされた例文文字列
 */
function formatExamples(examples) {
  if (!examples || examples.length === 0) {
    return '';
  }

  let formatted = '\n【参考文例】\n以下は実際の連絡帳文例です。この文体と形式を参考にしてください。\n\n';

  examples.forEach((example, index) => {
    formatted += `例${index + 1}（${example.age}歳児`;
    if (example.month) {
      formatted += `・${example.month}月`;
    }
    formatted += `）:\n`;
    formatted += `${example.text}\n\n`;
  });

  return formatted;
}

/**
 * フォールバック機能付きで例文を取得
 * 条件を段階的に緩めて、可能な限り近い例文を見つける
 * @param {Object} options - selectExamplesと同じオプション
 * @returns {Array} 例文の配列
 */
function selectExamplesWithFallback(options = {}) {
  const { age, month, category, limit = 3 } = options;

  // 1. 完全一致で検索
  let examples = selectExamples(options);
  if (examples.length > 0) {
    console.log('完全一致の例文が見つかりました');
    return examples;
  }

  // 2. 年齢 + カテゴリで検索（月を無視）
  if (age !== null && category) {
    examples = selectExamples({ age, category, limit });
    if (examples.length > 0) {
      console.log('年齢とカテゴリが一致する例文が見つかりました（月は異なる）');
      return examples;
    }
  }

  // 3. 年齢のみで検索（月とカテゴリを無視）
  if (age !== null) {
    examples = selectExamples({ age, limit });
    if (examples.length > 0) {
      console.log('年齢が一致する例文が見つかりました');
      return examples;
    }
  }

  // 4. カテゴリのみで検索（年齢と月を無視）
  if (category) {
    examples = selectExamples({ category, limit });
    if (examples.length > 0) {
      console.log('カテゴリが一致する例文が見つかりました');
      return examples;
    }
  }

  // 5. 全ての例文から取得（フォールバック）
  console.log('該当する例文がないため、全例文から参考として取得します');
  return selectExamples({ limit });
}

/**
 * promptBuilderで使用するための例文を取得してフォーマット
 * @param {Object} options - selectExamplesと同じオプション
 * @returns {string} プロンプトに含める形式の文字列
 */
function getExamplesForPrompt(options = {}) {
  const examples = selectExamplesWithFallback(options);
  return formatExamples(examples);
}

module.exports = {
  selectExamples,
  selectExamplesWithFallback,
  formatExamples,
  getExamplesForPrompt
};
