import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

document.body.style.margin = '0';
document.body.style.height = '100%';

const Root = React.lazy(() => import('./pages/Root'));
const Stats = React.lazy(() => import('./pages/Stats'));
const Login = React.lazy(() => import('./pages/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/stats',
    element: <Stats />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense
        fallback={
          <div
            style={{
              width: '100dvw',
              height: '100dvh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin spinning />
          </div>
        }
      >
        <RouterProvider router={router} />
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
);
