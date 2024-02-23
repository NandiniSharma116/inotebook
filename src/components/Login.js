import React from "react";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjIxYjA2MmEyMDI4OGYxMjIxN2FkIn0sImlhdCI6MTcwODA3NTA1Nn0.fUuYPwsT0Y6LQ3sjV4tNX1McB0pPVjjmj9c0PjFPNu8",
          }});
    }
  return (
    <div className="container">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            name="email"
            id="email"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
          />
        </div>
        <button onSubmit={handleSubmit} type="submit" class="btn btn-warning text-white">
          <strong>Submit</strong>
        </button>
      </form>
    </div>
  );
};

export default Login;
