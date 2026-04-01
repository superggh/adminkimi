import { request } from './index';
import type { News, PageResult, PageParams } from '@/types';

export const newsApi = {
  // 分页查询新闻列表
  getList: (params?: PageParams) =>
    request.get<PageResult<News>>('/news', { params }),

  // 根据ID查询新闻
  getById: (id: number) =>
    request.get<News>(`/news/${id}`),

  // 创建新闻
  create: (data: Partial<News>) =>
    request.post<News>('/news', data),

  // 更新新闻
  update: (id: number, data: Partial<News>) =>
    request.put<News>(`/news/${id}`, data),

  // 删除新闻
  delete: (id: number) =>
    request.delete(`/news/${id}`),
};
