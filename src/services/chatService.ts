interface LocalKnowledge {
  [key: string]: string;
}

const LOCAL_KNOWLEDGE: LocalKnowledge = {
  "最值得购买的球员": "目前版本中,最值得购买的球员包括:\n1. Mbappé (ST) - 极致的速度和射门能力\n2. Haaland (ST) - 强壮的身体素质和出色的终结能力\n3. De Bruyne (CAM) - 无与伦比的传球视野\n4. Bellingham (CM) - 全能型中场,适应性强\n5. Van Dijk (CB) - 防守能力出众,身体对抗强",
  "热门SBC任务": "当前最值得完成的SBC包括:\n1. Icon Moments Pick - 可以获得传奇球员\n2. 87+ 球员精选包 - 性价比很高\n3. TOTW升级 - 获得本周最佳球员的机会\n4. 英超POTM - 获得英超月度最佳球员",
  "球员进化建议": "当前版本最值得进化的球员:\n1. Rashford基础卡 - 进化后速度和射门极为出色\n2. Davies基础卡 - 进化后成为顶级边后卫\n3. Valverde基础卡 - 进化后全能值极高\n注意:进化时要考虑性价比,不要投入过多资源在一张卡上。",
  "卡包开启建议": "目前商店中最值得开启的卡包:\n1. 85+稀有球员包 - 出货率较高\n2. 英超精选包 - 含金量高\n3. 周末联赛奖励包 - 性价比最高\n建议:等待活动期间开包,概率会更好。"
};

function findLocalAnswer(message: string): string | null {
  const keywords = Object.keys(LOCAL_KNOWLEDGE);
  const matchedKey = keywords.find(key => message.includes(key));
  return matchedKey ? LOCAL_KNOWLEDGE[matchedKey] : null;
}

export async function sendMessage(message: string): Promise<string> {
  try {
    // 首先尝试从本地知识库匹配
    const localAnswer = findLocalAnswer(message);
    if (localAnswer) {
      return localAnswer;
    }

    // 如果本地没有匹配的答案，调用 API
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return '抱歉，我现在无法回答你的问题。请稍后再试。';
  }
}