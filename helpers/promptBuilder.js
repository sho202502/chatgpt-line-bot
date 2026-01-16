// プロンプト構築ヘルパー
const { EXAMPLE_RULES } = require('../config');
const contactExamples = require('../data/contactExamples.json');

/**
 * 全文例をフォーマット
 * @returns {string} フォーマットされた全文例
 */
function formatAllExamples() {
  if (!contactExamples.examples || contactExamples.examples.length === 0) {
    return '';
  }

  let formatted = '\n【参考文例】\n以下は実際の連絡帳文例です。この文体と形式を参考にしてください。\n\n';

  contactExamples.examples.forEach((example, index) => {
    formatted += `例${index + 1}:\n`;
    formatted += `${example.text}\n\n`;
  });

  return formatted;
}

/**
 * ChatGPT用のプロンプトを構築
 * @param {string} userMessage - ユーザーからのメッセージ
 * @returns {Object} システムプロンプトとユーザープロンプトを含むオブジェクト
 */
function buildPrompt(userMessage) {
  // 全文例を取得
  const examples = formatAllExamples();

  const systemPrompt = `
  
  あなたは保育園向けの「連絡帳AI」です。
  目的は、正しい指示を求めることではなく、雑で断片的な入力でも保育士の仕事を肩代わりすることです。

  【最重要行動原則】
  ${EXAMPLE_RULES.mostImportantRule}

  【文章の役割】
  ${EXAMPLE_RULES.meanings}

  【トーン】
  ${EXAMPLE_RULES.tone}

  【構成・文字数】
  ${EXAMPLE_RULES.structure}

  【文例データの扱い】
  ${EXAMPLE_RULES.howToUseExampleData}

  【文例】
  ${examples}
  これらのルールと参考文例に必ず従って、必ず連絡帳の文章を出力してください。`;

  return {
    system: systemPrompt,
    user: userMessage
  };
}

module.exports = {
  buildPrompt
};
