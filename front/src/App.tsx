import HomePage from "./pages/home/HomePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Provider } from "react-redux";
import { store } from "./bll/store";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from "./pages/about/About";
import ItemProduct from "./pages/productPage/ItemProduct";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import { PATH } from "./router";

function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
