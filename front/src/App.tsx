import HomePage from "./pages/home/HomePage.tsx";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Provider } from "react-redux";
import { store } from "./bll/store";

function App() {

  return (
    <Provider store={store}>
    <>
      <Header/>
      <HomePage/>
      <Footer/>
    </>
    </Provider>
  )
}

export default App
