import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const ReadExposition = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [expositions, setExpositions] = useState();

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/delete/exposition",
        { _id: id }
      );
      if (response.data.deletedCount > 0) {
        const copyExpositionsArray = [...expositions];

        copyExpositionsArray.splice(index, 1);

        setExpositions(copyExpositionsArray);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchExpositions = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.get("http://localhost:3000/expositions");

        // console.log(response.data);

        setExpositions(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchExpositions();
  }, []);

  return isLoading ? (
    <div>
      <h3>En cours de chargement ...</h3>
    </div>
  ) : (
    <div className="read">
      <Link to={"/backoffice"}>Accueil backoffice</Link>

      <h1 style={{ textAlign: "center", marginBottom: 0 }}>Expositions</h1>

      {errorMessage ? (
        <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4>
      ) : null}

      <button
        onClick={() => {
          navigate("/createExposition");
        }}
        className={"createButton"}
      >
        Créer une nouvelle exposition
      </button>

      <table>
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>

        <tbody>
          {expositions &&
            expositions.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.expo_date}</td>
                  <td>{item.expo_description}</td>

                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        handleDelete(item._id, index);
                      }}
                      className={"deleteButton"}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default ReadExposition;
