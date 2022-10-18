import axios from "axios";
import { useEffect, useState } from "react";
// import ReactSimplyCarousel from "react-simply-carousel";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/images/logo.png";
import { Zoom, Fade, LightSpeed } from "react-reveal";

function Home(props) {
  const [data, setData] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sensDefilementImage, setSensDefilementImage] = useState(true);
  const instaURL = `//www.instagram.com/eliott_paquet/`;

  const [modalContact, setModalContact] = useState(false);

  const location = useLocation();
  const input = location.state?.input;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://eliottp-backend.herokuapp.com/expositions"
      );
      console.log(response.data);
      setData(response.data);

      const responseImage = await axios.get(
        "https://eliottp-backend.herokuapp.com/images"
      );
      console.log(responseImage.data);
      setDataImage(responseImage.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25%",
      }}
    >
      <span className="loading">En cours de chargement</span>
    </div>
  ) : (
    <>
      <div className="container">
        <LightSpeed left delay={200}>
          <img
            className="logo1"
            onClick={() => {
              setModalContact(false);
            }}
            alt="logo"
            src={Logo}
          />
        </LightSpeed>

        <div className="info-container">
          <div className="info">
            <LightSpeed right delay={800}>
              <div
                className="contactDiv"
                onClick={() => {
                  setModalContact(true);
                  console.log("click");
                }}
              >
                cntct
              </div>
            </LightSpeed>
            <LightSpeed right delay={800}>
              <a
                href="https://drive.google.com/file/d/1irrtsegb9VNW5oQuS8HZSCzVH7-4hoKj/view"
                download
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "black",
                }}
                className="pdf"
              >
                pdf
              </a>
            </LightSpeed>
          </div>
        </div>

        <div
          className="main"
          onClick={() => {
            setModalContact(false);
          }}
        >
          <div className="contenuHome ">
            <Fade bottom delay={800}>
              <div className="expositions">
                {data
                  .sort((a, b) => a.exposition_index - b.exposition_index)
                  .map((exposition) => {
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
            </Fade>

            <div className="caroussel-container">
              {/* <Zoom duration={500}> */}
              <div className="caroussel">
                {modalContact ? (
                  <div className="modal-container">
                    <div className="modal">
                      <div className="modalcontent">
                        <p>Eliott Paquet</p>
                        <p>Live and work in Aubervilliers, Greater Paris, FR</p>

                        <p>
                          paquet.eliott@gmail.com <br />
                          <Link
                            to={{ pathname: instaURL }}
                            target={"_blank"}
                            style={{ color: "black" }}
                          >
                            Instagram
                          </Link>
                        </p>

                        <p>
                          contact@placementproduit.fr <br />
                          <Link
                            to={{ pathname: "//www.placementproduit.fr" }}
                            target={"_blank"}
                            style={{ color: "black" }}
                          >
                            www.placementproduit.fr
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
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
                            style={{ alignSelf: "center" }}
                            className="carousselImage"
                            onClick={() => {
                              if (sensDefilementImage) {
                                if (activeSlideIndex < dataImage.length - 1) {
                                  setActiveSlideIndex(
                                    (prevState) => prevState + 1
                                  );

                                  if (
                                    activeSlideIndex + 1 ===
                                    dataImage.length - 1
                                  ) {
                                    setSensDefilementImage(false);
                                  }
                                }
                              } else {
                                if (activeSlideIndex > 0) {
                                  setActiveSlideIndex(
                                    (prevState) => prevState - 1
                                  );
                                  console.log(activeSlideIndex);
                                  if (activeSlideIndex - 1 === 0) {
                                    setSensDefilementImage(true);
                                    console.log(activeSlideIndex);
                                  }
                                }
                              }
                            }}
                          ></img>
                        );
                      }
                    })}
              </div>
              {/* </Zoom> */}

              {/* <img alt="gribouillis" src={gribouillis} /> */}
            </div>
          </div>
        </div>
        <Fade bottom delay={1500}>
          <img
            src={require("../../assets/images/scroll-down-icon-16.jpeg")}
            alt="scrollDown"
            className="scrollDown"
          ></img>
        </Fade>
      </div>
    </>
  );
}

export default Home;
