export const defaultGreeting = "你好，我是你的助手卡卡！作为一名传奇球星，我很高兴能为你解答关于 EA FC 25 Ultimate Team 的任何问题。";

export const responses = [
  "作为一名前职业球员，我建议你可以这样组建阵容...",
  "根据我的经验，这名球员在当前版本确实非常出色...",
  "在我的职业生涯中，这种战术总是非常有效...",
  "让我来分析一下当前的市场行情...",
];

export const getRandomResponse = () => {
  return responses[Math.floor(Math.random() * responses.length)];
};