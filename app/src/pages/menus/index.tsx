import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { menuApi } from '@/api/menus';
import type { Menu } from '@/types';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  MousePointer,
} from 'lucide-react';

export function MenuList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [keyword, setKeyword] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const result = await menuApi.getList();
      setMenus(result);
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async () => {
    if (!selectedMenu) return;
    try {
      await menuApi.delete(selectedMenu.id);
      setDeleteDialogOpen(false);
      fetchMenus();
    } catch (error) {
      console.error('Failed to delete menu:', error);
    }
  };

  const toggleExpand = (menuId: number) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const confirmDelete = (menu: Menu) => {
    setSelectedMenu(menu);
    setDeleteDialogOpen(true);
  };

  const getMenuIcon = (type: number) => {
    switch (type) {
      case 1:
        return <Folder className="w-4 h-4 text-blue-500" />;
      case 2:
        return <FileText className="w-4 h-4 text-green-500" />;
      case 3:
        return <MousePointer className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getMenuTypeLabel = (type: number) => {
    switch (type) {
      case 1:
        return <Badge variant="outline">目录</Badge>;
      case 2:
        return <Badge variant="outline" className="text-green-600">菜单</Badge>;
      case 3:
        return <Badge variant="outline" className="text-orange-600">按钮</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  const renderMenuTable = (menuList: Menu[], level = 0): React.ReactElement[] => {
    return menuList.map((menu) => {
      const hasChildren = menu.children && menu.children.length > 0;
      const isExpanded = expandedMenus.includes(menu.id);

      return (
        <>
          <TableRow key={menu.id}>
            <TableCell>
              <div className="flex items-center" style={{ paddingLeft: level * 24 }}>
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(menu.id)}
                    className="w-6 h-6 flex items-center justify-center mr-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ) : (
                  <span className="w-6 mr-1" />
                )}
                {getMenuIcon(menu.type)}
                <span className="ml-2">{menu.menuName}</span>
              </div>
            </TableCell>
            <TableCell>
              <code className="bg-slate-100 px-2 py-1 rounded text-sm">{menu.menuCode}</code>
            </TableCell>
            <TableCell>{menu.path || '-'}</TableCell>
            <TableCell>{menu.component || '-'}</TableCell>
            <TableCell>{getMenuTypeLabel(menu.type)}</TableCell>
            <TableCell>{menu.sortOrder}</TableCell>
            <TableCell>
              <Badge variant={menu.status === 1 ? 'default' : 'secondary'}>
                {menu.status === 1 ? '启用' : '禁用'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/menus/${menu.id}`)}>
                    <Edit className="w-4 h-4 mr-2" />
                    编辑
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => confirmDelete(menu)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          {hasChildren && isExpanded && renderMenuTable(menu.children!, level + 1)}
        </>
      );
    });
  };

  const filteredMenus = menus.filter(
    (menu) =>
      menu.menuName.toLowerCase().includes(keyword.toLowerCase()) ||
      menu.menuCode.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">菜单管理</h1>
        <Button onClick={() => navigate('/menus/new')}>
          <Plus className="w-4 h-4 mr-2" />
          新增菜单
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索菜单名称或编码..."
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
          <CardTitle>菜单列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>菜单名称</TableHead>
                <TableHead>菜单编码</TableHead>
                <TableHead>路由路径</TableHead>
                <TableHead>组件路径</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    加载中...
                  </TableCell>
                </TableRow>
              ) : filteredMenus.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                renderMenuTable(filteredMenus)
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
              您确定要删除菜单 "{selectedMenu?.menuName}" 吗？此操作不可撤销。
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
    </div>
  );
}
