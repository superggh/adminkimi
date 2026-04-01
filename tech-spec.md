# 消费品产业供应链平台 - 技术规范文档

---

## 1. 技术栈

### 前端
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型系统 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.4.x | 样式框架 |
| shadcn/ui | latest | UI组件库 |
| React Router | 6.x | 路由管理 |
| Axios | 1.x | HTTP客户端 |
| React Query | 5.x | 数据获取与缓存 |
| Zustand | 4.x | 状态管理 |
| Recharts | 2.x | 图表库 |
| Lucide React | latest | 图标库 |

### 后端
| 技术 | 版本 | 用途 |
|------|------|------|
| Java | 17 | 编程语言 |
| Spring Boot | 3.2.x | 应用框架 |
| Spring Security | 6.x | 安全认证 |
| Spring Data JPA | 3.x | 数据访问 |
| MySQL | 8.0 | 数据库 |
| JWT | 0.12.x | 令牌认证 |
| Lombok | 1.18.x | 代码简化 |
| MapStruct | 1.5.x | 对象映射 |
| SpringDoc OpenAPI | 2.x | API文档 |
| Maven | 3.x | 构建工具 |

---

## 2. 项目结构

### 前端项目结构
```
app/
├── src/
│   ├── api/              # API接口
│   │   ├── auth.ts
│   │   ├── brands.ts
│   │   ├── news.ts
│   │   ├── policies.ts
│   │   ├── enterprises.ts
│   │   ├── messages.ts
│   │   ├── users.ts
│   │   ├── roles.ts
│   │   ├── menus.ts
│   │   ├── partners.ts
│   │   ├── stats.ts
│   │   └── index.ts
│   ├── components/       # 公共组件
│   │   ├── ui/           # shadcn/ui组件
│   │   ├── layout/       # 布局组件
│   │   ├── forms/        # 表单组件
│   │   └── charts/       # 图表组件
│   ├── hooks/            # 自定义Hooks
│   ├── lib/              # 工具函数
│   ├── pages/            # 页面组件
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── brands/
│   │   ├── news/
│   │   ├── policies/
│   │   ├── enterprises/
│   │   ├── messages/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── menus/
│   │   ├── partners/
│   │   └── settings/
│   ├── stores/           # 状态管理
│   ├── types/            # TypeScript类型
│   └── App.tsx
├── public/
└── package.json
```

### 后端项目结构
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/cgiscp/
│   │   │       └── admin/
│   │   │           ├── AdminApplication.java
│   │   │           ├── config/           # 配置类
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── JwtConfig.java
│   │   │           │   └── WebConfig.java
│   │   │           ├── controller/       # 控制器
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── BrandController.java
│   │   │           │   ├── NewsController.java
│   │   │           │   ├── PolicyController.java
│   │   │           │   ├── EnterpriseController.java
│   │   │           │   ├── MessageController.java
│   │   │           │   ├── UserController.java
│   │   │           │   ├── RoleController.java
│   │   │           │   ├── MenuController.java
│   │   │           │   ├── PartnerController.java
│   │   │           │   ├── StatsController.java
│   │   │           │   └── FileController.java
│   │   │           ├── service/          # 服务层
│   │   │           │   ├── impl/
│   │   │           │   └── interfaces/
│   │   │           ├── repository/       # 数据访问层
│   │   │           ├── entity/           # 实体类
│   │   │           ├── dto/              # 数据传输对象
│   │   │           │   ├── request/
│   │   │           │   └── response/
│   │   │           ├── mapper/           # 对象映射
│   │   │           ├── security/         # 安全相关
│   │   │           ├── exception/        # 异常处理
│   │   │           └── utils/            # 工具类
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-dev.yml
│   └── test/
└── pom.xml
```

---

## 3. 数据库表与API设计

### 3.1 品牌管理 (brands)

**实体字段:**
```java
- id: Long (PK)
- name: String (品牌名称)
- brandType: String (品牌类型)
- category: String (类别)
- region: String (地区)
- industry: String (行业)
- feature: String (特色)
- year: Integer (年份)
- sortOrder: Integer (排序)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/brands | 分页查询 |
| GET | /api/brands/{id} | 根据ID查询 |
| POST | /api/brands | 创建 |
| PUT | /api/brands/{id} | 更新 |
| DELETE | /api/brands/{id} | 删除 |
| GET | /api/brands/types | 获取品牌类型 |

