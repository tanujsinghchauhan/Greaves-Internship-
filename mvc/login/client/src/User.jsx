import { useState } from "react";

const userCredentials = [
  { id: "user1", password: "pass1", name: "A" },
  { id: "user2", password: "pass2", name: "B" },
];

const adminCredentials = [
  { id: "admin1", password: "adminpass", name: "Admin A" },
];

function User() {
  const [role, setRole] = useState(null);
  const [loginData, setLoginData] = useState({ id: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const creds = userCredentials;
    const found = creds.find(
      (user) => user.id === loginData.id && user.password === loginData.password
    );

    if (found) {
      setRole("user");
      setCurrentUser(found);
      setError("");
    } else {
      const creds2 = adminCredentials;
      const found2 = creds2.find(
        (user) =>
          user.id === loginData.id && user.password === loginData.password
      );
      if (found2) {
        setRole("admin");
        setCurrentUser(found2);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  const handleLogout = () => {
    setRole(null);
    setLoginData({ id: "", password: "" });
    setCurrentUser(null);
    setError("");
  };

  if (!role) {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={loginData.id}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <br />
        <button onClick={() => handleLogin()}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>
        Welcome, {currentUser.name} ({role})
      </h2>
      <button onClick={handleLogout}>Logout</button>

      {role === "admin" && (
        <div>
          <h3>All Users:</h3>
          <ul>
            {userCredentials.map((user) => (
              <li key={user.id}>
                {user.name} - {user.id}
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === "user" && (
        <p>You are logged in as a user. You do not have access to user data.</p>
      )}
    </div>
  );
}

export default User;
