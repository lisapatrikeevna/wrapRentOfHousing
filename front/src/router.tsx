import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
// import PageLogin from '@/pages/page-login/page-login'
// import PageSignUp from "@/pages/sign-up/page-sign-up.tsx";
// import { useMeQuery } from "@/services/auth/auth.servies.ts";
// import DesksPage from "@/pages/desksPage/desksPage.tsx";
// import CardsPage from "@/pages/cards/cardsPage.tsx";
// import { useDispatch } from "react-redux";
import ItemProduct from "./pages/productPage/ItemProduct";
// import { appAC } from "@/services/app.slice.ts";
// import LearnCards from "@/pages/cards/learnCards/learnCards.tsx";

export const PATH={
  login:'/login',
  loginOut:'/logOut',
  signUp:'/signUp',
  home:'/',
  // cards:'/cards',
  // cardTest:'/cardTest',
  about:'/about',
  privacyPolicy:'/privacyPolicy',
  itemRealty:'/realEstate',
}

const publicRotes: RouteObject[] = [
  // {
  //   element: <PageLogin />,
  //   // path: '/login',
  //   path: PATH.login,
  // },
  // {
  //   element: <PageSignUp />,
  //   // path: '/signUp',
  //   path: PATH.signUp,
  // },
  {
    element: <ItemProduct />,
    path: PATH.itemRealty,
  },
]

const privateRoutes: RouteObject[] = [
  // {
  //   element: <DesksPage />,
  //   path: PATH.decks,
  // },
  {
    element: <div>log out</div>,
    path: PATH.loginOut,
  },
  // {
  //   element:<CardsPage/>,
  //   path:PATH.cards,
  //   // children:[
  //   //   {element: <LearnCards/>, path: PATH.learn}
  //   // ]
  // } ,
  // {element: <LearnCards/>, path: PATH.learn}

]

const router = createBrowserRouter([
  ...publicRotes,
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
function PrivateRoutes() {
  // const dispatch=useDispatch()
  // const {data,isError,isLoading} = useMeQuery()

  const isAuthenticated = true
  // const isAuthenticated = !isError
  //
  // if(isLoading){
  //   return null
  // }
  // if(data){
  //   dispatch(appAC.setUser(data))
  // }
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
//<Route path="*" element={<NoMatch />} />

