// server.js
require('dotenv').config(); // ← これを1行目に追加
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// 環境変数を使ってAPIキーとアクセストークンを参照
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/webhook', async (req, res) => {
  const event = req.body.events[0];
  if (!event || event.type !== 'message') return res.sendStatus(200);

  const userMessage = event.message.text;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: userMessage }]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const replyMessage = response.data.choices[0].message.content;

  await axios.post(
    LINE_REPLY_ENDPOINT,
    {
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyMessage }]
    },
    {
      headers: {
        'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
