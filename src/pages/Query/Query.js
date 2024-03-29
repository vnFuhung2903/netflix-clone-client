import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Query.module.scss";


const image_url = 'https://image.tmdb.org/t/p/original';

const Query = () => {
    const { search } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [tvList, setTVList] = useState([]);

    const search_movie_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`;
    const search_tv_url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`;

    useEffect(() => {
        fetch(search_movie_url)
        .then(res => res.json())
        .then(res => {
            setMovieList(res.results);
        })
    }, [search])

    useEffect(() => {
        fetch(search_tv_url)
        .then(res => res.json())
        .then(res => {
            setTVList(res.results);
        })
    }, [search])
    
    if(!movieList)   return (<></>)

    return (
        <>
            <Navbar/>
            <h1>Searched for {search}</h1>
            <div className={styles["container-grid-6col"]}>
                {movieList.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <img src={image_url + movie.poster_path}/>
                        <p>{ movie.title }</p>
                    </Link>
                ))}

                {tvList.map((tv) => (
                    <Link to={`/tv/${tv.id}`} key={tv.id}>
                        <img src={image_url + tv.poster_path}/>
                        <p>{ tv.name }</p>
                    </Link>
                ))}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default Query;