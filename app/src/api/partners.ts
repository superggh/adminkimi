import { request } from './index';
import type { Partner, PageResult, PageParams } from '@/types';

export const partnerApi = {
  // 分页查询合作伙伴列表
  getList: (params?: PageParams) =>
    request.get<PageResult<Partner>>('/partners', { params }),

  // 根据ID查询合作伙伴
  getById: (id: number) =>
    request.get<Partner>(`/partners/${id}`),

  // 创建合作伙伴
  create: (data: Partial<Partner>) =>
    request.post<Partner>('/partners', data),

  // 更新合作伙伴
  update: (id: number, data: Partial<Partner>) =>
    request.put<Partner>(`/partners/${id}`, data),

  // 删除合作伙伴
  delete: (id: number) =>
    request.delete(`/partners/${id}`),

  // 上传Logo
  uploadLogo: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post(`/partners/${id}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
