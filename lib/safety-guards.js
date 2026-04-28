const CRISIS_PATTERNS = [
  /убить себя/i,
  /самоубийство/i,
  /не хочу жить/i,
  /покончить с собой/i,
  /свести счеты/i,
  /самоповреждение/i,
  /порежусь/i,
  /умру/i,
  /лучше не просыпаться/i,
  /хочу умереть/i,
  /жизнь не имеет смысла/i
];

function detectCrisis(message) {
  for (const pattern of CRISIS_PATTERNS) {
    if (pattern.test(message)) {
      return true;
    }
  }
  return false;
}

function generateCrisisResponse() {
  const helpline = process.env.CRISIS_HELPLINE || '8-800-2000-122';
  return {
    isCrisis: true,
    message: `То, что ты делишься этим, очень важно. Я хочу поддержать тебя, но сейчас я только виртуальный помощник. Твоя ситуация требует внимания реального специалиста. Пожалуйста, обратись в службу психологической помощи: ${helpline} или к психотерапевту. Пока ты не сделал это — ты не один, но твоя безопасность важнее всего. Могу ли я чем-то помочь прямо сейчас, например, остаться с тобой на линии, пока ты не свяжешься с ними?`
  };
}

module.exports = { detectCrisis, generateCrisisResponse };

lib/session-store.js

lib/llm-client.js
