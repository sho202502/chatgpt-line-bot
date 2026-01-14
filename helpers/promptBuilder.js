// プロンプト構築ヘルパー
const { EXAMPLE_RULES } = require('../config');
const contactExamples = require('../data/contactExamples.json');

/**
 * 全文例をフォーマット
 * @returns {string} フォーマットされた全文例
 */
function formatAllExamples() {
  if (!contactExamples.examples || contactExamples.examples.length === 0) {
    return '';
  }

  let formatted = '\n【参考文例】\n以下は実際の連絡帳文例です。この文体と形式を参考にしてください。\n\n';

  contactExamples.examples.forEach((example, index) => {
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
 * ChatGPT用のプロンプトを構築
 * @param {string} userMessage - ユーザーからのメッセージ
 * @param {Object} options - オプション（後方互換性のため残すが使用しない）
 * @returns {Object} システムプロンプトとユーザープロンプトを含むオブジェクト
 */
function buildPrompt(userMessage, options = {}) {
  // 全文例を取得
  const examples = formatAllExamples();

  const systemPrompt = `あなたは保育園の先生をサポートするアシスタントです。保護者への連絡文例を作成する専門家として振る舞ってください。

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
