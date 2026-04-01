import { useState, useEffect } from 'react';
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
import { enterpriseApi } from '@/api/enterprises';
import type { Enterprise, PageResult } from '@/types';
import { EnterpriseStatusMap } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function EnterpriseList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageResult<Enterprise>>({ list: [], total: 0, page: 1, size: 10 });
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string>('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, size: 10, keyword };
      if (status !== '') params.status = parseInt(status);
      const result = await enterpriseApi.getList(params);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch enterprises:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]);

  const handleSearch = () => {
    fetchData(1);
  };

  const handleApprove = async (id: number) => {
    try {
      await enterpriseApi.approve(id);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to approve enterprise:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await enterpriseApi.reject(id);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to reject enterprise:', error);
    }
  };

  const showDetail = (enterprise: Enterprise) => {
    setSelectedEnterprise(enterprise);
    setDetailDialogOpen(true);
  };

  const getStatusBadge = (status: number) => {
    const config = EnterpriseStatusMap[status];
    return <Badge variant={config?.color as any}>{config?.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">企业入驻管理</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs value={status} onValueChange={setStatus} className="w-auto">
              <TabsList>
                <TabsTrigger value="">全部</TabsTrigger>
                <TabsTrigger value="0">待审核</TabsTrigger>
                <TabsTrigger value="1">已通过</TabsTrigger>
                <TabsTrigger value="2">已拒绝</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索企业名称或申请编号..."
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
          <CardTitle>入驻申请列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>申请编号</TableHead>
                <TableHead>企业名称</TableHead>
                <TableHead>联系人</TableHead>
                <TableHead>联系电话</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>申请时间</TableHead>
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
                data.list.map((enterprise) => (
                  <TableRow key={enterprise.id}>
                    <TableCell className="font-mono text-sm">{enterprise.applicationNo}</TableCell>
                    <TableCell className="font-medium">{enterprise.companyName}</TableCell>
                    <TableCell>{enterprise.legalPerson}</TableCell>
                    <TableCell>{enterprise.phone}</TableCell>
                    <TableCell>{getStatusBadge(enterprise.status)}</TableCell>
                    <TableCell>{formatDate(enterprise.createdAt, 'YYYY-MM-DD')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => showDetail(enterprise)}>
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          {enterprise.status === 0 && (
                            <>
                              <DropdownMenuItem onClick={() => handleApprove(enterprise.id)}>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                审核通过
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReject(enterprise.id)}>
                                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                审核拒绝
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* 详情对话框 */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>企业入驻详情</DialogTitle>
          </DialogHeader>
          {selectedEnterprise && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500">申请编号</label>
                  <p className="font-medium">{selectedEnterprise.applicationNo}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">申请状态</label>
                  <p>{getStatusBadge(selectedEnterprise.status)}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">企业名称</label>
                  <p className="font-medium">{selectedEnterprise.companyName}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">统一社会信用代码</label>
                  <p className="font-medium">{selectedEnterprise.creditCode}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">法定代表人</label>
                  <p className="font-medium">{selectedEnterprise.legalPerson}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">联系电话</label>
                  <p className="font-medium">{selectedEnterprise.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">电子邮箱</label>
                  <p className="font-medium">{selectedEnterprise.email}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">所属行业</label>
                  <p className="font-medium">{selectedEnterprise.industry || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-slate-500">企业地址</label>
                  <p className="font-medium">
                    {selectedEnterprise.province} {selectedEnterprise.city} {selectedEnterprise.address}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">注册资本</label>
                  <p className="font-medium">{selectedEnterprise.registeredCapital || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">成立时间</label>
                  <p className="font-medium">
                    {selectedEnterprise.establishDate ? formatDate(selectedEnterprise.establishDate, 'YYYY-MM-DD') : '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">员工人数</label>
                  <p className="font-medium">{selectedEnterprise.employeeCount || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">企业官网</label>
                  <p className="font-medium">{selectedEnterprise.website || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-slate-500">经营范围</label>
                  <p className="text-sm mt-1">{selectedEnterprise.businessScope || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-slate-500">企业简介</label>
                  <p className="text-sm mt-1">{selectedEnterprise.introduction || '-'}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedEnterprise?.status === 0 && (
              <>
                <Button variant="outline" onClick={() => handleReject(selectedEnterprise.id)}>
                  <XCircle className="w-4 h-4 mr-2" />
                  拒绝
                </Button>
                <Button onClick={() => handleApprove(selectedEnterprise.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  通过
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
