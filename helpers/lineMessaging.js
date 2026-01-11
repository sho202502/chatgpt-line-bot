// LINE Messaging API連携ヘルパー
const axios = require('axios');
const { LINE_REPLY_ENDPOINT, LINE_ACCESS_TOKEN } = require('../config');

/**
 * LINEメッセージを返信
 * @param {string} replyToken - LINE返信トークン
 * @param {string} message - 返信するメッセージ内容
 * @returns {Promise<void>}
 */
async function replyToLine(replyToken, message) {
  try {
    await axios.post(
      LINE_REPLY_ENDPOINT,
      {
        replyToken: replyToken,
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
        }
      }
    );
    console.log('LINE返信成功');
  } catch (error) {
    console.error('LINE Reply Error:', error.response?.data || error.message);
    throw new Error('LINE返信に失敗しました');
  }
}

module.exports = {
  replyToLine
};
