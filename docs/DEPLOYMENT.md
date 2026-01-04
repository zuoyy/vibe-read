# 部署指南：Cloudflare Pages (静态)

本项目已成功迁移至 **静态站点生成 (SSG)** 架构，以确保最佳性能并完全绕过 Cloudflare Worker 的体积限制。

## 1. 准备工作

*   一个 [Cloudflare](https://dash.cloudflare.com/) 账户。
*   项目已推送到 GitHub 仓库。

## 2. Cloudflare Pages 配置

在 Cloudflare Pages 创建新应用时，连接你的 GitHub 仓库并使用以下构建设置：

*   **框架预设 (Framework Preset)**: `Next.js (Static Export)`
    *   *注意：如果没有这个预设选项，请选择 "None" 并按照下方手动配置。*
*   **构建命令 (Build Command)**: `npm run build`
*   **构建输出目录 (Build Output Directory)**: `out`
    *   *重要：请务必使用 `out`，不要使用 `.next`。静态导出的文件位于 `out` 目录中。*
*   **根目录 (Root Directory)**: `/` (除非你的应用在子目录中，否则保留默认)

    > **注意**: 根路径 `/` 现已配置为自动重定向到中文版 `/zh`。这是通过客户端重定向实现的。

### 环境变量

建议设置 Node.js 版本以匹配本地环境（例如 v20）。

*   **变量名称**: `NODE_VERSION`
*   **值**: `20`

## 3. 为什么要使用静态导出？

我们在 `next.config.ts` 中配置了 `output: 'export'`。这将生成纯 HTML/CSS/JS 文件。

*   **优势**:
    *   **无体积限制**: 完全绕过了 Cloudflare Worker 的 1MB/3MB 脚本体积限制。
    *   **高性能**: 直接从 Cloudflare 的全球 CDN 边缘节点分发。
    *   **成本**: Cloudflare Pages 的免费套餐对静态站点非常慷慨。
*   **限制**:
    *   不支持动态服务器端逻辑（例如 `headers()`、`cookies()`、`middleware.ts`），这也是我们移除它们的原因。
    *   必须禁用 Next.js图片优化 (`images: { unoptimized: true }`)，或者使用第三方图片加载器（如 Cloudinary, Imgix）。

## 4. 本地验证

在部署前，你可以在本地验证构建结果：

```bash
npm run build
# 'out' 目录应当被创建
npx serve out
```

## 5. 常见问题排查

*   **"Hydration Mismatch" (水合不匹配)**: 如果线上站点看起来不同或控制台有错误，请确保 `<body>` 标签上有 `suppressHydrationWarning` 属性（已在代码中实现）。
*   **"刷新页面 404"**: Cloudflare Pages 通常会自动处理静态站点的路由，但如果你遇到动态路由问题，请确保 `generateStaticParams` 覆盖了所有可能的路径（例如 `/en/three-body/1` 等）。
