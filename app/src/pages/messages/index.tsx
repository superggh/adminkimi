import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { messageApi } from '@/api/messages';
import type { Message, PageResult } from '@/types';
import { MessageStatusMap } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Search,
  MoreHorizontal,
  Reply,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';

export function MessageList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageResult<Message>>({ list: [], total: 0, page: 1, size: 10 });
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string>('');
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, size: 10, keyword };
      if (status !== '') params.status = parseInt(status);
      const result = await messageApi.getList(params);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
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

  const handleReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;
    try {
      await messageApi.reply(selectedMessage.id, replyContent);
      setReplyDialogOpen(false);
      setReplyContent('');
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to reply message:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条留言吗？')) return;
    try {
      await messageApi.delete(id);
      fetchData(data.page);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const openReplyDialog = (message: Message) => {
    setSelectedMessage(message);
    setReplyContent(message.reply || '');
    setReplyDialogOpen(true);
  };

  const openDetailDialog = (message: Message) => {
    setSelectedMessage(message);
    setDetailDialogOpen(true);
  };

  const getStatusBadge = (status: number) => {
    const config = MessageStatusMap[status];
    return <Badge variant={config?.color as any}>{config?.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">留言咨询管理</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs value={status} onValueChange={setStatus} className="w-auto">
              <TabsList>
                <TabsTrigger value="">全部</TabsTrigger>
                <TabsTrigger value="0">待回复</TabsTrigger>
                <TabsTrigger value="1">已回复</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="搜索姓名、电话或主题..."
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
          <CardTitle>留言列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>留言编号</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>联系电话</TableHead>
                <TableHead>主题</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>留言时间</TableHead>
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
                data.list.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-mono text-sm">{message.messageNo}</TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>{formatDate(message.createdAt, 'YYYY-MM-DD HH:mm')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetailDialog(message)}>
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openReplyDialog(message)}>
                            <Reply className="w-4 h-4 mr-2" />
                            {message.status === 0 ? '回复' : '修改回复'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(message.id)}
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

      {/* 详情对话框 */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>留言详情</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500">留言编号</label>
                  <p className="font-medium">{selectedMessage.messageNo}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">状态</label>
                  <p>{getStatusBadge(selectedMessage.status)}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">姓名</label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">联系电话</label>
                  <p className="font-medium">{selectedMessage.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">电子邮箱</label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">所属单位</label>
                  <p className="font-medium">{selectedMessage.company || '-'}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-500">主题</label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">留言内容</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg text-sm">
                  {selectedMessage.content}
                </div>
              </div>
              {selectedMessage.reply && (
                <div>
                  <label className="text-sm text-slate-500">回复内容</label>
                  <div className="mt-1 p-3 bg-blue-50 rounded-lg text-sm">
                    {selectedMessage.reply}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 回复对话框 */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>回复留言</DialogTitle>
            <DialogDescription>
              回复 {selectedMessage?.name} 的留言：{selectedMessage?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-500">留言内容</label>
              <div className="mt-1 p-3 bg-slate-50 rounded-lg text-sm max-h-32 overflow-y-auto">
                {selectedMessage?.content}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">回复内容</label>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="请输入回复内容..."
                rows={5}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleReply} disabled={!replyContent.trim()}>
              <Send className="w-4 h-4 mr-2" />
              发送回复
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
