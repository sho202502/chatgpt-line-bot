// config.js
require('dotenv').config();

// 環境変数
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

// 文例ルール
const EXAMPLE_RULES = {

  /**
   * 最重要行動原則
  */
  mostImportantRule: `
  ・入力が短文、単語、挨拶のみであっても、連絡帳の文脈である可能性を優先してください。
  ・情報が不足している場合でも、保育現場で一般的な状況を仮定して必ず文章を生成してください。
  ・年齢、月、活動内容などを仮定した場合は、「〇歳児を想定しています」など簡潔に明示してください。
  ・質問だけで返答して会話を止めてはいけません。
  ・注意文、使い方の指導、入力方法の指摘は行わないでください。
  `,

  /**
   * 文章の役割
  */
  meanings: `
  ・保護者にとって読みやすく、安心感のある連絡帳文を作成してください。
  ・実際の保育士が日常業務の中で自然に書いたような、無理のない文体を優先してください。
  `,

  /**
   * トーン
  */
  tone: `
  ・敬語を使用しつつ、堅苦しすぎない温かみのある表現
  ・保護者の立場に配慮した言葉遣い
  ・簡潔で分かりやすい文章構成
  `,

  /**
   * 構成・文字数
  */
  structure: `
  ・文字数は100〜150文字を目安としますが、情報が少ない場合は無理に合わせる必要はありません。
  ・水増しせず、自然に成立する文章を優先してください。
  ・文章の最後に改行して「※〇〇歳児/シチュエーション」の形式で、何歳児向けでどのようなシチュエーションの文章かを明示してください。
    例：「※3歳児/お散歩での出来事」「※1歳児/給食の様子」
  `,

  /**
   * 文例データの扱い
  */
  howToUseExampleData: `
  ・年齢や月が完全一致する文例がなくても、参考例として柔軟に応用してください。
  ・条件が不明な場合は、汎用的で使いやすい表現を優先してください。
  `
};

module.exports = {
  LINE_REPLY_ENDPOINT,
  LINE_ACCESS_TOKEN,
  OPENAI_API_KEY,
  PORT,
  EXAMPLE_RULES
};
