import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider, } from 'react-router-dom'
import ItemProduct from "./pages/itemRealtysPage/ItemProduct";
import LandlordPage from "./pages/landlord/LandlordPage";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "./bll/auth/auth.servies";
import RegisterForm from "./pages/auth/registerForm/RegisterForm";
import App from "./App";
import ErrorPage from "./pages/errorPage/ErrorPage";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import PageLogin from "./pages/auth/login/pageLogin";
import { appAC } from "./bll/app.slice";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import LogoutPage from "./pages/auth/logoutPage/LogoutPage";
import { RootStateType } from "./bll/store";
import { UserType } from "./bll/auth/auth.type";
import UserHistory from "./pages/usesrHistory/UserHistory";
import UserFavorites from "./pages/usesrFavorites/UserHistory.tsx";
import React from "react";
import UsersBooking from "./pages/usersBooking/UsersBooking.tsx";


export const PATH = {
  login: '/login', loginOut: '/logOut',
  register: '/register', home: '/', renter: '/renter',
  about: '/about', privacyPolicy: '/privacyPolicy',
  itemRealty: '/realEstate', toLandlords: '/toLandlords',
  history: '/history',favorite: '/favorite',
  myBooking: '/myBooking',
}

const publicRoutes: RouteObject[] = [
  {element: <RegisterForm/>, path: PATH.register,},
  {element: <PageLogin/>, path: PATH.login,},
  {element: <HomePage/>, path: PATH.home,},
  {element: <About/>, path: PATH.about,},
  {element: <PrivacyPolicy/>, path: PATH.privacyPolicy,},
  // {element: <ItemProduct/>, path: PATH.itemRealty,},
]

const privateRoutes: RouteObject[] = [
  {element: <LandlordPage/>, path: PATH.toLandlords},
  {element: <ItemProduct/>, path: PATH.itemRealty},
  {element: <LogoutPage/>, path: PATH.loginOut,},
  {element: <UserHistory/>, path: PATH.history},
  {element: <UserFavorites/>, path: PATH.favorite},
  {element: <UsersBooking/>, path: PATH.myBooking},
  // {element: <div>log out</div>, path: PATH.loginOut,},
]


const router = createBrowserRouter([{
  element: <App/>, // Корневой компонент
  // errorElement: <ErrorPage/>, // Страница ошибки
  children: [...publicRoutes, // Открытые маршруты
    {
      element: <PrivateRoutes/>, // Приватные маршруты
      children: privateRoutes, // Дочерние маршруты
    }, {
      path: "*", // Обработка всех несуществующих маршрутов
      element: <ErrorPage/>, // Страница 404
    },],
},]);

export const Router = () => {
  return <RouterProvider router={router}/>;
};

function PrivateRoutes() {
  const dispatch = useDispatch();
  const user = useSelector<RootStateType, UserType | null>((state) => state.app.user);

  // Используем skip для условного вызова useMeQuery
  const {data, isError, isLoading} = useMeQuery(undefined, {skip: !!user});
  console.log("useMeQuery/user", data);

  // Если пользователь уже есть в стейте, пропускаем его дальше
  if( user ) {
    return <Outlet/>;
  }

  if( isLoading ) {
    return <div>Loading...</div>;
  }
  if( isError || !data ) {
    return <Navigate to={PATH.login}/>;
  }

  if(data && data.user ) {
    dispatch(appAC.setUser(data.user));
  }

  // После сохранения пользователя в стейте, пропускаем к приватным маршрутам
  return <Outlet/>;
}

// function PrivateRoutes() {
//   const dispatch = useDispatch()
//   const user=useSelector<RootStateType,UserType|null>(state => state.app.user)
//
//   if(!user){
//     const {data, isError, isLoading} = useMeQuery()
//
//     // const isAuthenticated = true
//     // const isAuthenticated = !isError
//
//     if( isLoading ) {
//       return <CircularProgress />
//     }
//     if( data ) {
//       console.log(data);
//       dispatch(appAC.setUser(data))
//     }
//     const isAuthenticated = !isError;
//     return isAuthenticated ? <Outlet /> : <Navigate to={PATH.login} />;
//   }
//   return <Outlet />;
//   // return isAuthenticated ? <Outlet /> : <Navigate to={PATH.login} />;
// }

//<Route path="*" element={<NoMatch />} />

