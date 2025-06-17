import React, { useContext, useEffect, useState } from "react";
import AssetsPack from "../../util/AssetsPack";
import styles from "./Login.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showConsoleError } from "../../util/ConsoleMessage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, logout, authErrors, isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/newManager")
    }
  }, [isSignedIn, navigate])

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      navigate("/newManager");
    } else {
      showConsoleError("Login failed! Please try again.");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    logout();
    handleLogin();
  };

  return (
    <main className={styles["login-main"]}>
      <div className={styles["brain-container"]}>
        <img
          src={AssetsPack.logos.LOGIN_PAGE_LOGO.default}
          alt="Login Page Logo"
          className={styles["image-brain"]}
        />
        <h1 className={styles["login-title"]}>Login to Joker Ai Trainer</h1>
        <div className={styles["login-inputs"]}>
          <form>
            <div className={styles["form-group"]}>
              <input
                type="text"
                className={styles["form-input"]}
                id="username"
                required
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
              {!username && (
                <label className={styles["form-label"]} htmlFor="username">
                  Username
                </label>
              )}
            </div>
            <div className={styles["form-group"]}>
              <input
                type="password"
                className={styles["form-input"]}
                id="password"
                required
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              {!password && (
                <label className={styles["form-label"]} htmlFor="password">
                  Password
                </label>
              )}
            </div>
            {authErrors && <p className={styles['error-message']}>{authErrors.data.error}</p>}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <button id={styles["forgot-password"]}>Forgot Details?</button>
      </div>
    </main>
  );
};

export default LoginPage;
