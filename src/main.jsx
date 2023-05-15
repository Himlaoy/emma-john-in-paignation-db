import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Layout/Home';
import Shop from './components/Shop/Shop';
import Product from './components/Product/Product';
import Order from './components/Order/Order';
import Longin from './components/Login/Longin';
import cardProduct from './CardProduct/CardProduct';
import CheckOut from './components/CheckOut/CheckOut';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/shop',
        element: <Shop></Shop>,
        loader:()=>fetch('http://localhost:5000/totalProducts')
      },
      {
        path: 'product',
        element: <Product></Product>
      },
      {
        path:'order',
        element:<Order></Order>,
        loader: cardProduct,
      },
      {
        path:'CheckOut',
        element: <CheckOut></CheckOut>,
      },
      {
        path:'login',
        element: <Longin></Longin>
      }
    ],
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
