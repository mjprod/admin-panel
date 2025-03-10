import AssetsPack from "../../util/AssetsPack";
import styles from "./Login.module.css";

const LoginPage = () => {
    return (
        <main className={styles["login-main"]}>
            <div className={styles["brain-container"]}>
                <img src={AssetsPack.logos.LOGIN_PAGE_LOGO.default} alt="Login Page Logo" className={styles["image-brain"]} />
                <h1 className={styles["login-title"]}>Login to Joker Ai Trainer</h1>
                <div className={styles["login-inputs"]}>
                    <form>
                        <div className={styles["form-group"]}>
                            <input type="text" className={styles["form-input"]} id="username" required />
                            <label className={styles["form-label"]} htmlFor="username">Username</label>
                        </div>
                        <div className={styles["form-group"]}>
                            <input type="password" className={styles["form-input"]} id="password" required />
                            <label className={styles["form-label"]} htmlFor="password">Password</label>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
                <button id={styles["forgot-password"]} >Forgot Details?</button>
            </div>
        </main>
    );
};

export default LoginPage;