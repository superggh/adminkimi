# 供应链平台管理系统 - API文档

## 基础信息

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **认证方式**: Bearer Token

## 认证相关

### 1. 用户登录

**POST** `/auth/login`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

#### 请求示例

```json
{
  "username": "admin",
  "password": "123456"
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员",
      "email": "admin@example.com",
      "phone": null,
      "avatar": null
    }
  }
}
```

### 2. 刷新令牌

**POST** `/auth/refresh`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| refreshToken | string | 是 | 刷新令牌 |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {...}
  }
}
```

### 3. 用户退出

**POST** `/auth/logout`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 用户管理

### 1. 获取用户列表

**GET** `/users`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页数量，默认10 |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "size": 10
  }
}
```

### 2. 获取用户详情

**GET** `/users/{id}`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "email": "admin@example.com",
    "phone": null,
    "status": 1,
    "createdAt": "2026-03-31T23:34:29"
  }
}
```

### 3. 创建用户

**POST** `/users`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |
| nickname | string | 否 | 昵称 |
| email | string | 否 | 邮箱 |
| phone | string | 否 | 电话 |

### 4. 更新用户

**PUT** `/users/{id}`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| nickname | string | 否 | 昵称 |
| email | string | 否 | 邮箱 |
| phone | string | 否 | 电话 |

### 5. 删除用户

**DELETE** `/users/{id}`

### 6. 修改用户状态

**PUT** `/users/{id}/status`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| status | int | 是 | 0-禁用, 1-启用 |

### 7. 重置密码

**PUT** `/users/{id}/password`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| password | string | 是 | 新密码 |

### 8. 分配角色

**PUT** `/users/{id}/roles`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| roleIds | array | 是 | 角色ID列表 |

---

## 品牌管理

### 1. 获取品牌列表

**GET** `/brands`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| brandType | string | 否 | 品牌类型 |
| year | int | 否 | 年份 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取品牌详情

**GET** `/brands/{id}`

### 3. 创建品牌

**POST** `/brands`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 品牌名称 |
| brandType | string | 是 | 品牌类型 |
| category | string | 否 | 类别 |
| region | string | 否 | 地区 |
| year | int | 是 | 年份 |

### 4. 更新品牌

**PUT** `/brands/{id}`

### 5. 删除品牌

**DELETE** `/brands/{id}`

### 6. 获取品牌类型

**GET** `/brands/types`

---

## 新闻管理

### 1. 获取新闻列表

**GET** `/news`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| category | string | 否 | 分类 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取新闻详情

**GET** `/news/{id}`

### 3. 创建新闻

**POST** `/news`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 标题 |
| category | string | 否 | 分类 |
| tag | string | 否 | 标签 |
| summary | string | 否 | 摘要 |
| content | string | 否 | 内容 |

### 4. 更新新闻

**PUT** `/news/{id}`

### 5. 删除新闻

**DELETE** `/news/{id}`

---

## 政策管理

### 1. 获取政策列表

**GET** `/policies`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| category | string | 否 | 分类 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取政策详情

**GET** `/policies/{id}`

### 3. 创建政策

**POST** `/policies`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 标题 |
| policyNumber | string | 否 | 文号 |
| source | string | 否 | 来源 |
| category | string | 是 | 分类 |
| date | string | 否 | 发布日期 |
| summary | string | 否 | 摘要 |
| content | string | 否 | 内容 |

### 4. 更新政策

**PUT** `/policies/{id}`

### 5. 删除政策

**DELETE** `/policies/{id}`

### 6. 上传政策文件

**POST** `/policies/{id}/upload`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| file | file | 是 | 文件 |

---

## 企业入驻管理

### 1. 获取企业入驻列表

**GET** `/enterprises`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| status | int | 否 | 状态 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取企业入驻详情

**GET** `/enterprises/{id}`

### 3. 创建企业入驻申请

**POST** `/enterprises`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| companyName | string | 是 | 企业名称 |
| creditCode | string | 是 | 统一社会信用代码 |
| legalPerson | string | 是 | 法定代表人 |
| phone | string | 是 | 联系电话 |
| email | string | 是 | 电子邮箱 |
| province | string | 是 | 省份 |
| city | string | 是 | 城市 |
| address | string | 是 | 详细地址 |

### 4. 更新企业入驻

**PUT** `/enterprises/{id}`

### 5. 删除企业入驻

**DELETE** `/enterprises/{id}`

### 6. 审核通过

**PUT** `/enterprises/{id}/approve`

### 7. 审核拒绝

**PUT** `/enterprises/{id}/reject`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| reason | string | 否 | 拒绝原因 |

---

## 留言咨询管理

### 1. 获取留言列表

**GET** `/messages`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| status | int | 否 | 状态 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取留言详情

**GET** `/messages/{id}`

### 3. 创建留言

**POST** `/messages`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 姓名 |
| email | string | 是 | 邮箱 |
| phone | string | 是 | 电话 |
| subject | string | 是 | 主题 |
| content | string | 是 | 内容 |

### 4. 更新留言

**PUT** `/messages/{id}`

### 5. 删除留言

**DELETE** `/messages/{id}`

### 6. 回复留言

**POST** `/messages/{id}/reply`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| reply | string | 是 | 回复内容 |

---

## 角色管理

### 1. 获取角色列表

**GET** `/roles`

### 2. 获取角色详情

**GET** `/roles/{id}`

### 3. 创建角色

**POST** `/roles`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| roleName | string | 是 | 角色名称 |
| roleCode | string | 是 | 角色编码 |
| description | string | 否 | 描述 |
| sortOrder | int | 否 | 排序 |

### 4. 更新角色

**PUT** `/roles/{id}`

### 5. 删除角色

**DELETE** `/roles/{id}`

### 6. 获取角色菜单

**GET** `/roles/{id}/menus`

### 7. 分配菜单权限

**PUT** `/roles/{id}/menus`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| menuIds | array | 是 | 菜单ID列表 |

---

## 菜单管理

### 1. 获取菜单列表

**GET** `/menus`

### 2. 获取菜单详情

**GET** `/menus/{id}`

### 3. 创建菜单

**POST** `/menus`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| menuName | string | 是 | 菜单名称 |
| menuCode | string | 是 | 菜单编码 |
| path | string | 否 | 路由路径 |
| component | string | 否 | 组件路径 |
| icon | string | 否 | 图标 |
| parentId | long | 否 | 父菜单ID |
| sortOrder | int | 否 | 排序 |
| type | int | 是 | 类型(1-目录,2-菜单,3-按钮) |

### 4. 更新菜单

**PUT** `/menus/{id}`

### 5. 删除菜单

**DELETE** `/menus/{id}`

### 6. 调整排序

**PUT** `/menus/{id}/sort`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sortOrder | int | 是 | 排序值 |

---

## 合作伙伴管理

### 1. 获取合作伙伴列表

**GET** `/partners`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

### 2. 获取合作伙伴详情

**GET** `/partners/{id}`

### 3. 创建合作伙伴

**POST** `/partners`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 名称 |
| partnerType | string | 是 | 类型 |
| description | string | 否 | 描述 |
| logoUrl | string | 否 | Logo地址 |

### 4. 更新合作伙伴

**PUT** `/partners/{id}`

### 5. 删除合作伙伴

**DELETE** `/partners/{id}`

### 6. 上传Logo

**POST** `/partners/{id}/logo`

---

## 联系信息管理

### 1. 获取联系信息列表

**GET** `/contacts`

### 2. 更新联系信息

**PUT** `/contacts/{id}`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| contactValue | string | 是 | 联系值 |

---

## 通用响应格式

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

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 数据字典

### 品牌类型

| 值 | 说明 |
|------|------|
| historical | 历史经典 |
| modern | 时代优品 |
| regional | 区域品牌 |
| elderly | 适老化产品 |
| maternal | 妇幼产品 |
| disability | 助残产品 |

### 新闻分类

| 值 | 说明 |
|------|------|
| political | 时政要闻 |
| work | 工作动态 |
| notice | 通知公告 |

### 政策分类

| 值 | 说明 |
|------|------|
| national | 国家政策 |
| local | 地方政策 |
| industry | 行业政策 |

### 企业入驻状态

| 值 | 说明 |
|------|------|
| 0 | 待审核 |
| 1 | 已通过 |
| 2 | 已拒绝 |

### 留言状态

| 值 | 说明 |
|------|------|
| 0 | 待回复 |
| 1 | 已回复 |

### 菜单类型

| 值 | 说明 |
|------|------|
| 1 | 目录 |
| 2 | 菜单 |
| 3 | 按钮 |

### 用户状态

| 值 | 说明 |
|------|------|
| 0 | 禁用 |
| 1 | 启用 |
