// config.js
require('dotenv').config();

// 環境変数
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

// 文例ルール
const EXAMPLE_RULES = {
  format: `
    保育園向けの連絡文例として、以下の形式で作成してください：
    【本文】
    
    
    文体は丁寧で親しみやすく、保護者が読みやすい表現を心がけてください。
  `,

  tone: `
    ・敬語を使用しつつも堅苦しくない、温かみのある表現
    ・保護者の立場に配慮した言葉遣い
    ・簡潔で分かりやすい文章構成
  `,

  structure: `
  1. まず用件を明確に伝える
  2. 必要な詳細情報を箇条書きなどで整理
  3. お願い事項がある場合は丁寧に依頼
  4. 必要に応じて感謝の言葉で締めくくる
  `
};

module.exports = {
  LINE_REPLY_ENDPOINT,
  LINE_ACCESS_TOKEN,
  OPENAI_API_KEY,
  PORT,
  EXAMPLE_RULES
};
