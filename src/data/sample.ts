import type { AnalysisResult, Candidate, JobDescription } from "@/components/potential/types";

export const sampleJD: JobDescription = {
  id: "jd-001",
  title: "AI 产品运营实习生",
  team: "璞见 · 智能招聘事业部",
  location: "上海 / 远程",
  type: "实习 · 4 天/周 · 3 个月起",
  summary:
    "我们正在寻找一位对 AI 产品运营充满好奇的实习生，参与从用户洞察到功能落地的完整链路：拆解真实用户反馈、设计 Prompt 流程、协助产品经理推动跨团队迭代。",
  fullJD: `岗位职责：
1. 协助产品经理梳理用户访谈与反馈，输出可执行的产品洞察文档；
2. 设计、测试并迭代 LLM Prompt，参与功能原型的快速验证；
3. 跟进数据看板，定期产出关键指标分析与改进建议；
4. 与设计、研发、市场协作推动新功能落地，撰写运营手册与培训材料；
5. 维护内部知识库，沉淀方法论。

任职要求：
- 本科及以上在读，2025-2026 届优先；
- 对 AI 产品有持续关注，了解至少一款主流 LLM 工具；
- 较强的信息整理与书面表达能力；
- 加分：有公众号、播客、社团运营、用户调研经历。`,
  keywords: [
    "985/211",
    "计算机/产品相关专业",
    "GPA 3.5+",
    "AI 产品实习经历",
    "SQL",
    "Python",
    "数据分析",
    "互联网大厂经历",
  ],
};

