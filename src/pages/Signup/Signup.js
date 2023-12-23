import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import styles from "./Signup.module.scss";
import background from "../../assets/Netflix-Signup.jpg";
import logo from "../../01_Netflix_Logo_RGB/Netflix_Logo_RGB.png";



export default function Signup(){
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:2903/signup", { email })
        .then(res => {
            if(res.data.message === "Signup success") {
                navigate("/register", { state: email });
            }
            else {
                setEmail("");
            }
        })
    }

    return(
        <>
            <div className={styles["background"]}>
                <img src={background}/>
            </div>
            <div className={styles["header"]}>
                <img src={logo}/>
                <div className={styles["header_button"]}>
                    <Link to="/login">Sign In</Link>
                </div>
            </div>
            <div className={styles["screen"]}>
                <div className={styles["card-flex-jcenter-acenter"]}>
                    <h1>Enjoy big movies, hit series and more.</h1>
                    <p>Join today. Cancel anytime.</p>
                    <p>Ready to watch? Enter your email to create or restart your membership</p>
                    <form onSubmit={handleSubmit}>
                    <div className={styles["card-flex-jcenter-acenter_inputs"]}>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            required
                            onChange={(e) => {setEmail(e.target.value);}}
                        />
                        <input
                            type="submit"
                            value="Get Started >"
                            className={styles["input-red"]}
                        />
                    </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}