# 东吉智能 · 智能炒菜机 OEM / ODM / JDM 独立站

广东东吉智能设备有限公司 B2B 独立站（静态原型），用于获取客户询盘。

## 目录结构
```
.
├── index.html        # 中文版站点
├── en.html           # 英文版站点
├── css/style.css     # 暗色高端主题样式
├── js/main.js        # 交互（移动菜单 / 表单 / 滚动动画）
└── images/           # 产品图、工厂图、Logo
```

站点包含 `index.html`（中文）与 `en.html`（英文）两个独立页面，可直接访问对应文件切换语言。如只需英文版，可删除 `index.html` 并将 `en.html` 重命名为 `index.html`。

## 本地预览
直接双击 `index.html` 即可在浏览器打开。

## 部署到 GitHub Pages
1. 在 GitHub 新建仓库（如 `dongji-website`）。
2. 将本目录所有文件推送到仓库（放在根目录）。
3. 仓库 Settings → Pages → Source 选择 `main` 分支 `/ (root)`。
4. 稍候片刻即可访问 `https://<用户名>.github.io/<仓库名>/`。

如需绑定自定义域名，可在仓库根目录添加 `CNAME` 文件写入你的域名，并在域名解析处设置。
