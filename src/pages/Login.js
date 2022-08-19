import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3000/auth", {
        email,
        password,
      });
      handleToken(response.data.token);
      navigate("/auth");

      // console.log(response.data);
      // if (response.data.token) {
      //   // setUser(response.data.token);
      //   // redirection
      //   navigate("/backoffice");
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="containerLogin">
      <form onSubmit={handleLogin}>
        <h1 className="login">Login</h1>
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
