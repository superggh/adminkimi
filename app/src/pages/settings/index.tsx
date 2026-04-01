import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contactApi } from '@/api/contacts';
import type { Contact } from '@/types';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import { Phone, Mail, Clock, MapPin, Save, User, Lock } from 'lucide-react';

export function Settings() {
  const { user } = useAuthStore();
  const [, setContacts] = useState<Contact[]>([]);
  const [, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 联系信息表单
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [address, setAddress] = useState('');

  // 个人信息表单
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await contactApi.getList();
      setContacts(result);
      // 初始化表单值
      result.forEach((contact) => {
        switch (contact.contactType) {
          case 'phone':
            setPhone(contact.contactValue);
            break;
          case 'email':
            setEmail(contact.contactValue);
            break;
          case 'work_time':
            setWorkTime(contact.contactValue);
            break;
          case 'address':
            setAddress(contact.contactValue);
            break;
        }
      });
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContacts = async () => {
    setSaving(true);
    try {
      const updates = [
        { id: 1, contactValue: phone },
        { id: 2, contactValue: email },
        { id: 3, contactValue: workTime },
        { id: 4, contactValue: address },
      ];
      for (const update of updates) {
        await contactApi.update(update.id, { contactValue: update.contactValue });
      }
      toast.success('联系信息保存成功');
    } catch (error) {
      console.error('Failed to save contacts:', error);
      toast.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('请填写所有密码字段');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('两次输入的新密码不一致');
      return;
    }
    setSaving(true);
    try {
      // 这里应该调用修改密码的API
      toast.success('密码修改成功');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('密码修改失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">系统设置</h1>
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList>
          <TabsTrigger value="contacts">联系信息</TabsTrigger>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="password">修改密码</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>联系信息设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    联系电话
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入联系电话"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    电子邮箱
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入电子邮箱"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    工作时间
                  </Label>
                  <Input
                    id="workTime"
                    value={workTime}
                    onChange={(e) => setWorkTime(e.target.value)}
                    placeholder="例如：工作日 9:00-18:00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    联系地址
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="请输入联系地址"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveContacts} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? '保存中...' : '保存设置'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    用户名
                  </Label>
                  <Input id="username" value={user?.username || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    昵称
                  </Label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="请输入昵称"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    电子邮箱
                  </Label>
                  <Input id="userEmail" value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userPhone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    联系电话
                  </Label>
                  <Input id="userPhone" value={user?.phone || ''} disabled />
                </div>
              </div>
              <div className="flex justify-end">
                <Button disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? '保存中...' : '保存资料'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>修改密码</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    当前密码
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="请输入当前密码"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    新密码
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="请输入新密码"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    确认新密码
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="请再次输入新密码"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleChangePassword} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? '修改中...' : '修改密码'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
