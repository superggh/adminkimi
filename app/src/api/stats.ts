import { request } from './index';
import type { Stat } from '@/types';

export const statsApi = {
  // 查询所有统计数据
  getList: () =>
    request.get<Stat[]>('/stats'),

  // 更新统计数据
  update: (id: number, data: Partial<Stat>) =>
    request.put<Stat>(`/stats/${id}`, data),
};
