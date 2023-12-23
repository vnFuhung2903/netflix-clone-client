import React, { useEffect, useState } from "react";
import axios from "axios";
import GenreList from "../../components/GenreList/GenderList";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import api_key from "../../api_key";
import styles from "./Movies.module.scss";


const Movies = () => {
    const token = sessionStorage.getItem("token");
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
    
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch(genre_url)
        .then(res => res.json())
        .then(res => {
            setGenreList(res.genres);
        })
    }, [])

    return (
        <>
            <Navbar token={token}/>
            <div className={styles["block_title"]}>
                <h1>Movies</h1>
                <p>Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
            </div>

            {genreList.map(({id, name}) => (
                <>
                    <h4>{name} Movies</h4>
                    <GenreList type={"movie"} genre_id={id} token={token} />
                </>
            ))}
            <Footer/>
        </>
    )
}

export default Movies;