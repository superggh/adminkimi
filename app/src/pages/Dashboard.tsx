import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  FileText,
  ArrowRight,
  MoreHorizontal,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// 模拟数据
const statsData = [
  {
    title: '入驻企业',
    value: '12,580',
    suffix: '+',
    change: '+12.5%',
    positive: true,
    icon: Building2,
    color: 'blue',
  },
  {
    title: '累计交易',
    value: '45,230',
    suffix: '+',
    change: '+8.3%',
    positive: true,
    icon: ShoppingCart,
    color: 'green',
  },
  {
    title: '交易金额',
    value: '128',
    suffix: '亿',
    change: '+15.2%',
    positive: true,
    icon: TrendingUp,
    color: 'purple',
  },
  {
    title: '满意度',
    value: '98.5',
    suffix: '%',
    change: '+2.1%',
    positive: true,
    icon: Users,
    color: 'orange',
  },
];

const trendData = [
  { month: '1月', value: 3200 },
  { month: '2月', value: 4100 },
  { month: '3月', value: 3800 },
  { month: '4月', value: 5200 },
  { month: '5月', value: 6100 },
  { month: '6月', value: 5800 },
  { month: '7月', value: 7200 },
  { month: '8月', value: 8100 },
  { month: '9月', value: 7600 },
  { month: '10月', value: 8900 },
  { month: '11月', value: 9500 },
  { month: '12月', value: 10200 },
];

const industryData = [
  { name: '纺织服装', value: 3456, color: '#3b82f6' },
  { name: '食品饮料', value: 2876, color: '#10b981' },
  { name: '家用电器', value: 2234, color: '#f59e0b' },
  { name: '日用化工', value: 1876, color: '#8b5cf6' },
  { name: '其他行业', value: 2138, color: '#64748b' },
];

const todoList = [
  { id: 1, title: '企业入驻申请待审核', count: 12, type: 'warning' },
  { id: 2, title: '留言咨询待回复', count: 5, type: 'info' },
  { id: 3, title: '新闻发布待审核', count: 3, type: 'default' },
  { id: 4, title: 'SaaS试用申请', count: 8, type: 'success' },
];

const recentActivities = [
  { id: 1, content: '某某科技有限公司提交了入驻申请', time: '5分钟前', type: 'enterprise' },
  { id: 2, content: '收到新的留言咨询', time: '30分钟前', type: 'message' },
  { id: 3, content: '发布了新的政策文件', time: '1小时前', type: 'policy' },
  { id: 4, content: '某某企业通过了资质认证', time: '2小时前', type: 'enterprise' },
  { id: 5, content: '系统完成了数据备份', time: '3小时前', type: 'system' },
];

export function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState<string[]>(statsData.map(() => '0'));

  useEffect(() => {
    // 数字动画效果
    statsData.forEach((stat, index) => {
      const targetValue = parseInt(stat.value.replace(/,/g, ''));
      const duration = 1500;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          current = targetValue;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current).toLocaleString();
          return newValues;
        });
      }, duration / steps);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">仪表盘</h1>
        <div className="text-sm text-slate-500">
          今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {animatedValues[index]}
                    </span>
                    <span className="text-lg text-slate-500">{stat.suffix}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.positive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={stat.positive ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                      {stat.change}
                    </span>
                    <span className="text-slate-400 text-sm">较上月</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 交易趋势 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">交易趋势</CardTitle>
            <Button variant="ghost" size="sm">
              查看更多 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 行业分布 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">行业分布</CardTitle>
            <Button variant="ghost" size="sm">
              查看更多 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {industryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 待办事项 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">待办事项</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todoList.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-slate-700">{todo.title}</span>
                  <Badge variant={todo.type as any}>{todo.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最新动态 */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">最新动态</CardTitle>
            <Button variant="ghost" size="sm">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {activity.type === 'enterprise' && <Building2 className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'message' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'policy' && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'system' && <MoreHorizontal className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700">{activity.content}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
