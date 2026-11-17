# LOCAL-NOTES · 本地接管说明

> **这个包是从 npm 下架的 `dsh-tool-stats@0.6.1` 原样接过来的本地 fork。**
> 接管日期 **2026-11-17**，接管原因见下。**逻辑一行没改**，只改了版本声明和依赖范围。

---

## 一、为什么要接管

| 事实 | 说明 |
| --- | --- |
| npm 整包下架 | **2026-10-27**，作者把 **14 个版本全部 unpublish**，registry 里只剩一条 `"unpublished"` 记录 |
| 作者弃坑 | 下架至今（11-17）**21 天无任何动静**，不存在恢复上架的可能 |
| 原本会挡升级 | profile 里写死 `"0.6.1"`，任何 `pnpm install` 都会去 registry 解析 → **404 整次安装失败** |
| 实际功能正常 | 0.6.1 在**新内核下实测完全正常**：后端记录、HTTP 路由、设置页面板三层都通（见 §五） |

**结论：接管不是因为它坏了，是为了保住「坏了能自己改」的能力。**

---

## 二、文件职责

```
_项目\dsh-tool-stats\
├── package.json          本地版清单（version 0.7.0-local.1，cordis peer 改成 ^4.1.0）
├── cordis.patch.yml      装载声明：insert 一条 id=dsh-tool-stats
├── LOCAL-NOTES.md        ← 本文件
├── README.md / LICENSE / CHANGELOG.md    原作者留的
└── lib\
    ├── index.js          【后端入口】provide 服务 + 挂两个事件 + 注册路由
    ├── collect.js        【采集】pre-execute 起表 / result 结算成一条调用记录
    ├── stats.js          【数据层】ToolStats 类：记录/汇总/查询/详情/CSV/清空
    ├── store.js          【落盘】append-only JSONL，写在 process.cwd()\.toolstats\calls.jsonl
    │                     （实测落在 C:\Users\麻鸭\.dsh\profiles\web\.toolstats\ —— 因为 host 进程的 cwd 是 profile 目录）
    ├── analyzer.js       【分析】聚合、死工具、高失败率、建议、告警
    ├── routes.js         【HTTP】4 个接口，见下表
    ├── cli.js / bin.js   【命令行】dsh-tool-stats 子命令
    ├── types.js          【类型】空实现
    ├── stats.web.js      【前端入口】浏览器侧 bundle（编译产物，28 KB）
    ├── client\           前端组件
    │   ├── index.js      注册 slot：settings.section / id=tool-stats / order=42
    │   ├── ui.js         面板 UI 主体（19 KB）
    │   ├── view.js       视图 + 请求那 4 个接口
    │   └── locales.js    中英文字典
    └── *.d.ts            类型声明（编译产物自带）
```

**HTTP 接口**（都要 GUI token 认证）：

| 路径 | 方法 | 用途 |
| --- | --- | --- |
| `/api/stats.panel` | GET | 面板总览（支持 `?from=&to=` 时间范围） |
| `/api/stats.detail` | GET | 单个工具详情（`?tool=`） |
| `/api/stats.export` | GET | 导出 CSV |
| `/api/stats.clear` | POST | 清空数据 |

---

## 三、🔴 依赖的内核 API（内核一升级，先查这张表）

代码用到的宿主接口，**任何一条变化都可能是它坏掉的原因**：

| 位置 | 用的 API | 用途 | 2026-11-17 状态 |
| --- | --- | --- | --- |
| `index.js` | `ctx.provide('toolStats', service)` | 对外提供服务 | ✅ 正常 |
| `index.js` | `ctx.on('tools/pre-execute', (exec, next) => next(), { prepend: true })` | 记起点 | ✅ 事件仍在 |
| `index.js` | `ctx.on('tools/result', (exec, result) => …)` | 记终态 | ✅ 事件仍在 |
| `routes.js` | `ctx.inject(['connection'], ctx => ctx.connection.fetch.register({ path, methods, requestBody, fetch }))` | 注册 HTTP | ✅ 正常（401 而非 404 证明注册成功） |
| `client/index.js` | `ctx.effect()` / `ctx.locale.register()` / `ctx.slots.inject('settings.section')` | 前端注册 | ✅ 面板正常显示 |
| `collect.js` | `exec.name` / `exec.agent?.id` / `result.isError` / `result.error.message` / `result.content[].type` / `attachment.bytes` | 取字段 | ✅ 正常 |

**排查顺序**：插件没加载 → 看 `~\.dsh\logs\desktop-next.log` 里有没有 `skipping profile bundle` / `entry "dsh-tool-stats" not found`；
数据不涨 → 先确认 `tools/result` 事件还在（`ctx.on` 挂了不报错，只是不记）；
面板空白 → 查 `/api/stats.panel` 是 401（正常，要 token）还是 404（路由没注册）。

