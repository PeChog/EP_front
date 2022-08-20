import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const ReadImage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [images, setImages] = useState([]);

  const [reorderButtons, setReorderButton] = useState(false);

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.post("http://localhost:3000/delete/image", {
        _id: id,
      });
      if (response.data.deletedCount > 0) {
        const copyImagesArray = [...images];

        copyImagesArray.splice(index, 1);

        setImages(copyImagesArray);
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
      const response = await axios.post("http://localhost:3000/reorder/image", {
        images: JSON.stringify(images),
      });
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
        const response = await axios.get("http://localhost:3000/images");

        // console.log(response.data);

        setImages(response.data);
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

      <h1 style={{ textAlign: "center", marginBottom: 0 }}>
        Toutes les Images
      </h1>

      {errorMessage ? (
        <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4>
      ) : null}

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          onClick={() => {
            navigate("/createImage", { state: { index: images.length } });
          }}
          className={"createButton"}>
          Creer une nouvelle entrée
        </button>

        <button
          onClick={() => {
            setReorderButton(true);
          }}
          className={"reorderButton"}>
          Reorganiser les images
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Image</th>
            <th scope="col">Titre</th>
            <th scope="col">Supprimer</th>
            {reorderButtons && (
              <th scope="col">
                <button className="updateButton" onClick={handleReorder}>
                  Save Ordre
                </button>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {images &&
            images
              .sort(function (a, b) {
                return a.image_index - b.image_index;
              })
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                    </td>
                    <td>{item.image_titre}</td>

                    <td>
                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          handleDelete(item._id, index);
                        }}
                        className={"deleteButton"}>
                        Supprimer
                      </button>
                    </td>
                    {reorderButtons && (
                      <>
                        <td
                          className="reorderIcon"
                          onClick={() => {
                            const copyImages = [...images];
                            if (index > 0) {
                              copyImages.splice(index, 1);
                              copyImages.splice(index - 1, 0, item);

                              copyImages.map((image, index) => {
                                console.log(image);
                                return (image.image_index = index);
                              });

                              setImages(copyImages);
                            }
                          }}>
                          ▲
                        </td>
                        <td
                          className="reorderIcon"
                          onClick={() => {
                            const copyImages = [...images];
                            if (index < images.length - 1) {
                              copyImages.splice(index, 1);

                              copyImages.splice(index + 1, 0, item);

                              copyImages.map((image, index) => {
                                return (image.image_index = index);
                              });
                              console.log(images);
                              setImages(copyImages);
                            }
                          }}>
                          ▼
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
export default ReadImage;
