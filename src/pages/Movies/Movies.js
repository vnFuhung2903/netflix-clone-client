import React, { useEffect, useState } from "react";
import GenreList from "../../components/GenreList/GenderList";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Movies.module.scss";


const Movies = () => {
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`;
    
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
            <Navbar/>
            <div className={styles["block_title"]}>
                <h1>Movies</h1>
                <p>Movies move us like nothing else can, whether they’re scary, funny, dramatic, romantic or anywhere in-between. So many titles, so much to experience.</p>
            </div>

            {genreList.map(({id, name}) => (
                <>
                    <h4>{name} Movies</h4>
                    <GenreList type={"movie"} genre_id={id}/>
                </>
            ))}
            <Footer/>
        </>
    )
}

export default Movies;