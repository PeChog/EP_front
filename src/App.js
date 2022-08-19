import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Backoffice from "./pages/Backoffice";
import Cookies from "js-cookie";

function App() {
  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
    } else {
      Cookies.remove("userToken");
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/auth"
          element={<Login handleToken={handleToken} />}
        ></Route>
        <Route path="/backoffice" element={<Backoffice />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
