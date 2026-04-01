import { request } from './index';
import type { Brand, PageResult, PageParams } from '@/types';

export const brandApi = {
  // 分页查询品牌列表
  getList: (params?: PageParams) =>
    request.get<PageResult<Brand>>('/brands', { params }),

  // 根据ID查询品牌
  getById: (id: number) =>
    request.get<Brand>(`/brands/${id}`),

  // 创建品牌
  create: (data: Partial<Brand>) =>
    request.post<Brand>('/brands', data),

  // 更新品牌
  update: (id: number, data: Partial<Brand>) =>
    request.put<Brand>(`/brands/${id}`, data),

  // 删除品牌
  delete: (id: number) =>
    request.delete(`/brands/${id}`),

  // 获取品牌类型
  getTypes: () =>
    request.get<Record<string, string>>('/brands/types'),
};
