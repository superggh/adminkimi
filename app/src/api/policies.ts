import { request } from './index';
import type { Policy, PageResult, PageParams } from '@/types';

export const policyApi = {
  // 分页查询政策列表
  getList: (params?: PageParams) =>
    request.get<PageResult<Policy>>('/policies', { params }),

  // 根据ID查询政策
  getById: (id: number) =>
    request.get<Policy>(`/policies/${id}`),

  // 创建政策
  create: (data: Partial<Policy>) =>
    request.post<Policy>('/policies', data),

  // 更新政策
  update: (id: number, data: Partial<Policy>) =>
    request.put<Policy>(`/policies/${id}`, data),

  // 删除政策
  delete: (id: number) =>
    request.delete(`/policies/${id}`),

  // 上传政策文件
  uploadFile: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post(`/policies/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