export const sampleCandidates: Candidate[] = [
  {
    id: "C001",
    alias: "C001",
    name: "陈同学",
    school: "某双非财经院校",
    major: "社会学",
    grade: "大三",
    target: "AI 产品运营实习生",
    keywordHits: 1,
    keywordTotal: 8,
    resume: `本人为社会学专业大三在读，长期关注 AI 与社会的交叉议题。
- 独立运营公众号「AI 田野笔记」18 个月，累计 1.2 万关注，单篇最高阅读 8 万+；
- 在 ChatGPT 发布后第 2 周组织校内首场跨学科工作坊，吸引 6 个院系学生参与；
- 暑期在某 NGO 用 Excel + ChatGPT 整理 400+ 份农村教师访谈，输出 30 页洞察报告被采纳；
- 自学 SQL 基础，能完成简单的用户行为筛选；
- 担任社团副社长，统筹 12 人团队完成线下大型活动 3 场。`,
  },
  {
    id: "C002",
    alias: "C002",
    name: "李同学",
    school: "Top 5 985",
    major: "计算机科学",
    grade: "研二",
    target: "AI 产品运营实习生",
    keywordHits: 6,
    keywordTotal: 8,
    resume: `计算机科学硕士在读，GPA 3.8/4.0。
- 字节跳动算法实习 6 个月，参与推荐召回模型迭代；
- 熟练掌握 Python / SQL / Pytorch；
- 发表 EMNLP workshop 论文一篇；
- 校内 ACM 校队成员。`,
  },
  {
    id: "C003",
    alias: "C003",
    name: "王同学",
    school: "某地方一本",
    major: "汉语言文学",
    grade: "大四",
    target: "AI 产品运营实习生",
    keywordHits: 0,
    keywordTotal: 8,
    resume: `汉语言文学专业，对 AI 写作工具有强烈兴趣。
- 在小红书运营「写作 × AI」账号 14 个月，2.6 万粉丝，主导 60+ 篇深度评测；
- 自费购买 7 款 AI 写作产品做横向对比，输出可复用的 Prompt 模板库（GitHub 200+ star）；
- 协助 3 位作家用 AI 工具完成长文修改，建立标准工作流；
- 大学期间独立完成 4 万字非虚构写作，发表于《单读》。`,
  },
  {
    id: "C004",
    alias: "C004",
    name: "赵同学",
    school: "某 211",
    major: "市场营销",
    grade: "大三",
    target: "AI 产品运营实习生",
    keywordHits: 2,
    keywordTotal: 8,
    resume: `市场营销专业，对消费者研究有热情。
- 校内创业项目「校园二手书」累计交易 1500+ 单；
- 用 Tableau 做过校园消费调研可视化报告；
- 短期实习于某 4A 广告公司 2 个月。`,
  },
  {
    id: "C005",
    alias: "C005",
    name: "周同学",
    school: "某海外 QS Top 100",
    major: "认知科学",
    grade: "大四",
    target: "AI 产品运营实习生",
    keywordHits: 1,
    keywordTotal: 8,
    resume: `认知科学专业，关注人机交互与对话系统。
- 在 Reddit r/MachineLearning 长期产出科普长帖，单帖最高 3.4k upvote；
- 协助导师完成 35 位用户的对话式 AI 可用性访谈，输出研究简报；
- 用 R 完成 5 项实验数据分析；
- 自学并使用 LangChain 搭建小型问答原型。`,
  },
  {
    id: "C006",
    alias: "C006",
    name: "孙同学",
    school: "Top 10 985",
    major: "金融工程",
    grade: "研一",
    target: "AI 产品运营实习生",
    keywordHits: 4,
    keywordTotal: 8,
    resume: `金融工程硕士在读，GPA 3.7。
- 摩根士丹利量化实习 3 个月；
- 熟练 Python / SQL；
- 关注 AI 在金融领域应用，发表知乎专栏 10 篇。`,
  },
  {
    id: "C007",
    alias: "C007",
    name: "吴同学",
    school: "某艺术院校",
    major: "戏剧影视文学",
    grade: "大四",
    target: "AI 产品运营实习生",
    keywordHits: 0,
    keywordTotal: 8,
    resume: `戏剧影视文学专业，自由撰稿人。
- 独立运营播客「AI 与人的剧本」42 期，单期最高 5 万播放；
- 主导 3 次 AI 工具线下沙龙，分别复盘并输出 1.5 万字工作流文档；
- 用 Notion + ChatGPT 构建个人内容生产线，效率提升 3 倍以上；
- 担任学校戏剧社编剧组组长，协调 8 人完成 2 部原创剧目。`,
  },
  {
    id: "C008",
    alias: "C008",
    name: "郑同学",
    school: "某 985",
    major: "软件工程",
    grade: "大四",
    target: "AI 产品运营实习生",
    keywordHits: 5,
    keywordTotal: 8,
    resume: `软件工程专业，GPA 3.6。
- 腾讯后端开发实习 4 个月；
- 熟练 Java / Python / SQL；
- ACM 区域赛铜牌；
- 个人 GitHub 维护 2 个 AI 小工具。`,
  },
  {
    id: "C009",
    alias: "C009",
    name: "冯同学",
    school: "某二本",
    major: "电子商务",
    grade: "大三",
    target: "AI 产品运营实习生",
    keywordHits: 1,
    keywordTotal: 8,
    resume: `电子商务专业，对内容电商有兴趣。
- 校内电商社负责人，组织 2 次直播带货活动；
- 用 Excel 整理过 500+ 商品 SKU。`,
  },
  {
    id: "C010",
    alias: "C010",
    name: "蒋同学",
    school: "某独立学院",
    major: "工商管理",
    grade: "大四",
    target: "AI 产品运营实习生",
    keywordHits: 0,
    keywordTotal: 8,
    resume: `工商管理专业。
- 校学生会外联部干事；
- 暑期在某连锁餐饮门店实习 1 个月。`,
  },
];

