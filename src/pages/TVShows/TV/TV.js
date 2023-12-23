import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAdd, faCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import VideoSwiper from "../../../components/VideoSwiper/VideoSwiper";
import TVSeason from "../../../components/TVSeason/TVSeason";
import api_key from "../../../api_key";
import styles from './TV.module.scss';
import "swiper/css";
import "swiper/css/navigation";

const image_url = 'https://image.tmdb.org/t/p/original';

export default function TV() {
    const { id } = useParams();
    const token = sessionStorage.getItem("token");
    
    const details_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`;
    const credits_url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}`;
    const recommendations_url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}`;
    
    const [TV, setTV] = useState({});
    const [last_air_year, setLast_air_year] = useState("");
    const [Casts, setCasts] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [num_of_ss, setNum_of_ss] = useState([]);
    const [season, setSeason] = useState(1);
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();
    if(!token)  navigate("/signup");

    useEffect(() => {
        fetch(details_url)
        .then(res => res.json())
        .then(tv => {
            setTV(tv);
            setLast_air_year(tv.last_air_date.slice(0, 4));
            const temp = []
            for (let i = 0; i < tv.number_of_seasons; i++) 
            if(temp.length < tv.number_of_seasons)
                temp.push(i + 1);
            setNum_of_ss(temp)
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
        axios.get(`http://localhost:4000/list/${token}/tv/${id}`)
        .then(res => {
            setAdded(res.data.in_list);
        })
    }, [added])

    const AddtoWatchList = () => {
        const type = "tv";
        const feature = TV;
        axios.post(`http://localhost:4000/list`, { token, type, feature })
        .then((res) => {
            setAdded(res.data.in_list);
        })
    }

    const Watch = () => {
        const type = "tv";
        const feature = TV;
        axios.post(`http://localhost:4000/recently`, { token, type, feature })
    }

    if(Object.keys(TV).length === 0 || Casts.length === 0 || num_of_ss.length === 0) return(<></>)

    return (
        <>
            <Navbar token={token}/>
            <div className={styles["container"]}>
                <img src={image_url + TV.backdrop_path}/>
                <div className={styles["container-grid"]}>
                    <div></div>
                    <div>
                        <h3>{TV.name}</h3>
                        <p className={styles["_details"]}>{last_air_year} | {TV.number_of_num_of_ss} Seasons | {TV.genres[0].name}</p>
                        <p>{TV.overview}</p>
                        <span className={styles["_details"]}>Starring: </span>
                        {Casts.slice(0, 3).map((actor) => (
                            <span key={actor.name}>{actor.name}, </span>
                        ))}
                        <span>...</span>
                        <div className={styles["_button"]}>
                            <button className={styles["_button-red"]} onClick={Watch}><FontAwesomeIcon icon={faPlay}/> PLAY</button>
                            <button className={styles["_button-transparent"]} onClick={AddtoWatchList}> { added ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faAdd}/> } MY LIST</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["container_sub"]}>
                <h1><span>Videos |</span> <span className={styles["-gray"]}> {TV.name}</span></h1>
                <VideoSwiper type={"tv"} id={id}/>

                <h1><span>Episodes |</span> <span className={styles["-gray"]}> {TV.name}</span></h1>
                <select className={styles["select"]} defaultValue={0} onChange={(e) => setSeason(e.target.value)}>
                    {num_of_ss.length === 0 || num_of_ss.map((season) => {
                        return (
                            <option value={season} key={season}>Season {season}</option>
                        )
                    })}
                </select>
                <TVSeason season_nth={season} id={id}/>

                <h1>More Details</h1>
                <p>Genres</p>
                <div className={styles["container_sub-grid-6col"]}>
                    {TV.genres.map(({id, name}) => (
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
                    {recommended.slice(0, 12).map((tv) => (
                        <Link to={`/tv/${tv.id}/${token}`} key={tv.id}>
                            <img src={image_url + tv.poster_path}/>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
};