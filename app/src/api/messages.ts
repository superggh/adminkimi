import { request } from './index';
import type { Message, PageResult, PageParams } from '@/types';

export const messageApi = {
  // 分页查询留言列表
  getList: (params?: PageParams) =>
    request.get<PageResult<Message>>('/messages', { params }),

  // 根据ID查询留言
  getById: (id: number) =>
    request.get<Message>(`/messages/${id}`),

  // 创建留言
  create: (data: Partial<Message>) =>
    request.post<Message>('/messages', data),

  // 更新留言
  update: (id: number, data: Partial<Message>) =>
    request.put<Message>(`/messages/${id}`, data),

  // 删除留言
  delete: (id: number) =>
    request.delete(`/messages/${id}`),

  // 回复留言
  reply: (id: number, reply: string) =>
    request.post(`/messages/${id}/reply`, { reply }),
};
