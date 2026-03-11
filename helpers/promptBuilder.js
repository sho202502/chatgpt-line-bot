// プロンプト構築ヘルパー
const systemPrompt = require('../systemPrompt');

/**
 * ChatGPT用のプロンプトを構築
 * @param {string} userMessage - ユーザーからのメッセージ
 * @param {Array} history - 会話履歴（受け取るが未使用。展開は chatgpt.js で行う）
 * @returns {Object} システムプロンプトとユーザープロンプトを含むオブジェクト
 */
function buildPrompt(userMessage, history = []) {
  return {
    system: systemPrompt,
    user: userMessage
  };
}

module.exports = {
  buildPrompt
};
