import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const ReadExposition = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [expositions, setExpositions] = useState();

  const [reorderButtons, setReorderButton] = useState(false);

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.post(
        "https://eliottp-backend.herokuapp.com/delete/exposition",
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

  const handleReorder = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://eliottp-backend.herokuapp.com/reorder/expositions",
        {
          expositions: JSON.stringify(expositions),
        }
      );
      console.log(response.data);
    } catch (error) {
      setErrorMessage(true);
    }
    setReorderButton(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchExpositions = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.get(
          "https://eliottp-backend.herokuapp.com/expositions"
        );

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
          navigate("/createExposition", {
            state: { index: expositions.length },
          });
        }}
        className={"createButton"}
      >
        Cr??er une nouvelle exposition
      </button>
      <button
        onClick={() => {
          setReorderButton(true);
        }}
        className={"reorderButton"}
      >
        Reorganiser les expositions
      </button>

      <table>
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Supprimer</th>
            {reorderButtons && (
              <th scope="col">
                <button
                  className="updateButton"
                  style={{ marginRight: "10px" }}
                  onClick={handleReorder}
                >
                  Save Order
                </button>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {expositions &&
            expositions
              .sort((a, b) => a.exposition_index - b.exposition_index)
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.expo_date}</td>
                    <td style={{ whiteSpace: "pre-line" }}>
                      {item.expo_description}
                    </td>

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
                    {reorderButtons && (
                      <>
                        <td
                          className="reorderIconExpo"
                          onClick={() => {
                            const copyExpositions = [...expositions];
                            if (index > 0) {
                              copyExpositions.splice(index, 1);
                              copyExpositions.splice(index - 1, 0, item);

                              copyExpositions.map((exposition, index) => {
                                console.log(expositions);
                                return (exposition.exposition_index = index);
                              });

                              setExpositions(copyExpositions);
                              console.log(expositions);
                            }
                          }}
                        >
                          ???
                        </td>
                        <td
                          className="reorderIconExpo"
                          onClick={() => {
                            const copyExpositions = [...expositions];
                            if (index < expositions.length - 1) {
                              copyExpositions.splice(index, 1);

                              copyExpositions.splice(index + 1, 0, item);

                              copyExpositions.map((exposition, index) => {
                                return (exposition.exposition_index = index);
                              });
                              console.log(expositions);
                              setExpositions(copyExpositions);
                            }
                          }}
                        >
                          ???
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
export default ReadExposition;
