import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./component/Layout/Layout.jsx";
import Login from "./component/Login/Login.jsx";
import Home from "./component/Home/Home.jsx";
import Register from "./component/Register/Register.jsx";
import Products from "./component/Products/products.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Categoires from "./component/Categories/Categories.jsx";
import Brand from "./component/Brand/Brand.jsx";
import Notfound from "./component/NotFound/Notfound.jsx";
import ProtectedRoute from "./component/protectedRoute/protectedRoute.jsx";
import Forget from "./component/forget/Forget.jsx";
import ResetCode from "./component/resetCode/ResetCode.jsx";
import NewPassword from "./component/NewPassword/NewPassword.jsx";
import ProductDetails from "./component/productDetails/productDetails.jsx";

function App() {
    let router = createBrowserRouter([
        {   path : '/' , element : <Layout/>  , children: [
                {index: true  , element :<ProtectedRoute> <Home/></ProtectedRoute>},
                {path: '/Register' , element :  <Register/>},
                {path: '/Login' , element :   <Login/> },
                {path: '/forget' , element :   <Forget/> },
                {path: '/ResetCode' , element :   <ResetCode/> },
                {path: '/NewPassword' , element :   <NewPassword/> },
                {path: '/Products' , element : <ProtectedRoute><Products/></ProtectedRoute> },
                {path: '/ProductDetails/:id/:catigory' , element : <ProtectedRoute><ProductDetails/></ProtectedRoute> },
                {path: '/Cart' , element : <ProtectedRoute> <Cart/></ProtectedRoute> },
                {path: '/Brand' , element : <ProtectedRoute> <Brand/> </ProtectedRoute> },
                {path: '/*' , element : <Notfound/> },
            ]
        }
    ])


  return (
    <>
<RouterProvider router={router}>

</RouterProvider>
    </>
  )
}

export default App
