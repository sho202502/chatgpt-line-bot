// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';
const LINE_ACCESS_TOKEN = '3uZgPb04PtpHkpTB4ZeG5TDFlN7AAS1vFe8jwwSU3oHPw4irSBTe1HCusxyQinA8e2VH2FPYtmJdsz50evHYVRYKDKVnjlCHcD8rbRSy4vDI9GpHrS3TRNOz5rl+kmxdHxZyoEI1vC5Bgo7eOGmBJgdB04t89/1O/w1cDnyilFU=';
const OPENAI_API_KEY = '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';

app.post('/webhook', async (req, res) => {
  const event = req.body.events[0];
  if (!event || event.type !== 'message') return res.sendStatus(200);

  const userMessage = event.message.text;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
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
