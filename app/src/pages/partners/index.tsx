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
import { partnerApi } from '@/api/partners';
import type { Partner, PageResult } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Building2,
  Handshake,
} from 'lucide-react';

export function PartnerList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageResult<Partner>>({ list: [], total: 0, page: 1, size: 10 });
  const [keyword, setKeyword] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const result = await partnerApi.getList({ page, size: 10, keyword });
      setData(result);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(1);
  };

  const handleDelete = async () => {
    if (!selectedPartner) return;
    try {
      await partnerApi.delete(selectedPartner.id);
      setDeleteDialogOpen(false);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to delete partner:', error);
    }
  };

  const confirmDelete = (partner: Partner) => {
    setSelectedPartner(partner);
    setDeleteDialogOpen(true);
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      default:
        return <Handshake className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">合作伙伴管理</h1>
        <Button onClick={() => navigate('/partners/new')}>
          <Plus className="w-4 h-4 mr-2" />
          新增合作伙伴
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索合作伙伴名称..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="max-w-sm"
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
          <CardTitle>合作伙伴列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>排名</TableHead>
                <TableHead>排序</TableHead>
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
              ) : data.list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                data.list.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>{partner.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPartnerTypeIcon(partner.partnerType)}
                        <span className="font-medium">{partner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {partner.partnerType === 'group' ? '集团企业' : '合作伙伴'}
                      </Badge>
                    </TableCell>
                    <TableCell>{partner.rankNum ? `${partner.rankNum} ${partner.rankLabel || ''}` : '-'}</TableCell>
                    <TableCell>{partner.sortOrder}</TableCell>
                    <TableCell>{formatDate(partner.createdAt, 'YYYY-MM-DD')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/partners/${partner.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(partner)}
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
              您确定要删除合作伙伴 "{selectedPartner?.name}" 吗？此操作不可撤销。
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
