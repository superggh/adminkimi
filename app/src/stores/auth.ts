import { create } from 'zustand';
import type { User, Menu } from '@/types';

// 从 localStorage 获取初始 token
const getInitialToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

interface AuthState {
  token: string | null;
  user: User | null;
  menus: Menu[];
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  setMenus: (menus: Menu[]) => void;
  logout: () => void;
}

const initialToken = getInitialToken();

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: null,
  menus: [],
  isAuthenticated: !!initialToken,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },
  setUser: (user) => set({ user }),
  setMenus: (menus) => set({ menus }),
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, menus: [], isAuthenticated: false });
  },
}));
