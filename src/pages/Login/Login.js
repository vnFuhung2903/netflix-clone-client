import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.scss";
import background from "../../assets/Netflix-background.jpg";
import logo from "../../01_Netflix_Logo_RGB/Netflix_Logo_RGB.png";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://netflix-clone-server-fi53.onrender.com/login", { email, password })
        .then(res => {
            if(res.data.message === "Login success") {
                sessionStorage.setItem("token", res.data.token);
                navigate("/app");
            }
            else {
                setError(`*${res.data.message}`);
                setEmail("");
                setPassword("");
            }
        })
    }

    return (
        <>
            <div className={styles["background"]}>
                <img src={background}/>
            </div>
            <div className={styles["header"]}>
                <img src={logo}/>
            </div>
            <div className={styles["container"]}>
                <form onSubmit={handleSubmit}> 
                    <div className={styles["card-jcenter"]}>
                        <h1>Sign In</h1>
                        <p className={styles["card-jcenter_message"]}>
                            {error}
                        </p>
                        <div className={styles["card-jcenter_inputs"]}>
                            <input 
                                type="text" 
                                placeholder="Email or phone number" 
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["card-jcenter_submit"]}>
                            <input type="submit" value="Sign In" />
                        </div>
                        <div className={styles["card-jcenter-flex"]}>
                            <div className={styles["card-jcenter-flex_checkbox"]}>
                                <input type="checkbox" name="Remember-me"/>
                                <label>Remember me</label>
                            </div>
                            <a href="/">Need help?</a>
                        </div>
                        <div className={styles["link_signup"]}>
                            <span>New to Netflix?</span>
                            <Link to="/signup">Sign up now</Link>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    )
}