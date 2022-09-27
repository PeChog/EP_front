import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://eliottp-backend.herokuapp.com/auth",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        handleToken(response.data.token);

        navigate("/backoffice");
      } else if (response.data.message) {
        setErrorMessage(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="containerLogin">
      <form onSubmit={handleLogin}>
        <h1 className="login">Login</h1>
        {errorMessage ? (
          <div>
            <p style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              {errorMessage}
            </p>
          </div>
        ) : null}

        <input
          value={email}
          placeholder="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="email"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="password"
        />
        <br />
        <input type="submit" value="Se connecter" className="seConnecter" />
        <br />
      </form>
    </div>
  );
};

export default Login;
