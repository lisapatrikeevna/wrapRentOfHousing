import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider, } from 'react-router-dom'
import ItemProduct from "./pages/productPage/ItemProduct";
import LandlordPage from "./pages/landlord/LandlordPage";
import { useDispatch } from "react-redux";
import { useMeQuery } from "./bll/auth/auth.servies";
import RegisterForm from "./pages/auth/registerForm/RegisterForm";
import App from "./App";
import ErrorPage from "./pages/errorPage/ErrorPage";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import PageLogin from "./pages/auth/login/pageLogin";


export const PATH = {
  login: '/login', loginOut: '/logOut', register: '/register', home: '/', renter: '/renter', landlord: '/landlord', // cardTest:'/cardTest',
  about: '/about', privacyPolicy: '/privacyPolicy', itemRealty: '/realEstate',
}

const publicRoutes: RouteObject[] = [
  {element: <RegisterForm/>, path: PATH.register,},
  {element: <PageLogin/>, path: PATH.login,},
  {element: <HomePage/>, path: PATH.home,},
  {element: <About/>, path: PATH.about,},
  {element: <ItemProduct/>, path: PATH.privacyPolicy,},
  {element: <ItemProduct/>, path: PATH.itemRealty,},
]

const privateRoutes: RouteObject[] = [
  {
  element: <LandlordPage/>, path: PATH.landlord,
}, {
  element: <div>log out</div>, path: PATH.loginOut,
},
]


const router = createBrowserRouter([
  {
    element: <App />, // Корневой компонент
    errorElement: <ErrorPage />, // Страница ошибки
    children: [
      ...publicRoutes, // Открытые маршруты
      {
        element: <PrivateRoutes />, // Приватные маршруты
        children: privateRoutes, // Дочерние маршруты
      },
      {
        path: "*", // Обработка всех несуществующих маршрутов
        element: <ErrorPage />, // Страница 404
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};



// function PrivateRoutes() {
//   const dispatch = useDispatch()
//   const {data, isError, isLoading} = useMeQuery()
//
//   // const isAuthenticated = true
//   const isAuthenticated = !isError
//
//   if( isLoading ) {
//     return null
//   }
//   if( data ) {
//     // dispatch(appAC.setUser(data))
//   }
//   return isAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
// }
function PrivateRoutes() {
  const { data, isError, isLoading } = useMeQuery();

  const isAuthenticated = !isError;

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.login} />;
}
//<Route path="*" element={<NoMatch />} />

