import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const BackofficeHome = ({ handleToken }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Link to={"/"}>Retour sur le site</Link>

      <h1 style={{ textAlign: "center" }}>BackOffice</h1>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={"/CrudExpositions"}>
          Creer, Modifier, Supprimer des dates et expositions
        </Link>

        <Link to={"/CrudImages"}>Creer, Modifier, Supprimer des images</Link>

        <Link to={"/addPdf"}>Ajouter une brochure</Link>
      </div>
    </div>
  );
};

export default BackofficeHome;
