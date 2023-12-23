import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import styles from './Footer.module.scss';

export default function Footer()
{
    return (
        <div className={styles["footer"]}>
            <h3>Contact Me:</h3>
            <div className={styles["footer_link"]}>
                <a href="https://www.facebook.com/its.fuhung" target="_blank">
                    <FontAwesomeIcon icon={faSquareFacebook} className={styles["footer_link_icon"]}/>
                </a>

                <a href="https://www.instagram.com/fus_hwng" target="_blank">
                    <FontAwesomeIcon icon={faSquareInstagram} className={styles["footer_link_icon"]}/>
                </a>

                <a href="https://github.com/vnFuhung2903" target="_blank">
                    <FontAwesomeIcon icon={faSquareGithub} className={styles["footer_link_icon"]}/>
                </a>
            </div>  
        </div>
    )
} 