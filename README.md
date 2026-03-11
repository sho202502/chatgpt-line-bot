# ほいくのおまもり LINE BOT

保育士向けの連絡帳文例生成 LINE ボットです。

## 概要

LINE Messaging API と OpenAI ChatGPT API を組み合わせて、保育士の方々が保護者への連絡文を簡単に作成できるよう支援します。

### 主な機能

- LINE でのメッセージ受信・返信
- ChatGPT API を使った文例の自動生成
- ユーザーごとの会話履歴の保持（プロセス内メモリ）

## ディレクトリ構成

```
chatgpt-line-bot/
├── server.js                    # メインサーバー（Express）
├── config.js                    # 設定ファイル（モデル・メモリ設定など）
├── systemPrompt.js              # AI の動作・文例を定義するプロンプト
├── package.json                 # 依存関係
├── .env                         # 環境変数（要作成）
└── helpers/
    ├── chatgpt.js               # ChatGPT API 連携
    ├── promptBuilder.js         # プロンプト構築
    ├── messageValidator.js      # 除外メッセージ判定
    ├── lineMessaging.js         # LINE Messaging API 連携
    └── conversationMemory.js    # 会話履歴管理（プロセス内 Map）
```

## ★設定のカスタマイズ★

### AI の動作・文例を変更したい場合

**`systemPrompt.js`** を編集してください。このファイル1つで以下をすべて管理するようにしました：
システム的には構造化されていないという部分もありますが、プロンプトを1つのファイルで完結させる方が分かりやすいかと思い、このような構成にあえてしました。

- AIの口調・ルール
- 出力フォーマット
- 参考文例（末尾の【文例】セクションに追記するだけ）

### モデル・メモリ設定を変更したい場合

**`config.js`** を編集してください。

```js
// 使用する OpenAI モデル
const OPENAI_MODEL = 'gpt-4o';

// 会話メモリ設定
const MEMORY_SETTINGS = {
  MAX_TURNS: 15,                    // 会話履歴の最大ターン数
  TTL_MS: 24 * 60 * 60 * 1000,     // 履歴の有効期限（24時間）
  GC_INTERVAL_MS: 60 * 60 * 1000   // GC の実行間隔（1時間）
};
```

### 環境変数

`.env.example` をコピーして `.env` を作成し、以下を設定してください：

```
LINE_ACCESS_TOKEN=   # LINE Channel Access Token
OPENAI_API_KEY=      # OpenAI API Key
PORT=3000            # デプロイ環境（Render など）では自動設定
```

## 使い方

1. LINE 公式アカウントを友だち追加
2. メッセージを送信（例：「散歩の文例」「給食のことを書いて」）
3. AI が自動生成した文例が返信されます

## 技術スタック

- **Node.js** - サーバーサイドランタイム
- **Express** - Web フレームワーク
- **OpenAI API** - 文例生成 AI
- **LINE Messaging API** - LINE ボット機能
- **Render** - ホスティング

## 処理フロー

```
LINE Webhook POST /webhook
  → messageValidator.isIgnoreMessage()   # 除外メッセージ判定（URL・ヘルプ等）
  → conversationMemory.getHistory()      # 会話履歴の取得
  → promptBuilder.buildPrompt()          # systemPrompt.js をベースにプロンプト構築
  → chatgpt.generateWithChatGPT()        # OpenAI API 呼び出し
  → conversationMemory.addTurn()         # 会話履歴の保存
  → lineMessaging.replyToLine()          # LINE Reply API で返信
```

## 会話履歴について

会話履歴はサーバーのメモリ上に保持されます。**サーバー再起動・再デプロイ時にリセットされます。**
Render の無料プランでは 15 分間リクエストがないとスリープするため、その際も履歴が消えます。連絡帳AIのサーバーは有料プランなので大丈夫です。
