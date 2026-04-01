import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { roleApi } from '@/api/roles';
import { menuApi } from '@/api/menus';
import type { Role, Menu } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export function RoleList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [keyword, setKeyword] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const result = await roleApi.getList();
      setRoles(result);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenus = async () => {
    try {
      const result = await menuApi.getList();
      setMenus(result);
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchMenus();
  }, []);

  const handleDelete = async () => {
    if (!selectedRole) return;
    try {
      await roleApi.delete(selectedRole.id);
      setDeleteDialogOpen(false);
      fetchRoles();
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const openPermissionDialog = async (role: Role) => {
    setSelectedRole(role);
    try {
      const menuIds = await roleApi.getRoleMenus(role.id);
      setSelectedMenus(menuIds);
      setPermissionDialogOpen(true);
    } catch (error) {
      console.error('Failed to fetch role menus:', error);
    }
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    try {
      await roleApi.assignMenus(selectedRole.id, selectedMenus);
      setPermissionDialogOpen(false);
    } catch (error) {
      console.error('Failed to save permissions:', error);
    }
  };

  const toggleMenu = (menuId: number) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const toggleExpand = (menuId: number) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const confirmDelete = (role: Role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const renderMenuTree = (menuList: Menu[], level = 0) => {
    return menuList.map((menu) => {
      const hasChildren = menu.children && menu.children.length > 0;
      const isExpanded = expandedMenus.includes(menu.id);
      const isSelected = selectedMenus.includes(menu.id);

      return (
        <div key={menu.id} style={{ marginLeft: level * 24 }}>
          <div className="flex items-center gap-2 py-2">
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(menu.id)}
                className="w-4 h-4 flex items-center justify-center"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <span className="w-4" />
            )}
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleMenu(menu.id)}
            />
            <span className="text-sm">{menu.menuName}</span>
            {menu.type === 1 && (
              <Badge variant="outline" className="text-xs">目录</Badge>
            )}
            {menu.type === 2 && (
              <Badge variant="outline" className="text-xs">菜单</Badge>
            )}
            {menu.type === 3 && (
              <Badge variant="outline" className="text-xs">按钮</Badge>
            )}
          </div>
          {hasChildren && isExpanded && renderMenuTree(menu.children!, level + 1)}
        </div>
      );
    });
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.roleName.toLowerCase().includes(keyword.toLowerCase()) ||
      role.roleCode.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">角色管理</h1>
        <Button onClick={() => navigate('/roles/new')}>
          <Plus className="w-4 h-4 mr-2" />
          新增角色
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索角色名称或编码..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="max-w-sm"
              />
              <Button variant="outline" onClick={() => setKeyword('')}>
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>角色列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>角色名称</TableHead>
                <TableHead>角色编码</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    加载中...
                  </TableCell>
                </TableRow>
              ) : filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.id}</TableCell>
                    <TableCell className="font-medium">{role.roleName}</TableCell>
                    <TableCell>
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm">
                        {role.roleCode}
                      </code>
                    </TableCell>
                    <TableCell>{role.description || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={role.status === 1 ? 'default' : 'secondary'}>
                        {role.status === 1 ? '启用' : '禁用'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(role.createdAt, 'YYYY-MM-DD')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openPermissionDialog(role)}>
                            <Shield className="w-4 h-4 mr-2" />
                            分配权限
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/roles/${role.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(role)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除角色 "{selectedRole?.roleName}" 吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 权限分配对话框 */}
      <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>分配权限</DialogTitle>
            <DialogDescription>
              为角色 "{selectedRole?.roleName}" 分配菜单权限
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {renderMenuTree(menus)}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermissionDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSavePermissions}>
              保存权限
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
