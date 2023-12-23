import React, { useEffect, useState } from "react";
import api_key from "../../api_key";
import styles from "./TVSeason.module.scss";


const image_url = 'https://image.tmdb.org/t/p/original';
export default function TVSeason({ season_nth, id }) {
    const videos_url = `https://api.themoviedb.org/3/tv/${id}/season/${season_nth}?api_key=${api_key}`;
    const [episodes, setEpisodes] = useState([]);
    const [overview, setOverview] = useState("");
    const [release_year, setRelease_year] = useState("");

    useEffect(() => {
        fetch(videos_url)
        .then((res) => res.json())
        .then((res) => {
            setEpisodes(res.episodes);
            setOverview(res.overview);
            setRelease_year(res.air_date);
        })
    }, [season_nth, id])

    return (
        <>
            <div className={styles["text"]}>
                <div>Release year: {release_year}</div>
                <p>{ overview }</p>
            </div>
            <div className={styles["card-grid"]}>
                {episodes.map((episode) => (
                    <div className={styles["card-grid_detail"]}>
                        <img src={image_url + episode.still_path} />
                        <h1>
                            <span>{episode.episode_number}. {episode.name}</span>
                            <span className={styles["-gray"]}>{episode.runtime}M</span>
                        </h1>
                        <p>{episode.overview}</p>
                    </div>
                ))}
            </div>
        </>
    )
        
}