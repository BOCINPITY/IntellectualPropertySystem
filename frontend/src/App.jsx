import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import { useAuthStore } from '@store/authStore';
import MainLayout from '@components/layouts/MainLayout';
import AuthLayout from '@components/layouts/AuthLayout';
import DashboardLayout from '@components/layouts/DashboardLayout';
import NotFound from '@pages/NotFound';

// 懒加载页面组件
const Login = lazy(() => import('@pages/auth/Login'));
const Register = lazy(() => import('@pages/auth/Register'));
const ForgotPassword = lazy(() => import('@pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const PatentList = lazy(() => import('@pages/patents/List'));
const PatentDetail = lazy(() => import('@pages/patents/Detail'));
const PatentForm = lazy(() => import('@pages/patents/Form'));
const TrademarkList = lazy(() => import('@pages/trademarks/List'));
const CopyrightList = lazy(() => import('@pages/copyrights/List'));
const UserManagement = lazy(() => import('@pages/admin/UserManagement'));
const RolePermission = lazy(() => import('@pages/admin/RolePermission'));
const SystemSettings = lazy(() => import('@pages/admin/SystemSettings'));

// 私有路由组件 - 处理权限控制
const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}>
        <Routes>
          {/* 公开路由 */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AuthLayout />}>
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* 主应用路由 */}
          <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route path="dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />

            {/* 知识产权管理路由 */}
            <Route path="patents">
              <Route index element={<PatentList />} />
              <Route path="new" element={<PatentForm />} />
              <Route path=":id" element={<PatentDetail />} />
              <Route path=":id/edit" element={<PatentForm />} />
            </Route>

            <Route path="trademarks">
              <Route index element={<TrademarkList />} />
              {/* 商标详情和表单路由将在后续添加 */}
            </Route>

            <Route path="copyrights">
              <Route index element={<CopyrightList />} />
              {/* 版权详情和表单路由将在后续添加 */}
            </Route>
          </Route>

          {/* 管理员路由 */}
          <Route path="admin" element={
            <PrivateRoute requiredRoles={['admin']}>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route path="users" element={<UserManagement />} />
            <Route path="roles" element={<RolePermission />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* 404 路由 */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;