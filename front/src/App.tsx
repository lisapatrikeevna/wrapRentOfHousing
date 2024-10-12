import HomePage from "./pages/home/HomePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from "./pages/about/About";
import ItemProduct from "./pages/productPage/ItemProduct";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import { PATH } from "./router";
import { useEffect } from "react";
import { appAC } from "./bll/app.slice";
import { useGetCategoryQuery } from "./bll/category/category.service";



function App() {
  const dispatch = useDispatch()
  const { data: categories, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetCategoryQuery();
  // console.log("!!!!categories", categories, isLoadingCategory, isErrorCategory);
  useEffect(()=>{
    // @ts-ignore
    isErrorCategory && dispatch(appAC.setIsErrorCategory(isErrorCategory));
    dispatch(appAC.setIsLoadingCategory(isLoadingCategory));
    categories && dispatch(appAC.setCategories(categories));
  },[categories,isLoadingCategory,isErrorCategory])


  return (
      <Router>
        <Header/>
        <Routes>
          <Route path={PATH.home} element={<HomePage />} />
          <Route path={PATH.about} element={<About />} />
          <Route path={PATH.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={PATH.itemRealty} element={<ItemProduct />} />
        </Routes>
        <Footer/>
      </Router>
  )
}

export default App
