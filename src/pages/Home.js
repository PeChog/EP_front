import axios from "axios";
import { useEffect, useState } from "react";
// import ReactSimplyCarousel from "react-simply-carousel";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState();
  const [dataImage, setDataImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/expositions");
      const responseImage = await axios.get("http://localhost:3000/image");
      console.log(responseImage.data);
      console.log(response.data);
      setData(response.data);
      setDataImage(responseImage.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="container">
      <div className="header">
        <h1 className="logo">Eliott Paquet</h1>
        <div className="info ">
          <div>DWNLD PDF</div>
          <div>CONTACT</div>
        </div>
      </div>
      <div className="main">
        <div className="expositions">
          <div className="collectives">Expositions Collectives</div>
          {data.map((exposition) => {
            return (
              <div className="list">
                <div key={exposition._id} className="date">
                  {exposition.expo_date}
                </div>
                <div className="description">{exposition.expo_description}</div>
              </div>
            );
          })}
        </div>
        <div className="caroussel">
          {dataImage.map((image) => {
            return (
              <img
                alt={image._id}
                src={image.image}
                className="carousselImage"
              ></img>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
