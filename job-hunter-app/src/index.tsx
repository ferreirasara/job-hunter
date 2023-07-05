import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FiltersContextProvider } from './context/FiltersContext';
import { ShowOnlyContextProvider } from './context/ShowOnlyContext';
import { PaginationContextProvider } from './context/PaginationContext';
import { Spin } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.body.style.margin = "0";
document.body.style.height = "100%";

const Root = React.lazy(() => import("./pages/Root"));
const Stats = React.lazy(() => import("./pages/Stats"));
const Login = React.lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(
  <React.StrictMode>
    <FiltersContextProvider>
      <ShowOnlyContextProvider>
        <PaginationContextProvider>
          <React.Suspense fallback={<Spin spinning />}>
            <RouterProvider router={router} />
          </React.Suspense>
        </PaginationContextProvider>
      </ShowOnlyContextProvider>
    </FiltersContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
