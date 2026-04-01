import { request } from './index';
import type { Role } from '@/types';

export const roleApi = {
  // 查询所有角色
  getList: () =>
    request.get<Role[]>('/roles'),

  // 根据ID查询角色
  getById: (id: number) =>
    request.get<Role>(`/roles/${id}`),

  // 创建角色
  create: (data: Partial<Role>) =>
    request.post<Role>('/roles', data),

  // 更新角色
  update: (id: number, data: Partial<Role>) =>
    request.put<Role>(`/roles/${id}`, data),

  // 删除角色
  delete: (id: number) =>
    request.delete(`/roles/${id}`),

  // 获取角色菜单
  getRoleMenus: (id: number) =>
    request.get<number[]>(`/roles/${id}/menus`),

  // 分配菜单权限
  assignMenus: (id: number, menuIds: number[]) =>
    request.put(`/roles/${id}/menus`, { menuIds }),
};
