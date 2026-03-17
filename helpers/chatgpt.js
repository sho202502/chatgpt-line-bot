// ChatGPT API連携ヘルパー
const axios = require('axios');
const { OPENAI_API_KEY, OPENAI_MODEL } = require('../config');
const { buildPrompt } = require('./promptBuilder');

/**
 * ChatGPT APIを使用して文例を生成
 * @param {string} userMessage - ユーザーからのメッセージ
 * @param {Array<{role: string, content: string}>} history - 会話履歴（省略可）
 * @returns {Promise<string>} 生成された文例テキスト
 */
async function generateWithChatGPT(userMessage, history = []) {
  const prompts = buildPrompt(userMessage);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: prompts.system },
          ...history,
          { role: 'user', content: prompts.user }
        ],
        max_completion_tokens: 1000,
        temperature: 0.7 //回答のランダム性 0が最低（毎回同じ回答）～1.0が最高(ほぼ異なる回答が返ってくる)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('ChatGPT API Error:', error.response?.data || error.message);
    throw new Error('ChatGPT APIの呼び出しに失敗しました');
  }
}

module.exports = {
  generateWithChatGPT
};