### 3.2 新闻管理 (news)

**实体字段:**
```java
- id: Long (PK)
- title: String (标题)
- category: String (分类)
- tag: String (标签)
- summary: String (摘要)
- content: String (内容)
- views: Integer (浏览量)
- sortOrder: Integer (排序)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/news | 分页查询 |
| GET | /api/news/{id} | 根据ID查询 |
| POST | /api/news | 创建 |
| PUT | /api/news/{id} | 更新 |
| DELETE | /api/news/{id} | 删除 |

### 3.3 政策管理 (policy)

**实体字段:**
```java
- id: Long (PK)
- title: String (标题)
- policyNumber: String (文号)
- source: String (来源)
- category: String (分类)
- date: String (发布日期)
- summary: String (摘要)
- content: String (内容)
- views: Integer (浏览量)
- downloads: Integer (下载量)
- isFeatured: Boolean (是否推荐)
- fileName: String (文件名)
- fileUrl: String (文件URL)
- sortOrder: Integer (排序)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/policies | 分页查询 |
| GET | /api/policies/{id} | 根据ID查询 |
| POST | /api/policies | 创建 |
| PUT | /api/policies/{id} | 更新 |
| DELETE | /api/policies/{id} | 删除 |
| POST | /api/policies/{id}/upload | 上传文件 |

### 3.4 企业入驻 (enterprise_settlement)

**实体字段:**
```java
- id: Long (PK)
- applicationNo: String (申请编号)
- companyName: String (企业名称)
- creditCode: String (统一社会信用代码)
- legalPerson: String (法定代表人)
- phone: String (联系电话)
- email: String (邮箱)
- province: String (省份)
- city: String (城市)
- address: String (详细地址)
- industry: String (行业)
- businessScope: String (经营范围)
- registeredCapital: String (注册资本)
- establishDate: Date (成立时间)
- employeeCount: String (员工人数)
- website: String (官网)
- introduction: String (简介)
- status: Integer (状态: 0待审核, 1已通过, 2已拒绝)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/enterprises | 分页查询 |
| GET | /api/enterprises/{id} | 根据ID查询 |
| POST | /api/enterprises | 创建 |
| PUT | /api/enterprises/{id} | 更新 |
| DELETE | /api/enterprises/{id} | 删除 |
| PUT | /api/enterprises/{id}/approve | 审核通过 |
| PUT | /api/enterprises/{id}/reject | 审核拒绝 |

### 3.5 留言咨询 (message_consultation)

**实体字段:**
```java
- id: Long (PK)
- messageNo: String (留言编号)
- name: String (姓名)
- email: String (邮箱)
- phone: String (电话)
- company: String (单位)
- subject: String (主题)
- content: String (内容)
- reply: String (回复内容)
- status: Integer (状态: 0待回复, 1已回复)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/messages | 分页查询 |
| GET | /api/messages/{id} | 根据ID查询 |
| POST | /api/messages | 创建 |
| PUT | /api/messages/{id} | 更新 |
| DELETE | /api/messages/{id} | 删除 |
| POST | /api/messages/{id}/reply | 回复留言 |

### 3.6 用户管理 (user)

**实体字段:**
```java
- id: Long (PK)
- username: String (用户名)
- password: String (密码)
- email: String (邮箱)
- phone: String (电话)
- nickname: String (昵称)
- avatar: String (头像)
- status: Integer (状态: 0禁用, 1启用)
- lastLoginTime: Timestamp (最后登录时间)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/users | 分页查询 |
| GET | /api/users/{id} | 根据ID查询 |
| POST | /api/users | 创建 |
| PUT | /api/users/{id} | 更新 |
| DELETE | /api/users/{id} | 删除 |
| PUT | /api/users/{id}/status | 修改状态 |
| PUT | /api/users/{id}/password | 重置密码 |
| PUT | /api/users/{id}/roles | 分配角色 |

### 3.7 角色管理 (role)

**实体字段:**
```java
- id: Long (PK)
- roleName: String (角色名称)
- roleCode: String (角色编码)
- description: String (描述)
- sortOrder: Integer (排序)
- status: Integer (状态)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/roles | 查询所有 |
| GET | /api/roles/{id} | 根据ID查询 |
| POST | /api/roles | 创建 |
| PUT | /api/roles/{id} | 更新 |
| DELETE | /api/roles/{id} | 删除 |
| GET | /api/roles/{id}/menus | 获取角色菜单 |
| PUT | /api/roles/{id}/menus | 分配菜单权限 |

