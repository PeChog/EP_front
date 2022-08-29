import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const BackofficeHome = ({ handleToken }) => {
  const navigate = useNavigate();

  return (
    <div>
<<<<<<< HEAD
      <div className="headerBack">
        <Link to={"/"} className="retourSite">
          Retour sur le site
        </Link>
        <h1 className="backOfficeTitle">BackOffice</h1>
        <button
          className="deconnexion"
          onClick={() => {
            handleToken(null);
            navigate("/auth");
          }}
        >
          Déconnexion
        </button>
      </div>
=======
      <Link to={"/"}>Retour sur le site</Link>

      <h1 style={{ textAlign: "center" }}>BackOffice</h1>

>>>>>>> bce9459597e9301a89bbbb75681b1ed5b0bd93f3
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link className="expositionsBack" to={"/CrudExpositions"}>
          Créer, Modifier, Supprimer des dates et expositions
        </Link>

        <Link className="imagesBack" to={"/CrudImages"}>
          Créer, Modifier, Supprimer des images
        </Link>

        <Link to={"/addPdf"}>Ajouter une brochure</Link>
      </div>
    </div>
  );
};

export default BackofficeHome;
