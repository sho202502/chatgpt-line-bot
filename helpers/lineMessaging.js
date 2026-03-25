// LINE Messaging API連携ヘルパー
const axios = require('axios');
const { LINE_REPLY_ENDPOINT, LINE_ACCESS_TOKEN } = require('../config');

/**
 * LINEメッセージを返信
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
                    label: '別の文',
                    text: '別の文にして'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: '例①',
                    text: 'おとなしい子、短くして\n\n※子どもの性格や場面、文章の長さや雰囲気も『内容や様子を入力』から自由に変えられます♪'
                  }
                },
                {
                  type: 'action',
                  action: {
                    type: 'message',
                    label: '例②',
                    text: 'リレーで悔しがっていた。あと、友だちとの関わりを入れたい。\n\n※単語でも文章でも入力OKです。『内容や様子を入力』から自由に書いてね♪'
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

