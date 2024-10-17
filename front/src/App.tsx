import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { appAC } from "./bll/app.slice";
import { useGetCategoryQuery } from "./bll/category/category.service";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";


function App() {
  const dispatch = useDispatch()
  const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();
  // console.log("!!!!categories", categories, isLoadingCategory, isErrorCategory);
  useEffect(()=>{
    // @ts-ignore
    isErrorCategory && dispatch(appAC.setIsErrorCategory(isErrorCategory));
    dispatch(appAC.setIsLoadingCategory(isLoadingCategory));
    categories && dispatch(appAC.setCategories(categories));
  },[categories,isLoadingCategory,isErrorCategory,dispatch])


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
