import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

import {
  LayoutDashboard,
  Award,
  Newspaper,
  FileText,
  Building2,
  MessageSquare,
  Users,
  Shield,
  Menu,
  Handshake,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/',
  },
  {
    key: 'brands',
    label: '品牌管理',
    icon: <Award className="w-5 h-5" />,
    path: '/brands',
  },
  {
    key: 'news',
    label: '新闻管理',
    icon: <Newspaper className="w-5 h-5" />,
    path: '/news',
  },
  {
    key: 'policies',
    label: '政策管理',
    icon: <FileText className="w-5 h-5" />,
    path: '/policies',
  },
  {
    key: 'enterprises',
    label: '企业入驻',
    icon: <Building2 className="w-5 h-5" />,
    path: '/enterprises',
  },
  {
    key: 'messages',
    label: '留言咨询',
    icon: <MessageSquare className="w-5 h-5" />,
    path: '/messages',
  },
  {
    key: 'users',
    label: '用户管理',
    icon: <Users className="w-5 h-5" />,
    children: [
      { key: 'users-list', label: '用户列表', icon: <Users className="w-4 h-4" />, path: '/users' },
      { key: 'roles', label: '角色管理', icon: <Shield className="w-4 h-4" />, path: '/roles' },
      { key: 'menus', label: '菜单管理', icon: <Menu className="w-4 h-4" />, path: '/menus' },
    ],
  },
  {
    key: 'partners',
    label: '合作伙伴',
    icon: <Handshake className="w-5 h-5" />,
    path: '/partners',
  },
  {
    key: 'stats',
    label: '数据统计',
    icon: <BarChart3 className="w-5 h-5" />,
    path: '/stats',
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings',
  },
];

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['users']);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedKeys.includes(item.key);
    const active = isActive(item.path);

    if (hasChildren) {
      return (
        <div key={item.key}>
          <button
            onClick={() => toggleExpand(item.key)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors',
              'text-slate-400 hover:text-white hover:bg-slate-800',
              (isExpanded || item.children?.some((c) => isActive(c.path))) && 'bg-slate-800 text-white'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && (
              <span className="transition-transform">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </span>
            )}
          </button>
          {!collapsed && isExpanded && (
            <div className="bg-slate-900/50">
              {item.children?.map((child) => (
                <Link
                  key={child.key}
                  to={child.path || '#'}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 pl-12 text-sm transition-colors',
                    isActive(child.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  {child.icon}
                  <span>{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.key}
        to={item.path || '#'}
        className={cn(
          'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
          active
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        )}
      >
        {item.icon}
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-slate-900 transition-all duration-300 z-50',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        {collapsed ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">供</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">供</span>
            </div>
            <span className="text-white font-semibold">供应链平台</span>
          </div>
        )}
      </div>
      <nav className="py-4 overflow-y-auto h-[calc(100%-4rem)]">
        {menuItems.map(renderMenuItem)}
      </nav>
    </aside>
  );
}
