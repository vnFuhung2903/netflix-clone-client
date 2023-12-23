import React, { useEffect, useState } from "react";
import GenreList from "../../components/GenreList/GenderList";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./TVs.module.scss";


const TVs = () => {
    const token = sessionStorage.getItem("token");
    const genre_url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}`;
    
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
                <h1>TV Shows</h1>
                <p>These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best programs on TV.</p>
            </div>

            {genreList.map(({id, name}) => (
                <>
                    <h4>{name} TV Shows</h4>
                    <GenreList type={"tv"} genre_id={id} token={token} />
                </>
            ))}
            <Footer/>
        </>
    )
}

export default TVs;