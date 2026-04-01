import { request } from './index';
import type { User, PageResult, PageParams } from '@/types';

export const userApi = {
  // 分页查询用户列表
  getList: (params?: PageParams) =>
    request.get<PageResult<User>>('/users', { params }),

  // 根据ID查询用户
  getById: (id: number) =>
    request.get<User>(`/users/${id}`),

  // 创建用户
  create: (data: Partial<User>) =>
    request.post<User>('/users', data),

  // 更新用户
  update: (id: number, data: Partial<User>) =>
    request.put<User>(`/users/${id}`, data),

  // 删除用户
  delete: (id: number) =>
    request.delete(`/users/${id}`),

  // 修改用户状态
  updateStatus: (id: number, status: number) =>
    request.put(`/users/${id}/status`, { status }),

  // 重置密码
  resetPassword: (id: number, password: string) =>
    request.put(`/users/${id}/password`, { password }),

  // 分配角色
  assignRoles: (id: number, roleIds: number[]) =>
    request.put(`/users/${id}/roles`, { roleIds }),
};
