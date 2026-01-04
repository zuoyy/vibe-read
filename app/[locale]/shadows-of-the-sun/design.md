# Design Document: Shadows of the Sun (《太阳的阴影》)

## 1. Content Analysis (内容理解)
- **主题**: 非洲的真实面貌、殖民主义的后遗症、权力与贫穷、生存的坚韧。
- **基调**: 炙热 (Scorching)、残酷 (Brutal)、真实 (Raw)、深沉 (Profound)。
- **核心隐喻**: **烈日 (The Sun)**。
    - 这里的太阳不是浪漫的落日，而是暴君。它统治一切，决定作息，蒸发水分，带来干旱和饥荒。
    - **阴影 (The Shadow)** 是避难所，也是真相藏身之处。

## 2. Design Intuition (设计直觉)
- **颜色**:
    - 主色: `Scorched Yellow` (#FDB813) - 令人不适的高饱和度黄色，代表烈日。
    - 辅色: `Burnt Orange` (#C04000) - 像被烧焦的土地。
    - 背景: `Shadow Black` (#0A0A0A) - 深邃的黑，不仅是暗模式，更是“阴影”本身。
- **质感**: 颗粒感 (Grainy)、燥热 (Heat Haze)、粗糙 (Rough)。
- **排版**:
    - 标题: 像是打字机敲出来的，或者报纸印刷体 (Journalistic)。
    - 正文: 干净易读的衬线体，像是在阴影中冷静的记录。

## 3. Component Plan (组件方案)

### 3.1 Hero Component (`Hero.tsx`)
- **视觉**: 一个巨大的、几乎占据整个屏幕的太阳。
- **动效**:
    - 太阳边缘有热浪扭曲效果 (Heat haze shader or CSS filter)。
    - 缓慢移动/律动，给人压迫感。
- **交互**: 鼠标移动会轻微改变太阳的位置，产生视差。

### 3.2 Content Component (`Content.tsx`)
- **布局**: 单栏布局，拥有宽阔的边距（像是被烈日烤干的留白）。
- **文字**: 高对比度，白色文字在黑色背景上。

### 3.3 Interactive Toy (`SunAndShadowSimulator.tsx`)
- **概念**: "Truth in Shadows" (阴影中的真相)。
- **机制**:
    - 屏幕上有一些看不见的文字/图形（或者颜色与背景极度接近）。
    - 用户控制一个光源（太阳）。
    - 场景中有一些障碍物（象征权力的纪念碑、废墟）。
    - 只有当阴影投射到这些区域时，隐藏的信息才会显现（反白显示，或者在阴影中发光）。
- **技术**: Framer Motion (SVG mask / clip-path) 或 Canvas 绘图。

## 4. Response & Immersion (响应与沉浸)
- **移动端**: 太阳在背景中固定，内容流过。
- **声音**: (可选) 极其轻微的风沙声，或者热浪的低频嗡嗡声。

## 5. Metadata
- **URL**: `shadows-of-the-sun`
- **Tags**: `history`, `africa`, `journalism`, `philosophy`
