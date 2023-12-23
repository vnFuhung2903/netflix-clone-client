import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import api_key from "../../api_key";
import styles from "./GenreList.module.scss";
import "swiper/css";
import "swiper/css/navigation";


const image_url = 'https://image.tmdb.org/t/p/w300';

export default function GenreList({ type, genre_id }) {
    const genre_search_url = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&with_genres=${genre_id}`;
    
    const [list, setList] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        fetch(genre_search_url)
        .then((res) => res.json())
        .then((res) => setList(res.results))
    }, [genre_id])
    
    return(
    <div className={styles["slider"]}>
        <button className={styles["button-prev"]} onClick={() => swiperRef.current.slidePrev()}><FontAwesomeIcon icon={faChevronLeft}/></button>
        <Swiper
            onBeforeInit={(swiper) => swiperRef.current = swiper}
            modules={Navigation}
            slidesPerView={4.5}
            slidesPerGroup={4}
            navigation={{
                prevEl: ".button-prev",
                nextEl: ".button-next",
                disabledClass: ".disabled"
            }}
        >
            {list.map((movie) => (
                <SwiperSlide key={movie.title}>
                    <Link to={`/${type}/${movie.id}`} className={styles["slider_movie"]}>
                        <img src={image_url + movie.backdrop_path}/>
                        <p>{movie.title || movie.name}</p>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
        <button className={styles["button-next"]} onClick={() => swiperRef.current.slideNext()}><FontAwesomeIcon icon={faChevronRight}/></button>
    </div>

)}