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
      {/* <button
        onClick={() => {
          handleToken(null);
          navigate("/auth");
        }}>
        Deconnexion
      </button> */}
      <Link to={"/"}>Retour sur le site</Link>

      <h1 style={{ textAlign: "center" }}>BackOffice</h1>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to={"/CrudExpositions"}>
          Creer, Modifier, Supprimer des dates et expositions
        </Link>

        <Link to={"/CrudImages"}>Creer, Modifier, Supprimer des images</Link>

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
