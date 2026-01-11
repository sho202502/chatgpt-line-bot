// プロンプト構築ヘルパー
const { EXAMPLE_RULES } = require('../config');
const { getExamplesForPrompt } = require('./exampleSelector');

/**
 * ChatGPT用のプロンプトを構築
 * @param {string} userMessage - ユーザーからのメッセージ
 * @param {Object} options - オプション
 * @param {number} options.age - 子どもの年齢（0〜5歳）
 * @param {number} options.month - 月（1〜12）
 * @param {Array<string>} options.tags - タグの配列
 * @returns {Object} システムプロンプトとユーザープロンプトを含むオブジェクト
 */
function buildPrompt(userMessage, options = {}) {
  const { age, month, tags } = options;

  // 条件に合った例文を取得
  const examples = getExamplesForPrompt({
    age,
    month,
    tags,
    limit: 3
  });

  const systemPrompt = `あなたは保育園の先生をサポートするアシスタントです。
保護者への連絡文例を作成する専門家として振る舞ってください。

${EXAMPLE_RULES.format}

【文体のルール】
${EXAMPLE_RULES.tone}

【構成のルール】
${EXAMPLE_RULES.structure}
${examples}
これらのルールと参考文例に必ず従って、文例を生成してください。`;

  return {
    system: systemPrompt,
    user: userMessage
  };
}

module.exports = {
  buildPrompt
};
