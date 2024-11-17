import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { appAC } from "./bll/app.slice";
import { useGetCategoryQuery } from "./bll/category/category.service";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { useMeQuery } from "./bll/auth/auth.servies.ts";


function App() {
  const dispatch = useDispatch()
  const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();
  // console.log("!!!!categories", categories, isLoadingCategory, isErrorCategory);
  useEffect(()=>{
    isErrorCategory && dispatch(appAC.setIsErrorCategory(isErrorCategory.toString()));
    dispatch(appAC.setIsLoadingCategory(isLoadingCategory));
    categories && dispatch(appAC.setCategories(categories));
  },[categories,isLoadingCategory,isErrorCategory,dispatch])
  const {data:updatedUser, isLoading:isMeLoad} = useMeQuery()
  useEffect(() => {
    if (updatedUser) {
      dispatch(appAC.setUser(updatedUser));
    }
  }, [updatedUser]);


  return (
    <ErrorBoundary>
      <Header />
      <main>
        <Outlet /> {/* Здесь будут рендериться дочерние маршруты */}
      </main>
      <Footer />
    </ErrorBoundary>
  );
}


export default App
