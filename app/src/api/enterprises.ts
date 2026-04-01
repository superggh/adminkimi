import { request } from './index';
import type { Enterprise, PageResult, PageParams } from '@/types';

export const enterpriseApi = {
  // 分页查询企业入驻列表
  getList: (params?: PageParams) =>
    request.get<PageResult<Enterprise>>('/enterprises', { params }),

  // 根据ID查询企业入驻
  getById: (id: number) =>
    request.get<Enterprise>(`/enterprises/${id}`),

  // 创建企业入驻申请
  create: (data: Partial<Enterprise>) =>
    request.post<Enterprise>('/enterprises', data),

  // 更新企业入驻
  update: (id: number, data: Partial<Enterprise>) =>
    request.put<Enterprise>(`/enterprises/${id}`, data),

  // 删除企业入驻
  delete: (id: number) =>
    request.delete(`/enterprises/${id}`),

  // 审核通过
  approve: (id: number) =>
    request.put(`/enterprises/${id}/approve`),

  // 审核拒绝
  reject: (id: number, reason?: string) =>
    request.put(`/enterprises/${id}/reject`, { reason }),
};
