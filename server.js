// server.js - メインアプリケーションファイル
const express = require('express');
const { PORT } = require('./config');
const { isExampleRequest } = require('./helpers/messageValidator');
const { generateWithChatGPT } = require('./helpers/chatgpt');
const { replyToLine } = require('./helpers/lineMessaging');

const app = express();
app.use(express.json());

// ============================
// 1) トリガー & 2) 中継：Webhookエンドポイント
// ============================
app.post('/webhook', async (req, res) => {
  try {
    const events = req.body.events;

    // Webhookの検証リクエストに対応
    if (!events || events.length === 0) {
      return res.status(200).send('OK');
    }

    // 各イベントを処理
    for (const event of events) {
      // メッセージイベント以外は無視
      if (event.type !== 'message') {
        continue;
      }

      const replyToken = event.replyToken;

      // テキストメッセージでない場合（スタンプ、画像など）
      if (event.message.type !== 'text') {
        await replyToLine(
          replyToken,
          '画像やスタンプには対応していないんです...文例作成をご希望の場合は、「〇〇の文例」や「〇〇を書いて」のようにお伝えください。'
        );
        continue;
      }

      // テキストメッセージの場合
      const userMessage = event.message.text;
      console.log('受信メッセージ:', userMessage);

      // 3) 判定：文例生成依頼かどうか
      if (isExampleRequest(userMessage)) {
        // 4〜6) 文例ルール取得 → プロンプト構築 → 生成
        const generatedText = await generateWithChatGPT(userMessage);

        // 7) 出力：LINE返信
        await replyToLine(replyToken, generatedText);
      } else {
        // 文例生成依頼ではない場合
        await replyToLine(
          replyToken,
          '文例作成をご希望の場合は、「〇〇の文例」や「〇〇を書いて」のようにお伝えください。'
        );
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook処理エラー:', error);
    res.status(500).send('Internal Server Error');
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});