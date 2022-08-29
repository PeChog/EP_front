import axios from "axios";
import { useEffect, useState } from "react";
// import ReactSimplyCarousel from "react-simply-carousel";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sensDefilementImage, setSensDefilementImage] = useState(true);

  const [modalContact, setModalContact] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/expositions");
      console.log(response.data);
      setData(response.data);

      const responseImage = await axios.get("http://localhost:3000/images");
      console.log(responseImage.data);
      setDataImage(responseImage.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      {modalContact ? (
        <div className="modal">
          <h3 style={{ textAlign: "center" }}>Nos informations</h3>
          <div style={{ marginTop: "20px" }}>
            <p>Email : eliott@eliott.fr</p>
            <p>Adresse : rue eliott</p>
            <p>Numero : 1231424235425</p>
          </div>
        </div>
      ) : null}

      <div className="container" style={{ opacity: modalContact ? 0.3 : 1 }}>
        <div className="header">
          <h1
            className="logo"
            onClick={() => {
              setModalContact(false);
            }}>
            Eliott Paquet
          </h1>
          <div className="info">
            <a
              href={"http://localhost:3000/download/pdf"}
              download
              style={{ cursor: "pointer" }}>
              DWNLD PDF
            </a>
            <div
              onClick={() => {
                setModalContact(true);
              }}>
              CONTACT
            </div>
          </div>
        </div>
        <div
          className="main"
          onClick={() => {
            setModalContact(false);
          }}>
          <div className="expositions">
            <div className="collectives">Expositions Collectives</div>
            {data.map((exposition) => {
              return (
                <div className="list">
                  <div key={exposition._id} className="date">
                    {exposition.expo_date}
                  </div>
                  <div className="description">
                    {exposition.expo_description}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="caroussel">
            {dataImage &&
              dataImage
                .sort(function (a, b) {
                  return a.image_index - b.image_index;
                })
                .map((image, index) => {
                  if (index === activeSlideIndex) {
                    return (
                      <img
                        src={image.image}
                        className="carousselImage"
                        onClick={() => {
                          if (sensDefilementImage) {
                            if (activeSlideIndex < dataImage.length - 1) {
                              setActiveSlideIndex((prevState) => prevState + 1);

                              if (
                                activeSlideIndex + 1 ===
                                dataImage.length - 1
                              ) {
                                setSensDefilementImage(false);
                              }
                            }
                          } else {
                            if (activeSlideIndex > 0) {
                              setActiveSlideIndex((prevState) => prevState - 1);
                              console.log(activeSlideIndex);
                              if (activeSlideIndex - 1 === 0) {
                                setSensDefilementImage(true);
                                console.log(activeSlideIndex);
                              }
                            }
                          }
                        }}></img>
                    );
                  }
                })}
          </div>
        </div>
      </div>
    </>
  );
  // );
}

export default Home;
