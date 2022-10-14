import "./App.css";

import { useState } from "react";

import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BackofficeHome from "./BackOffice/pages/BackOfficeHome";

import ReadExposition from "./BackOffice/pages/CRUD_Exposition/ReadExposition";
import CreateExposition from "./BackOffice/pages/CRUD_Exposition/CreateExposition";
import UpdateExposition from "./BackOffice/pages/CRUD_Exposition/UpdateExposition";

import ReadImage from "./BackOffice/pages/CRUD_Images/ReadImage";
import CreateImage from "./BackOffice/pages/CRUD_Images/CreateImage";

import AddPdf from "./BackOffice/pages/AddPdf";

import Helmet from "react-helmet";

import Home from "./ClientFront/pages/Home";
import Login from "./ClientFront/pages/Login";

function App() {
  const [token, setToken] = useState();

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("userToken", token, { expires: 1 });
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  };
  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Eliott Paquet</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {!Cookies.get("userToken") ? (
          <Route
            path="/auth"
            element={<Login handleToken={handleToken} />}
          ></Route>
        ) : (
          <>
            <Route
              path="/backoffice"
              element={<BackofficeHome handleToken={handleToken} />}
            ></Route>

            <Route path="/CrudExpositions" element={<ReadExposition />}></Route>

            <Route
              path="/createExposition"
              element={<CreateExposition />}
            ></Route>

            <Route
              path="/updateExposition"
              element={<UpdateExposition />}
            ></Route>

            <Route path="/CrudImages" element={<ReadImage />}></Route>

            <Route path="/createImage" element={<CreateImage />}></Route>

            <Route path="/addPdf" element={<AddPdf />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
