# dsh-tool-stats (local fork)

> 工具调用统计插件 · **DeepSeek Harness** 的第三个本地接管版本
>
> 每次工具调用都被计数，从不触发的工具会被点名，方便你删掉它们。

---

## 来源与作者（务必阅读）

本仓库是 **`dsh-tool-stats@0.6.1` 的本地接管 fork**，**代码版权属于原作者**。

| 项 | 内容 |
| --- | --- |
| **原作者** | **hj01857655** |
| **上游仓库** | https://github.com/hj01857655/dsh-plugins （目录 `packages/dsh-tool-stats`） |
| **原包名 / 版本** | `dsh-tool-stats@0.6.1`（发布于 npm，2026-10-16） |
| **上游许可证** | MIT（见 `LICENSE`） |
| **fork 日期** | 2026-11-17 |
| **fork 维护者** | **YunFei（DeepSeek）** |

### 为什么会有这个 fork

原包在 **2026-10-27 被作者从 npm 整包下架**（registry 记录显示 14 个版本全部 `unpublished`），
此后 21 天没有任何恢复迹象。而本机 DSH profile 里依赖它，导致：

- 任何 `pnpm install` 都会去 registry 解析 `dsh-tool-stats@0.6.1` → **404，整次安装中断**
- 作者已弃坑，将来内核升级把它弄坏就**无处可修**

所以把源码原样接下，做成本地包自行维护。**这不是重写，也不是原作者的新版本。**

---

## 本版改动（相对 0.6.1）

**业务逻辑一行未改**，`lib/**` 是原作者编译产物逐字节复制。改的只有清单文件：

| # | 改动 | 原因 |
| --- | --- | --- |
| 1 | `version` → `0.7.0-local.1` | 标明这是 fork，避免和上游版本混淆 |
| 2 | `peerDependencies["@deepseek-ai/cordis"]`：`~4.0.4` → `^4.1.0` | 目标内核 DeepSeek Harness `0.2.2-rc.3` 用的 Cordis 就是 `4.1.0` |
| 3 | 新增 `peerDependenciesMeta`，cordis 标 optional | 避免解析不到时硬报错 |
| 4 | 删除 `devDependencies` / `scripts` | 无 TS 源码，编译产物直接使用 |
| 5 | exports 去掉不存在的 `./locale/*.json` | 该目录实际不存在 |
| 6 | 新增 `LOCAL-NOTES.md` | 记录依赖的内核 API、改法、回滚步骤 |

### 兼容性实测

| 项 | 结果 |
| --- | --- |
| DSH NEXT | `2.0.23-next` |
| 内核 | `0.2.2-rc.3` |
| 后端采集 | ✅ 正常（`calls.jsonl` 持续写入） |
| HTTP 路由 | ✅ 正常（4 个接口均注册） |
| 设置页面板 | ✅ 正常显示 |

> 也就是说：**原版 0.6.1 在新内核下本来就是好的**，这个 fork 的意义不在于"修适配"，
> 而在于**保住将来能改的能力**。

---

## 它做什么

统计每一次工具调用，并在 Web GUI 的「设置 → 工具统计」里给出：

- **总览**：总调用数 / 总失败数 / 失败率 / 会话数 / 平均延迟
- **工具排行**：每个工具的调用次数、失败率、p50 / p95 延迟
- **高失败率工具**：失败率超阈值的工具 + 具体错误信息
- **死工具**：配置了但一次都没触发过的工具（帮你删掉它们）
- **建议与告警**
- **导出 CSV** / **清空数据**

数据是 **append-only JSONL**，落在 **`process.cwd()\.toolstats\calls.jsonl`**
（在 DSH Desktop 下即 `~/.dsh/profiles/web/.toolstats/calls.jsonl`）。

---

## 目录结构

```
.
├── package.json          本地版清单
├── cordis.patch.yml      装载声明（insert 一条 id=dsh-tool-stats）
├── LOCAL-NOTES.md        🔴 依赖的内核 API / 改法 / 回滚 —— 想改代码先看这个
├── README.md             本文件
├── LICENSE               MIT（原作者）
└── lib/
    ├── index.js          后端入口：provide 服务 + 挂事件 + 注册路由
    ├── collect.js        采集：pre-execute 记起点 / result 结算成一条记录
    ├── stats.js          数据层：ToolStats（记录/汇总/查询/详情/CSV/清空）
    ├── store.js          落盘：append-only JSONL
    ├── analyzer.js       分析：聚合、死工具、高失败率、建议、告警
    ├── routes.js         HTTP：/api/stats.panel | detail | export | clear
    ├── cli.js / bin.js   命令行
    ├── types.js          类型占位
    ├── stats.web.js      前端入口（浏览器侧 bundle）
    └── client/
        ├── index.js      注册 slot：settings.section
        ├── ui.js         面板 UI 主体
        ├── view.js       视图 + 接口请求
        └── locales.js    中英文字典
```

---

## 安装

```bash
# 指到本地目录（或把本仓库克隆后指过去）
dsh plugin --profile <profile名> add "file:/path/to/this/folder"
```

装完**必须完全退出 App 再打开**（插件在 boot 时装载）。

### 改代码后

本插件是 **pnpm 的 `file:` 目录依赖**，pnpm 会**复制**而不是软链，所以改完：

```bash
# 1. 重新装
dsh plugin --profile <profile名> add "file:/path/to/this/folder"
# 2. 完全退出 App，再打开
```

---

## 它依赖哪些内核 API

内核升级后如果它坏了，先按这张表查（详细排查见 `LOCAL-NOTES.md`）：

| 位置 | API |
| --- | --- |
| `index.js` | `ctx.provide('toolStats', service)` |
| `index.js` | `ctx.on('tools/pre-execute', (exec, next) => next(), { prepend: true })` |
| `index.js` | `ctx.on('tools/result', (exec, result) => …)` |
| `routes.js` | `ctx.inject(['connection'], … ctx.connection.fetch.register({ path, methods, requestBody, fetch }))` |
| `client/index.js` | `ctx.effect()` / `ctx.locale.register()` / `ctx.slots.inject('settings.section')` |

---

## License

MIT — 见 [LICENSE](./LICENSE)。**版权归原作者 hj01857655 所有。**
本 fork 仅做清单层适配与文档补全，不主张任何新的著作权。