### 3.8 菜单管理 (menu)

**实体字段:**
```java
- id: Long (PK)
- menuName: String (菜单名称)
- menuCode: String (菜单编码)
- path: String (路由路径)
- component: String (组件路径)
- icon: String (图标)
- parentId: Long (父菜单ID)
- sortOrder: Integer (排序)
- type: Integer (类型: 1目录, 2菜单, 3按钮)
- externalLink: String (外部链接)
- hidden: Integer (是否隐藏)
- status: Integer (状态)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/menus | 查询树形菜单 |
| GET | /api/menus/{id} | 根据ID查询 |
| POST | /api/menus | 创建 |
| PUT | /api/menus/{id} | 更新 |
| DELETE | /api/menus/{id} | 删除 |
| PUT | /api/menus/{id}/sort | 调整排序 |

### 3.9 合作伙伴 (partners)

**实体字段:**
```java
- id: Long (PK)
- name: String (名称)
- partnerType: String (类型)
- description: String (描述)
- logoUrl: String (Logo)
- rankNum: String (排名)
- rankLabel: String (排名标签)
- mission: String (使命)
- features: String (特色JSON)
- sortOrder: Integer (排序)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/partners | 分页查询 |
| GET | /api/partners/{id} | 根据ID查询 |
| POST | /api/partners | 创建 |
| PUT | /api/partners/{id} | 更新 |
| DELETE | /api/partners/{id} | 删除 |
| POST | /api/partners/{id}/logo | 上传Logo |

### 3.10 统计数据 (stats)

**实体字段:**
```java
- id: Long (PK)
- statKey: String (统计项key)
- label: String (标签)
- value: Double (数值)
- suffix: String (后缀)
- changeRate: String (变化率)
- positive: Boolean (是否正向)
- icon: String (图标)
- sortOrder: Integer (排序)
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/stats | 查询所有 |
| PUT | /api/stats/{id} | 更新 |

### 3.11 联系信息 (contact_info)

**实体字段:**
```java
- id: Long (PK)
- contactType: String (类型)
- contactValue: String (值)
- sortOrder: Integer (排序)
- createdAt: Timestamp
- updatedAt: Timestamp
```

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/contacts | 查询所有 |
| PUT | /api/contacts/{id} | 更新 |

### 3.12 认证相关

**API端点:**
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/login | 登录 |
| POST | /api/auth/logout | 退出 |
| GET | /api/auth/info | 获取当前用户信息 |
| GET | /api/auth/menus | 获取当前用户菜单 |
| POST | /api/auth/refresh | 刷新令牌 |

---

## 4. 通用响应格式

### 成功响应
```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

### 分页响应
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [ ... ],
    "total": 100,
    "page": 1,
    "size": 10
  }
}
```

### 错误响应
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

---

## 5. 安全设计

### JWT认证
- 访问令牌有效期: 2小时
- 刷新令牌有效期: 7天
- 令牌格式: Bearer Token

### 权限控制
- 基于角色的访问控制 (RBAC)
- 菜单级别权限
- 按钮级别权限

### 密码安全
- 使用 BCrypt 加密
- 默认密码: 123456

---

## 6. 前端路由设计

| 路径 | 组件 | 描述 |
|------|------|------|
| /login | Login | 登录页 |
| / | Dashboard | 仪表盘 |
| /brands | BrandList | 品牌管理 |
| /brands/:id | BrandEdit | 品牌编辑 |
| /news | NewsList | 新闻管理 |
| /news/:id | NewsEdit | 新闻编辑 |
| /policies | PolicyList | 政策管理 |
| /policies/:id | PolicyEdit | 政策编辑 |
| /enterprises | EnterpriseList | 企业入驻 |
| /messages | MessageList | 留言咨询 |
| /users | UserList | 用户管理 |
| /roles | RoleList | 角色管理 |
| /menus | MenuList | 菜单管理 |
| /partners | PartnerList | 合作伙伴 |
| /stats | Stats | 数据统计 |
| /settings | Settings | 系统设置 |

---

## 7. 开发环境配置

### 前端环境变量
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=供应链平台管理系统
```

### 后端环境配置
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/app_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect

jwt:
  secret: your-secret-key-here
  expiration: 7200000  # 2 hours
  refresh-expiration: 604800000  # 7 days
```
