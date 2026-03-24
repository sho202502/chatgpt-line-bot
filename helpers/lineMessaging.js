// LINE Messaging API連携ヘルパー
const axios = require('axios');
const { LINE_REPLY_ENDPOINT, LINE_ACCESS_TOKEN } = require('../config');
const CRmessage = '\n\n※子どもの性格や場面、長さや言い方も自由に変えられます♪';　// ◀クイックリプライの文末に付与

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
    text: message,
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: 'おとなしい子',
            text: 'おとなしい子' + CRmessage
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '友だちとの関わり',
            text: '友だちとの関わりを入れて' + CRmessage
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: 'やわらかい文章',
            text: 'やわらかい文章にして' + CRmessage
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '短くする',
            text: '短くして' + CRmessage
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '具体的にする',
            text: '具体的にして' + CRmessage
          }
        }
      ]
    }
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
