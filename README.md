# 供应链平台管理系统

一个完整的企业级后台管理系统，参考消费品产业供应链平台风格设计，包含前端和后端API。

## 在线演示

**前端地址**: https://si2tyw7stapc2.ok.kimi.link

**默认账号**: admin / 123456

## 项目结构

```
/mnt/okcomputer/output/
├── app/                    # 前端项目 (React + TypeScript + Tailwind CSS)
│   ├── src/
│   │   ├── api/           # API接口
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   ├── stores/        # 状态管理
│   │   └── types/         # TypeScript类型
│   └── dist/              # 构建输出
├── backend/               # 后端项目 (Spring Boot + JDK17)
│   ├── src/main/java/     # Java源码
│   │   └── com/cgiscp/admin/
│   │       ├── config/    # 配置类
│   │       ├── controller/# 控制器
│   │       ├── service/   # 服务层
│   │       ├── repository/# 数据访问层
│   │       ├── entity/    # 实体类
│   │       ├── dto/       # 数据传输对象
│   │       └── security/  # 安全相关
│   └── pom.xml            # Maven配置
├── API文档.md             # 接口文档
├── design.md              # 设计文档
└── tech-spec.md           # 技术规范
```

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS 3.4
- **UI组件**: shadcn/ui
- **状态管理**: Zustand
- **路由**: React Router 6
- **HTTP客户端**: Axios
- **图表**: Recharts
- **图标**: Lucide React

### 后端
- **框架**: Spring Boot 3.2
- **语言**: Java 17
- **数据库**: MySQL 8.0
- **ORM**: Spring Data JPA
- **安全**: Spring Security + JWT
- **API文档**: SpringDoc OpenAPI
- **构建工具**: Maven

## 功能模块

### 1. 仪表盘
- 数据统计卡片
- 交易趋势图表
- 行业分布图表
- 待办事项
- 最新动态

### 2. 品牌管理 (brands)
- 品牌列表查询
- 品牌增删改查
- 品牌类型筛选

### 3. 新闻管理 (news)
- 新闻列表查询
- 新闻增删改查
- 分类筛选

### 4. 政策管理 (policy)
- 政策列表查询
- 政策增删改查
- 文件上传

### 5. 企业入驻管理 (enterprise_settlement)
- 入驻申请列表
- 审核通过/拒绝
- 详情查看

### 6. 留言咨询管理 (message_consultation)
- 留言列表查询
- 回复留言
- 状态管理

### 7. 用户管理 (user)
- 用户列表查询
- 用户增删改查
- 状态管理
- 密码重置
- 角色分配

### 8. 角色管理 (role)
- 角色列表查询
- 角色增删改查
- 权限分配

### 9. 菜单管理 (menu)
- 菜单树形展示
- 菜单增删改查
- 排序调整

### 10. 合作伙伴管理 (partners)
- 合作伙伴列表
- 增删改查
- Logo上传

### 11. 系统设置
- 联系信息设置
- 个人资料
- 修改密码

## 数据库表

根据提供的SQL文件，系统包含以下表：

1. **brands** - 品牌表
2. **contact_info** - 联系信息表
3. **enterprise_settlement** - 企业入驻申请表
4. **live_appointment** - 直播预约表
5. **menu** - 菜单表
6. **message_consultation** - 留言咨询表
7. **news** - 新闻表
8. **partners** - 合作伙伴表
9. **policy** - 政策表
10. **role** - 角色表
11. **role_menu** - 角色菜单关联表
12. **saas_trial** - SaaS试用申请表
13. **stats** - 统计数据表
14. **survey_answers** - 问卷调查答案表
15. **user** - 用户表
16. **user_role** - 用户角色关联表
17. **users** - 用户表(旧)

## 快速开始

### 前端运行

```bash
cd /mnt/okcomputer/output/app
npm install
npm run dev
```

### 后端运行

```bash
cd /mnt/okcomputer/output/backend
# 配置数据库连接 (application.yml)
mvn spring-boot:run
```

### 数据库配置

修改 `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/app_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: your_password
```

## API文档

详细的API文档请查看 [API文档.md](./API文档.md)

启动后端后，也可以通过Swagger UI访问：
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs

## 默认账号

- 用户名: admin
- 密码: 123456

## 特性

- ✅ 完整的RBAC权限管理
- ✅ JWT认证
- ✅ 响应式设计
- ✅ 现代化UI界面
- ✅ 丰富的数据可视化
- ✅ 完整的CRUD操作
- ✅ API文档自动生成

## 许可证

MIT
