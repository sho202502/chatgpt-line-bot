// 例文選択ヘルパー
const contactExamples = require('../data/contactExamples.json');

/**
 * 年齢と月に基づいて適切な例文を取得
 * @param {Object} options - フィルタリングオプション
 * @param {number} options.age - 子どもの年齢（0〜5歳）
 * @param {number} options.month - 月（1〜12）null可
 * @param {Array<string>} options.tags - 検索タグ（例: ["散歩", "遊び"]）
 * @param {number} options.limit - 取得する例文の最大数（デフォルト: 3）
 * @returns {Array} フィルタリングされた例文の配列
 */
function selectExamples(options = {}) {
  const { age, month, tags, limit = 3 } = options;

  let filtered = contactExamples.examples;

  // 年齢でフィルタリング
  if (age !== undefined && age !== null) {
    filtered = filtered.filter(ex => ex.age === age);
  }

  // 月でフィルタリング（nullの場合は全月対象として扱う）
  if (month !== undefined && month !== null) {
    filtered = filtered.filter(ex => ex.month === null || ex.month === month);
  }

  // タグでフィルタリング（いずれかのタグが一致すればOK）
  if (tags && tags.length > 0) {
    filtered = filtered.filter(ex => {
      if (!ex.tags) return false;
      return tags.some(tag => ex.tags.includes(tag));
    });
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
  const { age, month, tags, limit = 3 } = options;

  // 1. 完全一致で検索（年齢 + 月 + タグ）
  let examples = selectExamples(options);
  if (examples.length > 0) {
    console.log('完全一致の例文が見つかりました');
    return examples;
  }

  // 2. 年齢 + タグで検索（月を無視）
  if (age !== null && age !== undefined && tags && tags.length > 0) {
    examples = selectExamples({ age, tags, limit });
    if (examples.length > 0) {
      console.log('年齢とタグが一致する例文が見つかりました（月は異なる）');
      return examples;
    }
  }

  // 3. 年齢 + 月で検索（タグを無視）
  if (age !== null && age !== undefined && month !== null && month !== undefined) {
    examples = selectExamples({ age, month, limit });
    if (examples.length > 0) {
      console.log('年齢と月が一致する例文が見つかりました（タグは異なる）');
      return examples;
    }
  }

  // 4. 年齢のみで検索（月とタグを無視）
  if (age !== null && age !== undefined) {
    examples = selectExamples({ age, limit });
    if (examples.length > 0) {
      console.log('年齢が一致する例文が見つかりました');
      return examples;
    }
  }

  // 5. タグのみで検索（年齢と月を無視）
  if (tags && tags.length > 0) {
    examples = selectExamples({ tags, limit });
    if (examples.length > 0) {
      console.log('タグが一致する例文が見つかりました');
      return examples;
    }
  }

  // 6. 月のみで検索（年齢とタグを無視）
  if (month !== null && month !== undefined) {
    examples = selectExamples({ month, limit });
    if (examples.length > 0) {
      console.log('月が一致する例文が見つかりました');
      return examples;
    }
  }

  // 7. 全ての例文から取得（フォールバック）
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
