// プロンプト構築ヘルパー
const { EXAMPLE_RULES } = require('../config');

/**
 * ChatGPT用のプロンプトを構築
 * @param {string} userMessage - ユーザーからのメッセージ
 * @returns {Object} システムプロンプトとユーザープロンプトを含むオブジェクト
 */
function buildPrompt(userMessage) {
  const systemPrompt = `あなたは保育園の先生をサポートするアシスタントです。
保護者への連絡文例を作成する専門家として振る舞ってください。

${EXAMPLE_RULES.format}

【文体のルール】
${EXAMPLE_RULES.tone}

【構成のルール】
${EXAMPLE_RULES.structure}

これらのルールに必ず従って、文例を生成してください。`;

  return {
    system: systemPrompt,
    user: userMessage
  };
}

module.exports = {
  buildPrompt
};
