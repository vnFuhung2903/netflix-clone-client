import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import api_key from "../../api_key";
import styles from './VideoSwiper.module.scss';
import "swiper/css";
import "swiper/css/navigation";


const yt_url = `https://www.youtube.com/embed/`;
export default function VideoSwiper({ type, id }) {
    const videos_url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}`;
    const [videos, setVideos] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        fetch(videos_url)
        .then((res) => res.json())
        .then((res) => {
            setVideos(res.results)
        })
    }, [type, id])

    if(!videos || videos.length <= 2) {
        return (
            <div className={styles["card-grid"]}>
                {!videos || videos.map((video) => (
                    <div key={video.id} className={styles["video"]}>
                        <iframe src={yt_url + video.key} frameborder={0} allowFullScreen loading="lazy"></iframe>
                        <p>{video.name}</p>
                    </div>
                ))}
            </div>
        )
    }
    
    return (
        <div className={styles["slider"]}>
            <button className={styles["button-prev"]} onClick={() => swiperRef.current.slidePrev()}><FontAwesomeIcon icon={faChevronLeft}/></button>
            <Swiper
                onBeforeInit={(swiper) => swiperRef.current = swiper}
                modules={Navigation}
                slidesPerView={2.1}
                slidesPerGroup={1}
                navigation={{
                    prevEl: ".button-prev",
                    nextEl: ".button-next",
                }}
            >
                {videos.map((video) => (
                    <SwiperSlide key={video.id} className={styles["video"]}>
                        <iframe src={yt_url + video.key} frameborder={0} allowFullScreen loading="lazy"></iframe>
                        <p>{video.name}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className={styles["button-next"]} onClick={() => swiperRef.current.slideNext()}><FontAwesomeIcon icon={faChevronRight}/></button>
        </div>
)}