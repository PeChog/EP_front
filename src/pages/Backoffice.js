import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Backoffice = ({ token }) => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [dataImage, setDataImage] = useState();
  const [dataDeleteImage, setdataDeleteImage] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/expositions");
      const responseImage = await axios.get("http://localhost:3000/image");

      //   const uploadImage = await axios.get("http://localhost:3000/upload/image");
      const deleteImage = await axios.get("http://localhost:3000/delete/image");

      //   const createExposition = await axios.get(
      //     "http://localhost:3000/create/exposition"
      //   );
      //   const deleteExposition = await axios.get(
      //     "http://localhost:3000/delete/exposition"
      //   );

      //   const uploadPdf = await axios.get("http://localhost:3000/upload/pdf");

      console.log(response.data);
      setDataImage(responseImage.data);
      setData(response.data);
      setdataDeleteImage(deleteImage);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de Chargement</span>
  ) : (
    <div>
      <button></button>
    </div>
  );
};

export default Backoffice;