---

## 四、怎么自己改

- **改采集逻辑**：`lib/collect.js` → `settle()` 里加字段（记得同步 `types.d.ts` 和前端 `view.js`）
- **改面板**：`lib/client/ui.js`（React）+ `view.js`（取数）
- **改接口**：`lib/routes.js`
- **改存储**：`lib/store.js`（JSONL append；当前路径 `<工作区>\.toolstats\calls.jsonl`）
- **改完不用编译** —— 这里放的就是编译产物，直接改 `.js` 即可
- 🔴 **改完必须重装 + 重启，两步都不能省**：
  pnpm 的 `file:` **目录**依赖是**复制**（2026-11-17 实测 `fsutil hardlink list` 只有一条路径 = 独立副本），
  改 `_项目\dsh-tool-stats\` 里的文件**不会自动同步**到 profile 的 `node_modules`。完整流程：

  ```powershell
  # 1. 改文件（就在 D:\RuanJian\Apps\_项目\dsh-tool-stats\ 里改）
  # 2. 重新装（让 pnpm 把新文件复制进 profile）
  & "D:\RuanJian\Apps\01_System\HuanJing\nodejs\dsh.cmd" plugin --profile web add "file:D:/RuanJian/Apps/_项目/dsh-tool-stats"
  # 3. 完全退出 App（托盘退出，不是关窗口）再打开
  ```

- 🔴 **改完必须完全退出 App 再开**（插件在 boot 时装载，`patchReload: live` 对它无效）

---

## 五、改动清单（相对原版 0.6.1）

1. `version` → `0.7.0-local.1`
2. `peerDependencies["@deepseek-ai/cordis"]`：`~4.0.4` → **`^4.1.0`**（新内核 0.2.2-rc.3 里就是 4.1.0）
3. 加 `peerDependenciesMeta` 把 cordis 标成 optional（避免因解析不到而报错）
4. 删掉 `devDependencies` / `scripts`（没有 TS 源码，不需要构建）
5. exports 里去掉不存在的 `./locale/*.json`
6. 新增本文件

**逻辑代码 0 改动**：`lib\**` 全是原作者编译产物，逐字节复制的。

---

## 六、回滚

想退回官方 0.6.1：

```powershell
# 1. profile\package.json 里把这行改回去
#    "dsh-tool-stats": "file:D:/RuanJian/Apps/_项目/dsh-tool-stats"
# 改成原来的本地 tgz（那个 tgz 还在，见下）
#    "dsh-tool-stats": "file:D:/RuanJian/Apps/_upgrade-staging/dsh-tool-stats-0.6.1.tgz"

# 2. 重装依赖
& "D:\RuanJian\Apps\01_System\HuanJing\nodejs\dsh.cmd" plugin --profile web add dsh-tool-stats

# 3. 完全退出 App 再开
```

⚠️ **`D:\RuanJian\Apps\_upgrade-staging\dsh-tool-stats-0.6.1.tgz` 别删** —— 它是最初的官方原件，回滚用。

---

## 七、数据在哪

| 项 | 位置 |
| --- | --- |
| 调用记录 | 🔴 **只有一份**：`C:\Users\麻鸭\.dsh\profiles\web\.toolstats\calls.jsonl` |
| 为什么不在各工作区 | `lib/index.js` 用 `resolve(process.cwd())` 当数据根，而 host 进程的 cwd 是 profile 目录 → **所有工作区、所有助手共用这一份统计**（2026-11-17 实测确认：`D:\RuanJian\Apps\.toolstats` / `D:\RuanJian\.toolstats` / `D:\Game\.toolstats` 都不存在） |
| 格式 | 每行一条 JSON：`tool / timestamp / success / latencyMs / sessionId / errorMessage? / contentBytes? / untimed?` |
| 想清空 | 面板上「清空」按钮，或直接删 `calls.jsonl` |
| 想看总量 | 面板顶部：总调用 / 总失败 / 失败率 / 会话数 / 平均延迟 |

⚠️ **这个设计有个已知弱点**：数据根跟着 `process.cwd()` 走。若哪天 host 进程的工作目录变了（换启动方式、改 profile 结构），
统计会另起一份新文件，看起来像"历史数据丢了"。真要把数据钉死，改 `lib/index.js` 第 7 行：

```js
const root = resolve(process.cwd());   // ← 改成固定路径，如 resolve('C:/Users/麻鸭/.dsh/profiles/web')
```

---

*接管维护：程序助手 · 2026-11-17*
