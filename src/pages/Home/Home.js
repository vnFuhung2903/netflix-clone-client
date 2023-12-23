import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate} from "react-router-dom";
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
    const token = sessionStorage.getItem("token");
    
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
    if(!token) navigate("/signup");
    
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get(`http://localhost:4000/recently/${token}`)
        .then(res => {
            setRecently(res.data.recently);
        })
    }, [token])

    
    return (
        <>
            <Navbar token={token}/>
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
            { recently.length <= 4 ? 
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
                    modules={Navigation}
                    slidesPerView={4.5}
                    slidesPerGroup={1}
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
                <button className={styles["button-next"]} onClick={() => swiperRef.current.slideNext()}><FontAwesomeIcon icon={faChevronRight}/></button>
                </Swiper>
            </div> }
            <Footer/>
        </>
    )
}