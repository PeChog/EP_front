import axios from "axios";
import { useEffect, useState } from "react";
// import ReactSimplyCarousel from "react-simply-carousel";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
function Home() {
  const [data, setData] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sensDefilementImage, setSensDefilementImage] = useState(true);
  const instaURL = `//www.instagram.com/eliott_paquet/`;

  const [modalContact, setModalContact] = useState(false);

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
  return (
    <>
      {modalContact ? (
        <div className="modal">
          <div style={{}}>
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
      ) : null}

      <div className="container" style={{ opacity: modalContact ? 0.3 : 1 }}>
        <div className="header">
          <div className="eliott">
            <img
              className="logo1"
              onClick={() => {
                setModalContact(false);
              }}
              alt="logo"
              src={Logo}
            />
          </div>

          <div className="info">
            <div
              className="contactDiv"
              onClick={() => {
                setModalContact(true);
                console.log("click");
              }}
            >
              cntct
            </div>
            <a
              href={"https://eliottp-backend.herokuapp.com/download/pdf"}
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
          </div>
        </div>
        <div
          className="main"
          onClick={() => {
            setModalContact(false);
          }}
        >
          <div className="contenuHome">
            <div className="expositions">
              {data
                .sort((a, b) => a.exposition_index - b.exposition_index)
                .map((exposition) => {
                  return (
                    <div className="list">
                      <div
                        key={exposition._id}
                        className="date"
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        {exposition.expo_date}
                      </div>
                      <div className="description">
                        {exposition.expo_description}
                      </div>
                    </div>
                  );
                })}
            </div>
            <img
              src={require("../../assets/images/Gribouillis.png")}
              alt="gribouillis"
              style={{ width: "926px", height: "675px" }}
              className="gribouillis"
            ></img>
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
          </div>
        </div>
        <img
          src={require("../../assets/images/scroll-down-icon-16.jpeg")}
          alt="scrollDown"
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "175px",
            marginTop: "-10px",
          }}
          className="scrollDown"
        ></img>
      </div>
    </>
  );
}

export default Home;
