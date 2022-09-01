import { useNavigate, Link } from "react-router-dom";

const BackofficeHome = ({ handleToken }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="headerBack">
        <Link to={"/"} className="retourSite">
          Retour sur le site
        </Link>
        <h1 className="backOfficeTitle">BackOffice</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "1230px",
          margin: "auto",
        }}
      >
        <Link className="expositionsBack" to={"/CrudExpositions"}>
          Expositions
        </Link>

        <Link className="imagesBack" to={"/CrudImages"}>
          Images
        </Link>

        <Link className="addPdfBack" to={"/addPdf"}>
          PDF
        </Link>
      </div>
    </div>
  );
};

export default BackofficeHome;
