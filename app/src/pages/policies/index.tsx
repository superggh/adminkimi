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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { policyApi } from '@/api/policies';
import type { Policy, PageResult } from '@/types';
import { PolicyCategoryMap } from '@/types';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Star,
} from 'lucide-react';

export function PolicyList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageResult<Policy>>({ list: [], total: 0, page: 1, size: 10 });
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const result = await policyApi.getList({ page, size: 10, keyword, category });
      setData(result);
    } catch (error) {
      console.error('Failed to fetch policies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleSearch = () => {
    fetchData(1);
  };

  const handleDelete = async () => {
    if (!selectedPolicy) return;
    try {
      await policyApi.delete(selectedPolicy.id);
      setDeleteDialogOpen(false);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to delete policy:', error);
    }
  };

  const confirmDelete = (policy: Policy) => {
    setSelectedPolicy(policy);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">政策管理</h1>
        <Button onClick={() => navigate('/policies/new')}>
          <Plus className="w-4 h-4 mr-2" />
          新增政策
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs value={category} onValueChange={setCategory} className="w-auto">
              <TabsList>
                <TabsTrigger value="">全部</TabsTrigger>
                <TabsTrigger value="national">国家政策</TabsTrigger>
                <TabsTrigger value="local">地方政策</TabsTrigger>
                <TabsTrigger value="industry">行业政策</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索政策标题..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>政策列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>文号</TableHead>
                <TableHead>来源</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>发布日期</TableHead>
                <TableHead>浏览量</TableHead>
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
              ) : data.list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                data.list.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.id}</TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        {policy.isFeatured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {policy.title}
                      </div>
                    </TableCell>
                    <TableCell>{policy.policyNumber || '-'}</TableCell>
                    <TableCell>{policy.source || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{PolicyCategoryMap[policy.category] || policy.category}</Badge>
                    </TableCell>
                    <TableCell>{policy.date || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-slate-400" />
                        {policy.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/policies/${policy.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          {policy.fileUrl && (
                            <DropdownMenuItem onClick={() => window.open(policy.fileUrl, '_blank')}>
                              <Download className="w-4 h-4 mr-2" />
                              下载文件
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => confirmDelete(policy)}
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

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-500">
              共 {data.total} 条记录，第 {data.page} / {Math.ceil(data.total / data.size)} 页
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchData(data.page - 1)}
                disabled={data.page <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchData(data.page + 1)}
                disabled={data.page >= Math.ceil(data.total / data.size)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除政策 "{selectedPolicy?.title}" 吗？此操作不可撤销。
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
