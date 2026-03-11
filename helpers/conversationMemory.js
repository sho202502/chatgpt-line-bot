// 会話メモリヘルパー（プロセス内 Map による会話履歴管理）
const MAX_TURNS = 30;
const TTL_MS = 24 * 60 * 60 * 1000; // 24時間
const GC_INTERVAL_MS = 60 * 60 * 1000; // 1時間

/** @type {Map<string, { turns: Array<{role: string, content: string}>, lastActiveAt: Date }>} */
const conversations = new Map();

/**
 * @param {string} userId
 */
function assertUserId(userId) {
  if (!userId) throw new Error('userId は必須です');
}

/**
 * 会話履歴を取得する。TTL 切れまたは未存在の場合は空配列を返す。
 * @param {string} userId
 * @returns {Array<{role: string, content: string}>}
 */
function getHistory(userId) {
  assertUserId(userId);
  const entry = conversations.get(userId);
  if (!entry) return [];
  if (Date.now() - entry.lastActiveAt.getTime() > TTL_MS) {
    conversations.delete(userId);
    return [];
  }
  return entry.turns;
}

/**
 * ユーザー発言とアシスタント返答を履歴に追加する。
 * MAX_TURNS を超えた場合は先頭の古いターンから削除する。
 * @param {string} userId
 * @param {string} userMessage
 * @param {string} assistantReply
 */
function addTurn(userId, userMessage, assistantReply) {
  assertUserId(userId);
  const entry = conversations.get(userId) || { turns: [], lastActiveAt: new Date() };
  entry.turns.push({ role: 'user', content: userMessage });
  entry.turns.push({ role: 'assistant', content: assistantReply });
  while (entry.turns.length > MAX_TURNS) {
    entry.turns.shift();
  }
  entry.lastActiveAt = new Date();
  conversations.set(userId, entry);
}

/**
 * 指定ユーザーの会話履歴を削除する。
 * @param {string} userId
 */
function clearHistory(userId) {
  assertUserId(userId);
  conversations.delete(userId);
}

// TTL 超過エントリの GC（1時間ごと）
setInterval(() => {
  const now = Date.now();
  for (const [userId, entry] of conversations.entries()) {
    if (now - entry.lastActiveAt.getTime() > TTL_MS) {
      conversations.delete(userId);
    }
  }
}, GC_INTERVAL_MS).unref();

module.exports = {
  getHistory,
  addTurn,
  clearHistory
};
