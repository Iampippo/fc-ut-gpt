# FC UT GPT AI Assistant

一个基于GPT4All的FIFA Ultimate Team AI助手，由传奇球星卡卡为您提供专业的游戏建议。

## 功能特点

- 🤖 基于GPT4All的本地AI模型
- 💾 SQLite本地知识库
- 🎮 FIFA Ultimate Team专业建议
- 📊 实时市场数据分析
- 🏆 SBC任务推荐
- ⭐ 球员进化建议

## 技术栈

- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- AI: GPT4All (mistral-7b-openorca)
- Database: SQLite

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/yourusername/fc-ut-gpt.git
cd fc-ut-gpt
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
# 启动前端
npm run dev

# 启动后端（新终端）
npm run server
```

4. 打开浏览器访问 `http://localhost:5173`

## 项目结构

```
fc-ut-gpt/
├── src/                    # 前端源代码
│   ├── components/         # React组件
│   ├── services/          # API服务
│   ├── store/             # 状态管理
│   ├── types/             # TypeScript类型定义
│   └── utils/             # 工具函数
├── server/                # 后端源代码
│   ├── data/             # 知识库数据
│   └── index.js          # 服务器入口
└── public/               # 静态资源
```

## 自定义知识库

你可以通过编辑 `server/data/knowledge.json` 文件来添加或更新知识库内容。格式如下：

```json
{
  "base_knowledge": [
    {
      "question": "问题关键词",
      "answer": "详细答案"
    }
  ]
}
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解更多详情。