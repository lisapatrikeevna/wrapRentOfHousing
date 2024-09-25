import HomePage from "./pages/homePage";
import Header from "./components/header/Header";
// import {API_URL} from "../../index";
// import axios from "axios";

function App() {
  // const getStudents = (data)=>{
  //   axios.get(API_URL).then(data => setStudents(data.data))
  // }
  return (
    <>
      <Header/>
      <HomePage/>

    </>
  )
}

export default App
