import { request } from './index';
import type { Contact } from '@/types';

export const contactApi = {
  // 查询所有联系信息
  getList: () =>
    request.get<Contact[]>('/contacts'),

  // 更新联系信息
  update: (id: number, data: Partial<Contact>) =>
    request.put<Contact>(`/contacts/${id}`, data),
};
