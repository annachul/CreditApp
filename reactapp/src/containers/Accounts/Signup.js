import React, { useState } from "react";
import "./index.css";
import myConfig from "../../configs/config";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

export default function Register() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const history = useHistory();

  function formData() {
    const form_data = new FormData();

    form_data.append("username", username);
    form_data.append("password", password);
    form_data.append("firstName", firstName);
    form_data.append("lastName", lastName);

    return form_data;
  }

  function handleRegister(e) {
    e.preventDefault();


    let USER_URL = `${myConfig.CRU_URL}/api/auth/register/`;
    axios({
      baseURL: USER_URL,
      method: "POST",
      data: formData(),
    })
      .then((res) => {
        if (res.status === 201) {
          toast(`Success!`);
        }
        setTimeout(() => {
          history.push("/login/");
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        let error_msg = "";
        Object.keys(error.response.data).forEach(function (e) {
          error_msg += e + ": " + error.response.data[e][0] + " - ";
        });
        toast(error);
      });
  }

  return (
    <div className="login_content">
      <div className="content">
        <section className="">
          <h1 className="heading">Sign Up to CreditApp</h1>
        </section>
        <form onSubmit={handleRegister}>
          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="input"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="input"
          />

          <div className="input-group">
            <input
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
              type="text"
              className="input"
            />
          </div>

          <input
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            className="input"
          />
        <br/>
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="b366ff" />
            I already have an account
          </Link>
      <ToastContainer />
    </div>
  );
}
