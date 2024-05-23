import React from "react";
import "./reserveTable.css";
import backgroundImage1 from '../../image/background1.png';
import backgroundImage2 from '../../image/background2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ReserveTable(){
    return (
        <>
            <div className="reserveTable_main">
                <div className="reserveTable_imageTop">
                    <img src={backgroundImage1} alt="tomato, mint, cloves"/>
                </div>
                <div className="reserveTable_imageBottom">
                    <img src={backgroundImage2} alt="tomato, mint, cloves"/>
                </div>
                <div className="reserveTable_Box">
                    <h1>Reserve a table</h1>
                    <div className="reserveTable_Form">
                        <div className="reserveTable_FormSection">
                            <h6>Date</h6>
                            <input type="date"/>
                        </div>
                        <div className="reserveTable_FormSection">
                            <h6>Time</h6>
                            <input type="time"/>
                        </div>
                        <div className="reserveTable_FormSection">
                            <h6>Seat</h6>
                            <input type="number"/>
                        </div>
                    </div>
                    <div className="buttonDiv">
                        <button className="greenbutton">
                            Check Availability <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}