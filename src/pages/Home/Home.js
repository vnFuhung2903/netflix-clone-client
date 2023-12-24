import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.scss";
import "swiper/css";
import "swiper/css/navigation";


const image_url = 'https://image.tmdb.org/t/p/w300';

export default function Home()
{    
    const routeList = [
        {
            "name": "Movies",
            "path": "/movies",
            "color": "red"
        },
        
        {
            "name": "TV Shows",
            "path": "/tvs",
            "color": "green"
        },
        
        {
            "name": "My List",
            "path": "/list",
            "color": "blue"
        }
    ]
    
    const [chosen, setChosen] = useState("");
    const [recently, setRecently] = useState([]);
    const swiperRef = useRef();
    const navigate = useNavigate();

    const scale = window.screen.availWidth / 300;
    
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("https://netflix-clone-server-fi53.onrender.com/recently")
        .then(res => {
            if(res.data.message === "Unauthorized") {
                console.log(res.data.message);
                navigate("/signup");
            }
            else {
                setRecently(res.data.recently);
            }
        })
    }, [])

    
    return (
        <>
            <Navbar/>
            <div className={styles["container-grid"]}>
                <div className={styles["container-grid-2col"]}>
                    <h1>Only on Netflix</h1>
                    <p>Netflix is the home of amazing original programming that you can't find anywhere else. Movies, TV shows, specials and more, all tailored and specifically to you.</p>
                </div>
                <div className={styles["container-grid-right-grid"]}>
                    {routeList.map(({name, path, color}) => (
                            <Link to={path} className={`${styles["route"]} ${styles[`${color}`]} ${chosen === name && styles["chosen"]}`} onMouseOver={() => {setChosen(name)}} onMouseLeave={() => {setChosen("")}}>{name}</Link>
                    ))}
                </div>
            </div>

            <h4>Recently watched</h4>
            { recently.length <= 4 && scale > 4.5 ? 
            <div className={styles["card-grid"]}>
                {!recently || recently.map((movie) => (
                    <Link to={`/${movie.type}/${movie.feature.id}`} key={movie.feature.id} className={styles["feature"]}>
                        <img src={image_url + movie.feature.backdrop_path}/>
                        <p>{ movie.feature.title || movie.feature.name }</p>
                    </Link>
                ))}
            </div> :  

            <div className={styles["slider"]}>
                <button className={styles["button-prev"]} onClick={() => swiperRef.current.slidePrev()}><FontAwesomeIcon icon={faChevronLeft}/></button>
                <Swiper
                    onBeforeInit={(swiper) => swiperRef.current = swiper}
                    modules={Navigation}
                    slidesPerView={Math.min(4.5, Math.max(scale - 0.5, 1))}
                    slidesPerGroup={Math.min(4, Math.floor(Math.max(scale - 0.5, 1)))}
                    navigation={{
                        prevEl: ".button-prev",
                        nextEl: ".button-next",
                    }}
                >
                    { recently.map((movie) => (
                        <SwiperSlide key={movie.feature.id}>
                            <Link to={`/${movie.type}/${movie.feature.id}`} className={styles["slider_movie"]}>
                                <img src={image_url + movie.feature.backdrop_path}/>
                                <p>{movie.feature.title || movie.feature.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className={styles["button-next"]} onClick={() => swiperRef.current.slideNext()}><FontAwesomeIcon icon={faChevronRight}/></button>
            </div> }
            <Footer/>
        </>
    )
}