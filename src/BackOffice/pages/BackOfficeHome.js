import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const BackofficeHome = ({ handleToken }) => {
  const navigate = useNavigate();
  const [pdf, setPdf] = useState();

  // const handlePdf = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("pdfFile", pdf);

  //     const response = await axios.post(
  //       "http://localhost:3000/upload/pdf",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (
    <div>
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link className="expositionsBack" to={"/CrudExpositions"}>
          Créer, Modifier, Supprimer des dates et expositions
        </Link>

        <Link className="imagesBack" to={"/CrudImages"}>
          Créer, Modifier, Supprimer des images
        </Link>

        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePdf();
          }}>
          <input
            type="file"
            onChange={(e) => {
              setPdf(e.target.files[0]);
            }}
          />
          <input type="submit" />
        </form> */}
      </div>
    </div>
  );
};

export default BackofficeHome;
