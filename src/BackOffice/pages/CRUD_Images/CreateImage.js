import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const CreateImage = ({ handleToken }) => {
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [imageToUpload, setImageToUpload] = useState();
  const [title, setTitle] = useState("");

  const submitNewImage = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();

      formData.append("image", imageToUpload);
      formData.append("index", state.index);
      formData.append("title", title);

      const response = await axios.post(
        "http://localhost:3000/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data.message) {
        navigate("/CrudImages");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <div>
      <p>En cours de chargement ... </p>
    </div>
  ) : (
    <div className="createContainer">
      <h1 style={{ fontFamily: "Basteleur-Moonlight" }}>Create</h1>
      {errorMessage ? (
        <h4
          style={{
            color: "red",
            textAlign: "center",
            fontFamily: "Basteleur-Moonlight",
          }}
        >
          {errorMessage}
        </h4>
      ) : null}

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Basteleur-Moonlight",
        }}
        onSubmit={submitNewImage}
      >
        <input
          type="file"
          onChange={(e) => {
            setImageToUpload(e.target.files[0]);
          }}
          style={{
            fontFamily: "Basteleur-Moonlight",
          }}
        />

        <input
          value={title}
          type="text"
          placeholder="titre de l'image"
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          style={{ fontFamily: "Basteleur-Moonlight", marginTop: "10px" }}
        />

        <input
          type="submit"
          style={{
            fontFamily: "Basteleur-Moonlight",
            color: "black",

            width: "250px",
            height: "30px",
            borderBottom: "black",

            border: "none",
            borderBottom: "2px solid black",
            marginTop: "10px",
          }}
        />
      </form>
      {imageToUpload ? (
        <img src={URL.createObjectURL(imageToUpload)} alt="" />
      ) : null}
    </div>
  );
};

export default CreateImage;
