import React, { useState } from "react";
import axios from 'axios';
import styles from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from '../../01_Netflix_Logo_RGB/Netflix_Logo_RGB.png';


export default function Navbar(){

    const links = [
        { name: "Home", link: "/app"},
        { name: "Movies", link: "/movies" },
        { name: "TV Shows", link: "/tvs" },
        { name: "My List", link: "/list" }
    ]
    
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(0);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSignout = () => {
        axios.get("https://netflix-clone-server-fi53.onrender.com/logout")
        navigate("/signup"); 
    }

    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar_link"]}>
                <Link to={`/app`} className={styles["navbar_link_logo"]} reloadDocument={true}>
                    <img src={logo}/>
                </Link>
                {links.map(({name, link}) => (
                    <div key={name} className={styles["navbar_link-1rem"]}>
                        <Link to={link} >{name}</Link>
                    </div>
                ))}
             </div>
            <div className={styles["navbar_user"]}>
                <div className={`${styles["searchbar"]} ${showSearch && styles["searchbar-visible"]}`}>
                    <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") navigate(`/query/${search}`)}}/>
                    <button onMouseOver={() => setShowSearch(1)} onClick={() => { if(search !== "") navigate(`/query/${search}`)}}> <FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </div>
                <button className={styles["navbar_user_icon"]} onClick={handleSignout}> <FontAwesomeIcon icon={faRightFromBracket} /></button>
            </div>
        </nav>
    )
}