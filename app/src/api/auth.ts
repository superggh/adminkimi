import { request } from './index';
import type { LoginParams, LoginResult, User, Menu } from '@/types';

export const authApi = {
  // 登录
  login: (params: LoginParams) =>
    request.post<LoginResult>('/auth/login', params),

  // 退出登录
  logout: () =>
    request.post('/auth/logout'),

  // 获取当前用户信息
  getUserInfo: () =>
    request.get<User>('/auth/info'),

  // 获取当前用户菜单
  getUserMenus: () =>
    request.get<Menu[]>('/auth/menus'),

  // 刷新令牌
  refreshToken: (refreshToken: string) =>
    request.post<LoginResult>('/auth/refresh', { refreshToken }),
};
