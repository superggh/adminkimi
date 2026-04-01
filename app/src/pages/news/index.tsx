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
import { newsApi } from '@/api/news';
import type { News, PageResult } from '@/types';
import { NewsCategoryMap } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

export function NewsList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageResult<News>>({ list: [], total: 0, page: 1, size: 10 });
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const result = await newsApi.getList({ page, size: 10, keyword, category });
      setData(result);
    } catch (error) {
      console.error('Failed to fetch news:', error);
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
    if (!selectedNews) return;
    try {
      await newsApi.delete(selectedNews.id);
      setDeleteDialogOpen(false);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  const confirmDelete = (news: News) => {
    setSelectedNews(news);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">新闻管理</h1>
        <Button onClick={() => navigate('/news/new')}>
          <Plus className="w-4 h-4 mr-2" />
          新增新闻
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs value={category} onValueChange={setCategory} className="w-auto">
              <TabsList>
                <TabsTrigger value="">全部</TabsTrigger>
                <TabsTrigger value="political">时政要闻</TabsTrigger>
                <TabsTrigger value="work">工作动态</TabsTrigger>
                <TabsTrigger value="notice">通知公告</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索新闻标题..."
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
          <CardTitle>新闻列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>浏览量</TableHead>
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
                data.list.map((news) => (
                  <TableRow key={news.id}>
                    <TableCell>{news.id}</TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{news.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{NewsCategoryMap[news.category || ''] || news.category}</Badge>
                    </TableCell>
                    <TableCell>{news.tag || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-slate-400" />
                        {news.views}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(news.createdAt, 'YYYY-MM-DD')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/news/${news.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(news)}
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
              您确定要删除新闻 "{selectedNews?.title}" 吗？此操作不可撤销。
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
