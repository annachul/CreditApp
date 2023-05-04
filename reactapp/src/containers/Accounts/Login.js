import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import "./index.css";
import myConfig from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  function formData() {
    const form_data = new FormData();

    form_data.append("username", username);
    form_data.append("password", password);

    return form_data;
  }

  function handleSave(e) {
    e.preventDefault();

    const LOGIN_URL = `${myConfig.CRU_URL}/api/auth/login/`;

    axios({
      baseURL: LOGIN_URL,
      method: "POST",
      data: formData(),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          localStorage.setItem("user-token", res.data.token);
          console.log(localStorage.getItem("user-token"))
          toast("Success.");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        toast("Invalid login or password.");
      });
  }

  return (
    <div className="login_content">
      <section className="form">
        <form onSubmit={handleSave}>
          <h1 className="heading">Login to CreditApp</h1>

          <input
            value={username}
            name="username"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
            type="text"
            className="input"
          />
          <br />
          <input
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
          />
          <br />
          <button className="button" type="submit">
            Login
          </button>
          <br />
          <Link to="/signup" className="back-link">
            <FiLogIn size={16} color="b366ff" />
            Sign Up
          </Link>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Login;
