import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const CreateExposition = ({ handleToken }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const sumbitNewExposition = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/create/exposition",
        {
          date,
          description,
        }
      );
      if (!response.data.message) {
        navigate("/CrudExpositions");
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
    <div>
      <h1 style={{ textAlign: "center" }}>Create</h1>
      {errorMessage ? (
        <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4>
      ) : null}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={sumbitNewExposition}>
        <input
          value={date}
          type="text"
          placeholder="titre / date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          value={description}
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateExposition;
