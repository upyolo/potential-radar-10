# 璞见 Potential Radar

See People, Not Just Keywords.

这是一个用于黑客松展示的前端 Demo。当前版本不连接后端、不调用真实模型，所有岗位、候选人、简历输入和分析结果都来自本地 Mock 数据。

## 当前 Demo 流程

1. 上传/输入简历：在页面左侧载入 Mock 简历批次。
2. 岗位匹配：用传统关键词规则模拟第一轮筛选。
3. 潜力分析：用 Mock 分析结果模拟从 JD 反推能力画像。
4. 推荐理由展示：展示 AI 找回候选人的理由、能力证据、风险和面试追问。

## Mock 数据位置

统一 Mock 数据在：

```txt
src/data/mockData.ts
```

其中包含：

- `demoBrand`：产品名和统一文案
- `demoResumeBatch`：简历输入/上传演示数据
- `defaultJob`：默认岗位 JD
- `defaultCandidates`：候选人池
- `defaultAnalysis`：岗位匹配和潜力分析结果
- `demoFlow`：首页流程说明

## 启动方式

推荐使用 Bun：

```bash
bun install
bun run dev
```

也可以使用 npm：

```bash
npm install
npm run dev
```

## 未来需要接入的 API

- 简历上传 API：接收 PDF、DOCX 或文本简历，返回候选人基础信息和结构化简历。
- JD 解析 API：从岗位描述中抽取核心任务、能力画像、筛选规则和证据关键词。
- 关键词筛选 API：根据当前规则返回通过和被筛掉的候选人列表。
- 潜力分析 API：对被漏筛候选人进行能力证据抽取、推荐等级判断和风险识别。
- 推荐理由 API：生成面试官可读的推荐理由、风险提示和面试追问。
- 审计与反馈 API：记录人工复核结果，用于后续优化筛选规则和模型提示词。

## 说明

本 Demo 只用于展示产品交互和叙事闭环。AI 分析结果不应作为唯一录用依据。
