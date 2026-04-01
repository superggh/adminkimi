import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SlideCaptcha } from '@/components/captcha/SlideCaptcha';
import { Loader2, Shield, User, Lock, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleCaptchaVerify = (success: boolean) => {
    setCaptchaVerified(success);
    if (success) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }
    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    // 显示验证码
    if (!showCaptcha) {
      setShowCaptcha(true);
      return;
    }

    // 验证验证码
    if (!captchaVerified) {
      setError('请完成滑块验证');
      return;
    }

    setLoading(true);
    try {
      const result = await authApi.login({ username, password });
      
      if (!result || !result.token) {
        throw new Error('登录失败，服务器返回数据异常');
      }
      
      setToken(result.token);
      if (result.user) {
        setUser(result.user);
      }
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      // 使用 replace 导航到首页
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || '登录失败，请检查用户名和密码');
      // 重置验证码
      setCaptchaVerified(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌区域 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-center items-center text-white p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">供应链平台</h1>
              <p className="text-blue-200 text-sm">消费品产业供应链服务平台</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6">后台管理系统</h2>
          <p className="text-blue-100 text-lg mb-8">
            推动产业数字化转型，构建高效协同的供应链生态体系，助力企业降本增效，实现高质量发展。
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold">12,580+</div>
              <div className="text-blue-200 text-sm">入驻企业</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold">98.5%</div>
              <div className="text-blue-200 text-sm">满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2 lg:hidden">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">供应链平台</span>
            </div>
            <CardTitle className="text-2xl">欢迎回来</CardTitle>
            <CardDescription>请登录您的管理员账号</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 滑块验证码 */}
              {showCaptcha && (
                <div className="space-y-2">
                  <Label>安全验证</Label>
                  <SlideCaptcha 
                    onVerify={handleCaptchaVerify}
                    onRefresh={() => setCaptchaVerified(false)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    记住我
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || (showCaptcha && !captchaVerified)}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登录中...
                  </>
                ) : (
                  showCaptcha ? '登录' : '下一步'
                )}
              </Button>

              <div className="text-center text-sm text-slate-500">
                默认账号: admin / 123456
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
