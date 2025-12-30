// 标签配置管理
// 这里定义标签的显示顺序和规范
// 导航栏会优先显示这里定义的标签，其他未定义的标签会排在后面

export const TAG_ORDER = [
    'AI',           // 优先显示
    'GUIDE',        // 指南类
    'GAMEPLAY',     // 玩法类
    'DESIGN',       // 设计类
    'CODE',         // 技术类
    'SCI-FI',       // 科幻类
    'HISTORY',      // 历史类
    'PHILOSOPHY',   // 哲学类
    'FUTURE',       // 未来类
    'LIFE'          // 生活类
]

// 如果需要标签映射（例如显示中文），可以在这里定义
// 目前使用英文大写，所以暂时不需要映射
export const TAG_DISPLAY: Record<string, string> = {
    // 'AI': '人工智能',
}
