import { request } from './index';
import type { Menu } from '@/types';

export const menuApi = {
  // 查询树形菜单列表
  getList: () =>
    request.get<Menu[]>('/menus'),

  // 根据ID查询菜单
  getById: (id: number) =>
    request.get<Menu>(`/menus/${id}`),

  // 创建菜单
  create: (data: Partial<Menu>) =>
    request.post<Menu>('/menus', data),

  // 更新菜单
  update: (id: number, data: Partial<Menu>) =>
    request.put<Menu>(`/menus/${id}`, data),

  // 删除菜单
  delete: (id: number) =>
    request.delete(`/menus/${id}`),

  // 调整排序
  updateSort: (id: number, sortOrder: number) =>
    request.put(`/menus/${id}/sort`, { sortOrder }),
};
