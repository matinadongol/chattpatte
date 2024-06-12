import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import About from '../about/about';
import PopularDishes from '../popularDishes/PopularDishes';
import ReserveTable from '../reserveTable/ReserveTable';

export default function Home(){
    const imagePath = `${process.env.PUBLIC_URL}/image/salad.png`;
    return (
        <>
            <div className="home_main">
                <div className="home_leftSection">
                    <div className="home_img">
                        <img src={imagePath} alt="salad"/>
                    </div>
                </div>
                <div className="home_rightSection">
                    <h1>We serve the taste you love</h1>
                    <p>This is a restaurant which serves food and drinks, I dont know what to write in this. But I have to write something so here it is and I go on and on.</p>
                    <div className="buttonDiv">
                        <button className="greenbutton">Explore Food <FontAwesomeIcon icon={faArrowRight} /></button>
                        <button className="lightbutton">Reserve a seat</button>
                    </div>
                    
                </div>
            </div>
        <About/>
        <PopularDishes/>
        <ReserveTable/>
      </>
    );
}