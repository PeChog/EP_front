import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPdf = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [pdf, setPdf] = useState();

  const handlePdf = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("Pdf", pdf);

      const response = await axios.post(
        "http://localhost:3000/upload/pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);

      navigate("/backoffice");
    } catch (error) {
      console.log(error.message);
    }
  };
  return isLoading ? (
    <div>
      <h3>En cours de chargement ...</h3>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h1>Ajouter une nouvelle brochure</h1>
      <form
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
      </form>
    </div>
  );
};

export default AddPdf;
