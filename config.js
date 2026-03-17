// config.js
require('dotenv').config();

// 環境変数
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

// OpenAI モデル設定
const OPENAI_MODEL = 'gpt-4o';

// 会話メモリ設定
const MEMORY_SETTINGS = {
  MAX_TURNS: 15, // 会話履歴の最大ターン数（ユーザー発言＋アシスタント返答で1ターン）
  TTL_MS: 24 * 60 * 60 * 1000,   // 24時間
  GC_INTERVAL_MS: 60 * 60 * 1000  // 1時間
};

// 除外メッセージパターン（このパターンに一致したメッセージは文例生成しない）
const IGNORE_PATTERNS = [
  /^https?:\/\//,  // URL
  /使い方/,
  /ヘルプ/,
  /設定/,
];

module.exports = {
  LINE_REPLY_ENDPOINT,
  LINE_ACCESS_TOKEN,
  OPENAI_API_KEY,
  PORT,
  OPENAI_MODEL,
  MEMORY_SETTINGS,
  IGNORE_PATTERNS
};
