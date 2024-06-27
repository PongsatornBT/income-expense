import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Statistic from './components/statistic/Statistic.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{
    path: "/home",
    element: <App />,
  },
  {
    path: "/statistic",
    element: <Statistic />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
