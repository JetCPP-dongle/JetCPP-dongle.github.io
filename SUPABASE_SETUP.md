# Supabase Auth 使用说明

## 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 注册账号并登录
3. 点击 "New Project" 创建新项目
4. 选择组织，输入项目名称
5. 设置数据库密码
6. 选择地区（建议选择 East Asia 或 Southeast Asia）
7. 点击 "Create new project"

## 2. 获取项目配置

项目创建完成后：

1. 进入项目 Dashboard
2. 点击左侧菜单的 "Settings" → "API"
3. 复制以下信息：
   - Project URL（类似：https://xxxxxxxx.supabase.co）
   - anon public（匿名密钥）

## 3. 配置环境变量

1. 复制 `.env.example` 文件为 `.env`
2. 编辑 `.env` 文件，填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 配置 Supabase Auth

1. 在 Supabase Dashboard 中，点击 "Authentication" → "Settings"
2. 在 "Site URL" 中填入：`http://localhost:5173`
3. 在 "Redirect URLs" 中填入：`http://localhost:5173/**`
4. 启用 "Email auth"（默认已启用）
5. 可以根据需要启用其他登录方式（如 GitHub、Google 等）

## 5. 运行项目

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 访问：`http://localhost:5173`

## 6. 功能说明

### 登录功能
- 使用邮箱和密码登录
- 支持记住登录状态
- 登录失败时显示错误信息

### 注册功能
- 使用邮箱、用户名和密码注册
- 密码最少6个字符
- 注册成功后需要邮箱验证

### 密码重置
- 通过邮箱重置密码
- 发送重置链接到用户邮箱

### 登出功能
- 清除用户会话
- 重定向到登录页

## 7. 常见问题

### Q: 注册后无法登录？
A: 检查邮箱是否收到验证邮件，需要先验证邮箱才能登录。

### Q: 如何添加第三方登录？
A: 在 Supabase Dashboard 的 Authentication → Providers 中启用需要的第三方登录方式。

### Q: 如何自定义邮件模板？
A: 在 Authentication → Email Templates 中可以自定义验证邮件、重置密码邮件等模板。

### Q: 生产环境配置
A: 部署到生产环境时，需要：
1. 更新环境变量中的 URL
2. 在 Supabase 中添加生产环境的域名
3. 确保使用 HTTPS

## 8. 安全注意事项

1. 永远不要在前端暴露 service_role 密钥
2. 使用 Row Level Security (RLS) 保护数据
3. 定期更新密码
4. 监控异常登录活动

## 9. 扩展功能

可以添加的功能：
- 手机号登录
- 多因素认证 (MFA)
- 社交登录（微信、QQ等）
- 用户资料管理
- 权限管理