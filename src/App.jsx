import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRegisterResponse(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = (e) => {
    e.preventDefault();
    // Write your login code here
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // requiremqnt 3: save the JWT to local storage
          localStorage.setItem("jwt", data.token);

          // requirement 2: save the response in state using the `setLoginResponse` function.
          setLoginResponse(data);
        } else {
          console.error("Authentication failed:", data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />,
        ]}
      />

      {registerResponse && (
        <div>
          <p>ID: {registerResponse.id}</p>
          <p>Username: {registerResponse.username}</p>
          <p>Password: {registerResponse.password}</p>
        </div>
      )}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />,
        ]}
      />

      {loginResponse && (
        <div>
          <p>JWT: {loginResponse.token}</p>
        </div>
      )}
    </div>
  );
}
