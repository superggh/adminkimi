import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/stores/auth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { BrandList } from '@/pages/brands';
import { NewsList } from '@/pages/news';
import { PolicyList } from '@/pages/policies';
import { EnterpriseList } from '@/pages/enterprises';
import { MessageList } from '@/pages/messages';
import { UserList } from '@/pages/users';
import { RoleList } from '@/pages/roles';
import { MenuList } from '@/pages/menus';
import { PartnerList } from '@/pages/partners';
import { Settings } from '@/pages/settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// 路由守卫组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// 公开路由组件
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 登录页 */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* 主布局 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="brands" element={<BrandList />} />
            <Route path="brands/:id" element={<BrandList />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/:id" element={<NewsList />} />
            <Route path="policies" element={<PolicyList />} />
            <Route path="policies/:id" element={<PolicyList />} />
            <Route path="enterprises" element={<EnterpriseList />} />
            <Route path="messages" element={<MessageList />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserList />} />
            <Route path="roles" element={<RoleList />} />
            <Route path="roles/:id" element={<RoleList />} />
            <Route path="menus" element={<MenuList />} />
            <Route path="menus/:id" element={<MenuList />} />
            <Route path="partners" element={<PartnerList />} />
            <Route path="partners/:id" element={<PartnerList />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 重定向 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
