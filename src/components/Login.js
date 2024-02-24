import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const json = await response.json();
      if (json.success)
      {
        //Save the auth-token and redirect
        localStorage.setItem('token', json.authToken);
        history("/");
        props.changeAlert("Successfully Logged in to your account", "success")
      }
      else
      {
        props.changeAlert("Entered credentials are wrong", "danger");
      }
    } catch (error) {
      props.changeAlert("Error during fetch", "danger");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }
  return (
    <>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          value={email}
            onChange={handleChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          value={password}
            onChange={getPassword}
            type="password"
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-warning text-white mt-3">
          <strong>Submit</strong>
        </button>
      </form>
    </>
  );
};

export default Login;
