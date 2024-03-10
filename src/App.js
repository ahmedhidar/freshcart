import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import AuthProvider from './Context/Auth/Auth';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartProvider from './Context/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';

let queryClint = new QueryClient()
let routers = createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute>{" "}<Home/>{" "}</ProtectedRoute>},
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'details/:id',element:<ProtectedRoute>{" "}<ProductDetails/>{" "}</ProtectedRoute>},
    {path:'products',element:<ProtectedRoute>{" "}<Products/>{" "}</ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute>{" "}<Categories/>{" "}</ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute>{" "}<Brands/>{" "}</ProtectedRoute>},
    {path:'payment',element:<ProtectedRoute>{" "}<Payment/>{" "}</ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute>{" "}<AllOrders/>{" "}</ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute>{" "}<Cart/>{" "}</ProtectedRoute>},
    {path:'home',element:<ProtectedRoute>{" "}<Home/>{" "}</ProtectedRoute>},
    {path:'*',element:<NotFound/>},
  ]}
])

function App() {
  return <>
  <QueryClientProvider client={queryClint}>
  <Toaster/>
  <CartProvider>
  <AuthProvider>
  <RouterProvider router={routers}></RouterProvider>
  </AuthProvider>
  </CartProvider>
  </QueryClientProvider>
  
  </>
}

export default App;
