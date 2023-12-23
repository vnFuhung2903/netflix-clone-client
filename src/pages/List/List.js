import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./List.module.scss";


const image_url = 'https://image.tmdb.org/t/p/original';

const List = () => {
    const token = sessionStorage.getItem("token");
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`https://netflix-clone-server-fi53.onrender.com/list`)
        .then(res => {
            if(res.data.message === "Unauthorized") {
                navigate("/signup");
            }
            else {
                setList(res.data.list);
            }
        })
    }, [token])
    
    return (
        <>
            <Navbar/>
            <h1>My List</h1>
            <div className={styles["container-grid-6col"]}>
                {list.map((movie) => (
                    <Link to={`/${movie.type}/${movie.feature.id}`} key={movie.feature.id}>
                        <img src={image_url + movie.feature.poster_path}/>
                        <p>{ movie.feature.title || movie.feature.name }</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default List;