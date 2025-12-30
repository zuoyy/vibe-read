# 书籍适配标准操作流程 (SOP)

> **目标**: 为经典书籍打造 "Vibe Read" 适配——即沉浸式、交互式且极具美感的 Web 阅读体验。

## 1. 核心理念 (The Vibe Check)
你的适配 **绝不能** 只是一个简单的博客文章。它必须是一种 **体验 (Experience)**。
- **视觉**: 使用 "Optical" 视觉系统。深色模式、霓虹点缀、玻璃拟态、电影级排版。
- **动效**: 万物皆可动。使用 `framer-motion` 制作入场、悬停和转场效果。
- **技术**: 它感觉应该像一个软件，而不是一张纸。

## 2. 标准架构 (The Skeleton)
每本书的适配必须严格遵循以下组件结构：

### A. 数据层 (`messages/*.json`)
- **Metadata**: 
    - `id`: 书籍 ID (kebab-case).
    - `title`: 书籍标题.
    - `author`: 作者名称 (必须国际化).
    - `coverStyle`: 封面颜色与纹理配置.
    - `summary`: 一句话描述.
- **Content**:
    - **Synopsis**: 对作品的诗意概述。
    - **Key Concepts/Characters**: 结构化的列表（如小说中的“关键角色”或非虚构中的“核心概念”）。
    - **Architecture**: 定义清晰的“章节”或“板块”结构。
    - **Conclusion**: 一个有力的结语。

### B. 组件层 (`app/components/[book]/`)
- `index.tsx`: 元数据导出入口。
- `Hero.tsx`: 电影级入口。**必须使用全屏视觉设计。**
    - **Back Button**: 必须使用统一的左上角悬浮返回按钮。
        - 样式: `fixed top-6 left-6`
        - 文案: `← {tBack('library')}` (其中 `tBack` 为 `useTranslations('back')`)
        - 中文显示: "← 返回", 英文显示: "← Back"
- `Content.tsx`: 叙事引擎。
- `TrilogyController.tsx` (系列特有): 用于多部曲的 "Hub" 模式。

### C. 国际化规范 (i18n Standard)
- `common.json` 被合并到根命名空间。
    - 引用通用词条（如返回）: `const tBack = useTranslations('back')` -> `tBack('library')`。
- 书籍内容使用独立命名空间: `useTranslations('three-body')`。

## 3. 内容密度协议 V2 (Content Density Protocol V2)
**"太短" 就是失败。** 所有适配必须提供深度价值。
- **叙事弧线**: 不要只列举事实。要去讲述这本书的故事。
- **字数要求**: 核心章节必须有充实的段落（50字以上），禁止只写一句话。
- **结构要求**:
    1.  **钩子 (The Hook)**: 一个质疑读者现实的引言。
    2.  **干货 (The Meat)**: 至少 3 个独特的“章节”，探索书中最大的思想。
    3.  **玩具 (The Toy)**: (见第 4 节)。
    4.  **回响 (The Echo)**: 一个让人回味无穷的结语。

## 4. 交互玩具协议 (Interactive Toy Protocol)
**强制要求**: 每个适配必须包含至少一个 **"高科技玩具 (High-Tech Toy)"**——一个定制的 React 组件，通过交互可视化核心概念。
- **已实现案例**:
    - *三体*: 
        - `ThreeBodySimulator` (三体运动模拟)
        - `DropletProbe` (水滴攻击可视化)
        - `DimensionalCollapse` (二向箔降维打击着色器)
    - *人类简史*: 
        - `TimeScale` (人类历史时间尺)
        - `GossipGraph` (八卦理论/语言网络)
        - `WheatTrap` (小麦陷阱/博弈模拟)
- **规则**: 如果用户只是滚动和阅读，你就失败了。他们必须 **点击、拖拽或悬停** 才能理解概念。

## 5. 关键检查清单 (Crucial Checklist)
1.  **注册元数据**: 添加到 `app/[locale]/page.tsx` 的 library 数组中。
2.  **添加标签**: 确保 `app/config/tags.ts` 和 `messages/common.json` 中存在对应标签。
3.  **交叉链接**: 确保 "Back to Hub" (返回中心) 链接有效。
4.  **验证构建**: 运行 `npm run dev` 并检查是否有 `Module not found` 错误。

---

**拥抱混乱。代码即诗歌。**
