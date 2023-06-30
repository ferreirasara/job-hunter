import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Root } from './pages/Root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Stats } from './pages/Stats';
import { FiltersContextProvider } from './context/FiltersContext';
import { ShowOnlyContextProvider } from './context/ShowOnlyContext';
import { PaginationContextProvider } from './context/PaginationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.body.style.margin = "0";
document.body.style.height = "100%";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
]);

root.render(
  <React.StrictMode>
    <FiltersContextProvider>
      <ShowOnlyContextProvider>
        <PaginationContextProvider>
          <RouterProvider router={router} />
        </PaginationContextProvider>
      </ShowOnlyContextProvider>
    </FiltersContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
