# ほいくのおまもり LINE BOT

保育園の先生向けの連絡帳文例生成LINEボットです。ChatGPT APIを使用して、保護者への連絡文例を自動生成します。

## 概要

このアプリケーションは、LINE Messaging APIとOpenAI ChatGPT APIを組み合わせて、保育士の方々が保護者への連絡文を簡単に作成できるよう支援します。

### 主な機能

- LINEでのメッセージ受信・返信
- ChatGPT APIを使った文例の自動生成
- 実際の文例データベースを参考にした自然な文章生成
- 年齢・月・タグ情報を含む柔軟な文例管理

## ディレクトリ構成

```
chatgpt-line-bot/
├── server.js                 # メインサーバー（Express）
├── config.js                 # 環境変数・設定ファイル
├── package.json              # 依存関係
├── .env                      # 環境変数（要作成）
├── helpers/
│   ├── chatgpt.js           # ChatGPT API連携
│   ├── promptBuilder.js     # プロンプト構築
│   ├── messageValidator.js  # メッセージ検証
│   ├── messageParser.js     # メッセージパース
│   └── lineMessaging.js     # LINE Messaging API連携
└── data/
    ├── contactExamples.json # 文例データベース
    └── README.md            # 文例管理ドキュメント
```

## 使い方

### LINEでの使用方法

1. LINE公式アカウントを友だち追加
2. メッセージを送信
3. AIが自動生成した文例が返信されます

### 文例の追加方法

`data/contactExamples.json`に新しい文例を追加することで、AIの学習データを増やせます。

詳細は `data/README.md` を参照してください。

## 技術スタック

- **Node.js** - サーバーサイドランタイム
- **OpenAI API** - 文例生成AI
- **LINE Messaging API** - LINEボット機能
- **Axios** - HTTP通信

## 処理フロー

1. **メッセージ受信**: LINE Messaging APIからWebhookでメッセージを受信
2. **検証**: 文例生成リクエストかどうかを判定
3. **パース**: メッセージから年齢・月・タグ情報を抽出
4. **プロンプト構築**: 全文例とルールを含むプロンプトを生成
5. **AI生成**: ChatGPT APIで文例を生成
6. **返信**: LINE Messaging APIで生成された文例を返信