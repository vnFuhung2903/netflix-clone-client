import React, { useState } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import logo from "../../../01_Netflix_Logo_RGB/Netflix_Logo_RGB.png";

export default function Register() {
    const email = useLocation().state;
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://netflix-clone-server-fi53.onrender.com/register", { email, password, phone, name })
        .then((res) => {
            navigate("/app");
        })
    }

    return (
        <>
            <div className={styles["header"]}>
                <img src={logo}/>
                <div className={styles["header_button"]}>
                    <Link to="/login">Sign In</Link>
                </div>
            </div>
            <div className={styles["container"]}>
                <form onSubmit={handleSubmit}>
                <div className={styles["card-jcenter"]}>
                    <h1>Joining Netflix is easy.</h1>
                    <p>Enter your infomation and you'll be watching in no time.</p>
                    <div>
                        <p>Email</p>
                        <p className={styles["p-bold"]}> {email} </p>
                    </div>
                    <input
                        type="password"
                        placeholder="Enter your password" 
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter your name" 
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter your phone number" 
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Sign up"
                        className={styles["input-bgred"]}
                    />
                </div>
                </form>
            </div>
        </>
    )
}