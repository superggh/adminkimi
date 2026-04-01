import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export function Header({ collapsed, onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [notifications] = useState(3);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white border-b border-slate-200 transition-all duration-300 z-40',
        collapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-slate-500 hover:text-slate-700"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-sm text-slate-500">
            欢迎回来，{user?.nickname || user?.username || '管理员'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 通知 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-500" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>通知消息</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
                  <span className="text-sm font-medium">新的企业入驻申请</span>
                  <span className="text-xs text-slate-500">某某科技有限公司提交了入驻申请</span>
                  <span className="text-xs text-slate-400">5分钟前</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
                  <span className="text-sm font-medium">新的留言咨询</span>
                  <span className="text-xs text-slate-500">收到一条新的留言咨询待回复</span>
                  <span className="text-xs text-slate-400">30分钟前</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
                  <span className="text-sm font-medium">系统公告</span>
                  <span className="text-xs text-slate-500">系统将于今晚进行维护升级</span>
                  <span className="text-xs text-slate-400">2小时前</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-blue-600">
                查看全部通知
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-700 hidden sm:inline">
                  {user?.nickname || user?.username}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                个人设置
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
