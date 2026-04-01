// 通用类型定义

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

export interface PageParams {
  page?: number;
  size?: number;
  keyword?: string;
  [key: string]: any;
}

// 用户类型
export interface User {
  id: number;
  username: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status: number;
  lastLoginTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  refreshToken: string;
  user: User;
}

// 角色类型
export interface Role {
  id: number;
  roleName: string;
  roleCode: string;
  description?: string;
  sortOrder: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

// 菜单类型
export interface Menu {
  id: number;
  menuName: string;
  menuCode: string;
  path?: string;
  component?: string;
  icon?: string;
  parentId: number;
  sortOrder: number;
  type: number; // 1-目录, 2-菜单, 3-按钮
  externalLink?: string;
  hidden: number;
  status: number;
  children?: Menu[];
  createdAt: string;
  updatedAt: string;
}

// 品牌类型
export interface Brand {
  id: number;
  name: string;
  brandType: string;
  category?: string;
  region?: string;
  industry?: string;
  feature?: string;
  year: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const BrandTypeMap: Record<string, string> = {
  historical: '历史经典',
  modern: '时代优品',
  regional: '区域品牌',
  elderly: '适老化产品',
  maternal: '妇幼产品',
  disability: '助残产品',
};

// 新闻类型
export interface News {
  id: number;
  title: string;
  category?: string;
  tag?: string;
  summary?: string;
  content?: string;
  views: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const NewsCategoryMap: Record<string, string> = {
  political: '时政要闻',
  work: '工作动态',
  notice: '通知公告',
};

// 政策类型
export interface Policy {
  id: number;
  title: string;
  policyNumber?: string;
  source?: string;
  category: string;
  date?: string;
  summary?: string;
  content?: string;
  views: number;
  downloads: number;
  isFeatured: boolean;
  fileName?: string;
  fileUrl?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const PolicyCategoryMap: Record<string, string> = {
  national: '国家政策',
  local: '地方政策',
  industry: '行业政策',
};

// 企业入驻类型
export interface Enterprise {
  id: number;
  applicationNo: string;
  companyName: string;
  creditCode: string;
  legalPerson: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  address: string;
  industry?: string;
  businessScope?: string;
  registeredCapital?: string;
  establishDate?: string;
  employeeCount?: string;
  website?: string;
  introduction?: string;
  status: number; // 0-待审核, 1-已通过, 2-已拒绝
  createdAt: string;
  updatedAt: string;
}

export const EnterpriseStatusMap: Record<number, { label: string; color: string }> = {
  0: { label: '待审核', color: 'warning' },
  1: { label: '已通过', color: 'success' },
  2: { label: '已拒绝', color: 'danger' },
};

// 留言咨询类型
export interface Message {
  id: number;
  messageNo: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  content: string;
  reply?: string;
  status: number; // 0-待回复, 1-已回复
  createdAt: string;
  updatedAt: string;
}

export const MessageStatusMap: Record<number, { label: string; color: string }> = {
  0: { label: '待回复', color: 'warning' },
  1: { label: '已回复', color: 'success' },
};

// 合作伙伴类型
export interface Partner {
  id: number;
  name: string;
  partnerType: string;
  description?: string;
  logoUrl?: string;
  rankNum?: string;
  rankLabel?: string;
  mission?: string;
  features?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 统计数据类型
export interface Stat {
  id: number;
  statKey: string;
  label: string;
  value: number;
  suffix?: string;
  changeRate?: string;
  positive?: boolean;
  icon?: string;
  sortOrder: number;
}

// 联系信息类型
export interface Contact {
  id: number;
  contactType: string;
  contactValue: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 直播预约类型
export interface LiveAppointment {
  id: number;
  name: string;
  phone: string;
  company?: string;
  serviceType?: string;
  message?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

// SaaS试用类型
export interface SaasTrial {
  id: number;
  name: string;
  phone: string;
  company?: string;
  needs?: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
