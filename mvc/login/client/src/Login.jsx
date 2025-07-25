import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const login = async () => {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  const getProtectedData = async () => {
    const res = await fetch("/protected", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    setMessage(data.message || "Unauthorized");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Simple JWT Auth</h1>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={getProtectedData}>Access Protected Route</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