export const cachedAnalysis: AnalysisResult = {
  job_profile: {
    core_tasks: [
      "拆解用户访谈与反馈，输出可执行的产品洞察",
      "设计、测试并持续迭代 LLM Prompt 与功能原型",
      "跟进数据看板，定期输出指标分析与改进建议",
      "跨团队协作推动功能落地与文档沉淀",
      "运营内容与社区，沉淀方法论",
    ],
    required_capabilities: [
      { name: "信息整理", weight: 0.92 },
      { name: "用户理解", weight: 0.88 },
      { name: "数据分析", weight: 0.7 },
      { name: "跨团队沟通", weight: 0.78 },
      { name: "AI 工具使用", weight: 0.95 },
      { name: "任务拆解", weight: 0.8 },
    ],
    evidence_keywords: [
      "用户访谈",
      "内容运营",
      "Prompt 设计",
      "结构化输出",
      "数据看板",
      "跨团队协作",
      "LangChain",
      "复盘文档",
    ],
  },
  baseline_filter: {
    rules: ["985/211", "GPA 3.5+", "技术专业", "SQL/Python", "大厂实习"],
    passed_candidate_ids: ["C002", "C006", "C008"],
    filtered_candidate_ids: ["C001", "C003", "C004", "C005", "C007", "C009", "C010"],
  },
  rediscovered_candidates: [
    {
      candidate_id: "C001",
      recommendation_level: "high",
      why_missed_by_keywords:
        "学校非 985/211，专业为社会学，关键词规则直接拦截；但 18 个月公众号运营 + 跨学科工作坊体现了岗位核心的用户理解与组织能力。",
      recommendation_reason:
        "在「信息整理」「用户理解」「AI 工具使用」三项核心能力上均有连续 12 个月以上的真实证据，与岗位画像匹配度极高。",
      capability_evidence: [
        {
          capability: "信息整理",
          evidence_from_resume: "用 Excel + ChatGPT 整理 400+ 份农村教师访谈，输出 30 页洞察报告被采纳",
          confidence: "high",
        },
        {
          capability: "用户理解",
          evidence_from_resume: "独立运营公众号「AI 田野笔记」18 个月，累计 1.2 万关注",
          confidence: "high",
        },
        {
          capability: "AI 工具使用",
          evidence_from_resume: "ChatGPT 发布第 2 周即组织校内首场跨学科工作坊",
          confidence: "high",
        },
        {
          capability: "跨团队沟通",
          evidence_from_resume: "社团副社长，统筹 12 人团队完成 3 场线下大型活动",
          confidence: "medium",
        },
        {
          capability: "数据分析",
          evidence_from_resume: "自学 SQL 基础，能完成简单的用户行为筛选",
          confidence: "low",
        },
      ],
      risks: [
        "数据分析与 SQL 基础较浅，初期需要导师带教",
        "缺乏互联网公司协作经验，对节奏与文档规范需适应",
      ],
      interview_questions: [
        "请挑选 1 篇你最满意的「AI 田野笔记」推文，复盘选题、用户调研、写作迭代过程。",
        "在整理 400+ 教师访谈时，你的信息分层与编码方案是什么？",
        "如果让你为「璞见」设计一份「校招实习生招聘体验」用户访谈提纲，你会怎么做？",
        "你最近一次使用 ChatGPT 解决工作问题，给我看一段你最满意的 Prompt。",
        "在 12 人团队中担任副社长时，最难的一次冲突是怎么协调的？",
        "如果让你 1 周内拆解出公众号的 3 条关键增长指标，你会选哪些？",
      ],
    },
    {
      candidate_id: "C003",
      recommendation_level: "high",
      why_missed_by_keywords:
        "汉语言文学 + 地方一本，关键词命中为 0；但 GitHub 200+ star 的 Prompt 模板库与 14 个月 AI 工具评测，是岗位最稀缺的 AI 工具实战能力。",
      recommendation_reason:
        "已具备可直接交付的 Prompt 工程产出与持续内容运营经验，「AI 工具使用」与「信息整理」远超岗位基线。",
      capability_evidence: [
        {
          capability: "AI 工具使用",
          evidence_from_resume: "自费购买 7 款 AI 写作产品做横向对比，Prompt 模板库 GitHub 200+ star",
          confidence: "high",
        },
        {
          capability: "用户理解",
          evidence_from_resume: "小红书账号 14 个月、2.6 万粉丝、60+ 篇深度评测",
          confidence: "high",
        },
        {
          capability: "信息整理",
          evidence_from_resume: "为 3 位作家建立可复用的 AI 写作标准工作流",
          confidence: "high",
        },
        {
          capability: "任务拆解",
          evidence_from_resume: "独立完成 4 万字非虚构写作，发表于《单读》",
          confidence: "medium",
        },
        {
          capability: "数据分析",
          evidence_from_resume: "简历中未见明确的定量分析证据",
          confidence: "low",
        },
      ],
      risks: [
        "无任何编程/SQL 背景，看板分析需要工具培训",
        "长期为个人创作者协作，未必适应大团队节奏",
      ],
      interview_questions: [
        "请现场拆解一个你最得意的 Prompt 模板，为什么这样设计？",
        "你横向评测 7 款产品时，评测框架是什么？为什么这样设计维度？",
        "如果让你在 2 周内为「璞见」搭建一个简历分析 Prompt，你的迭代计划是什么？",
        "你最近一次说服一位作家放弃旧工作流是怎么发生的？",
        "你如何衡量 GitHub 模板库的「真正好用」，而不仅是 star 数？",
        "面对一个完全不懂 AI 的同事，你 30 分钟能教会他做什么？",
      ],
    },
    {
      candidate_id: "C005",
      recommendation_level: "medium",
      why_missed_by_keywords:
        "海外院校未命中 985/211 规则，认知科学专业不在「计算机/产品相关」白名单内；但其用户访谈 + LangChain 原型经验高度对口。",
      recommendation_reason:
        "兼具用户研究方法论与轻量技术原型能力，是「研究型产品运营」稀缺画像，但落地经验偏短。",
      capability_evidence: [
        {
          capability: "用户理解",
          evidence_from_resume: "完成 35 位用户的对话式 AI 可用性访谈并输出研究简报",
          confidence: "high",
        },
        {
          capability: "AI 工具使用",
          evidence_from_resume: "自学并使用 LangChain 搭建小型问答原型",
          confidence: "medium",
        },
        {
          capability: "数据分析",
          evidence_from_resume: "用 R 完成 5 项实验数据分析",
          confidence: "medium",
        },
        {
          capability: "信息整理",
          evidence_from_resume: "Reddit 科普长帖单帖最高 3.4k upvote",
          confidence: "medium",
        },
      ],
      risks: [
        "工业界落地经验少，对节奏与商业指标敏感度未知",
        "中文内容产出经验有限，需评估写作能力",
      ],
      interview_questions: [
        "请详细描述你 35 位用户访谈的招募、提纲与编码流程。",
        "你的 LangChain 原型解决了什么真实问题？最终上线了吗？",
        "如果让你为「璞见」做一次 10 人用户访谈，你会如何取样？",
        "你在 Reddit 上的长帖，是如何决定写什么的？",
        "你最近用 R 做的一个分析，如果换成 SQL 你会怎么写？",
      ],
    },
    {
      candidate_id: "C007",
      recommendation_level: "medium",
      why_missed_by_keywords:
        "艺术院校 + 戏剧影视文学专业，关键词命中 0；但播客 42 期 + 多次线下沙龙复盘文档，恰好对应岗位「内容运营 + 方法论沉淀」职责。",
      recommendation_reason:
        "在「AI 工具使用」「信息整理」「跨团队沟通」上有连续输出，适合内容侧运营岗，但定量分析能力弱。",
      capability_evidence: [
        {
          capability: "AI 工具使用",
          evidence_from_resume: "播客「AI 与人的剧本」42 期，深度试用多款 AI 工具",
          confidence: "high",
        },
        {
          capability: "信息整理",
          evidence_from_resume: "3 次线下沙龙每次输出 1.5 万字工作流复盘文档",
          confidence: "high",
        },
        {
          capability: "跨团队沟通",
          evidence_from_resume: "戏剧社编剧组组长，协调 8 人完成 2 部原创剧目",
          confidence: "medium",
        },
        {
          capability: "数据分析",
          evidence_from_resume: "简历中未见明确定量分析经验",
          confidence: "low",
        },
      ],
      risks: [
        "完全无数据/技术背景，看板与 A/B 类工作需重新学习",
        "自由撰稿背景，需评估对企业节奏的适应度",
      ],
      interview_questions: [
        "请挑一期你最满意的播客，复盘选题与嘉宾沟通流程。",
        "你 1.5 万字的沙龙复盘文档，如何让它真的「被使用」而不是被收藏？",
        "如果让你为「璞见」设计一档内部播客，你的前 3 期会是什么主题？",
        "戏剧社协调 8 人时，最大的一次返工是怎么发生的？",
        "你愿意在 1 个月内学会基础数据看板分析吗？你打算怎么学？",
      ],
    },
  ],
};