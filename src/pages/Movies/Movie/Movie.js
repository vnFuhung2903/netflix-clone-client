import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAdd, faCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import VideoSwiper from "../../../components/VideoSwiper/VideoSwiper";
import styles from './Movie.module.scss';


const image_url = 'https://image.tmdb.org/t/p/original';


export default function Movie() {
    const { id } = useParams();
    const token = sessionStorage.getItem("token");
    
    const details_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const credits_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
    const recommendations_url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`;
    
    const [Movie, setMovie] = useState({});
    const [release_year, setRelease_year] = useState("");
    const [Casts, setCasts] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();
    if(!token)  navigate("/signup");

    useEffect(() => {
        fetch(details_url)
        .then(res => res.json())
        .then(movie => {
            setMovie(movie);
            setRelease_year(movie.release_date.slice(0, 4));
        })
    }, [id]);

    useEffect(() => {
        fetch(credits_url)
        .then(res => res.json())
        .then(res => {
            setCasts(res.cast);
        })
    }, [id]);

    useEffect(() => {
        fetch(recommendations_url)
        .then(res => res.json())
        .then(res => {
            setRecommended(res.results);
        })
    }, [id])

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`http://localhost:2903/list/${token}/movie/${id}`)
        .then(res => {
            setAdded(res.data.in_list);
        })
    }, [id, token, added])

    const AddtoWatchList = () => {
        const type = "movie";
        const feature = Movie;
        axios.post(`http://localhost:2903/list`, { token, type, feature })
        .then((res) => {
            console.log(res.data.in_list);
            setAdded(res.data.in_list);
        })
    }

    const Watch = () => {
        const type = "movie";
        const feature = Movie;
        axios.post(`http://localhost:2903/recently`, { token, type, feature })
    }

    if(!Movie || !Casts || !Movie.genres) return(<></>)

    return (
        <>
            <Navbar token={token}/>
            <div className={styles["container"]}>
                <img src={image_url + Movie.backdrop_path}/>
                <div className={styles["container-grid"]}>
                    <div></div>
                    <div>
                        <h3>{Movie.title}</h3>
                        <p className={styles["_details"]}>{release_year} | {Movie.runtime}m | {Movie.genres[0].name}</p>
                        <p>{Movie.overview}</p>
                        <span className={styles["_details"]}>Starring: </span>
                        {Casts.slice(0, 3).map((actor) => (
                            <span key={actor.name}>{actor.name}, </span>
                        ))}
                        <span>...</span>
                        <div className={styles["_button"]}>
                            <button className={styles["_button-red"]} onClick={Watch}> <FontAwesomeIcon icon={faPlay}/> PLAY</button>
                            <button className={styles["_button-transparent"]} onClick={AddtoWatchList}> { added ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faAdd}/> } MY LIST</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["container_sub"]}>
                <h1><span>Videos |</span> <span className={styles["-gray"]}> {Movie.title}</span></h1>
                <VideoSwiper type={"movie"} id={id}/>

                <h1>More Details</h1>
                <p>Genres</p>
                <div className={styles["container_sub-grid-6col"]}>
                    {Movie.genres.map(({id, name}) => (
                        <span key={id}>{name}</span>
                    ))}
                </div>

                <p>Cast</p>
                <div className={styles["container_sub-grid-6col"]}>
                    {Casts.slice(0, 20).map((actor) => (
                        <span key={actor.name}>{actor.name}</span>
                    ))}
                </div>

                <h1>More like this</h1>
                <div className={styles["container_sub-grid-6col"]}>
                    {recommended.slice(0, 12).map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <img src={image_url + movie.poster_path}/>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
};