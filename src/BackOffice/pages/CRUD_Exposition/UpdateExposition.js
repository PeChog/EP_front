import React, { useState } from "react";

import { useLocation } from "react-router-dom";

const UpdateExposition = () => {
  const { state } = useLocation();
  //   const bddItem = location.state.item

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dateUpdate, setDateUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");

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
        }}>
        <input
          value={dateUpdate}
          type="text"
          placeholder={state.item.expo_date}
          onChange={(e) => {
            setDateUpdate(e.target.value);
          }}
        />
        <input
          value={descriptionUpdate}
          type="text"
          placeholder={state.item.expo_description}
          onChange={(e) => {
            setDescriptionUpdate(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default UpdateExposition;
