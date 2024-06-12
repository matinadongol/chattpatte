import React from "react";
import "./about.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function About(){
    const imagePath = `${process.env.PUBLIC_URL}/image/aboutImg.png`;
    return (
        <>
            <div id="about_main">
                <div className="about_leftSection">
                    <h1>about Us</h1>
                    <p>This is a restaurant which serves food and drinks, I dont know what to write in this. But I have to write something so here it is and I go on and on. This is a restaurant which serves food and drinks, I dont know what to write in this. But I have to write something so here it is and I go on and on.</p>
                    <div className="about_buttonDiv">
                        <button className="greenbutton">Get Direction <FontAwesomeIcon icon={faArrowRight} /></button>
                    </div>
                </div>
                <div className="about_rightSection">
                    <div className="about_img">
                        <img src={imagePath} alt="salad"/>
                    </div>
                </div>
            </div>
            
        </>
    );
}