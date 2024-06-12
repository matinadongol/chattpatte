import React from "react";
import "./reserveTable.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ReserveTable(){
    const imagePath1 = `${process.env.PUBLIC_URL}/image/background1.png`;
    const imagePath2 = `${process.env.PUBLIC_URL}/image/background2.png`;
    return (
        <>
            <div className="reserveTable_main">
                <div className="reserveTable_imageTop">
                    <img src={imagePath1} alt="tomato, mint, cloves"/>
                </div>
                <div className="reserveTable_imageBottom">
                    <img src={imagePath2} alt="tomato, mint, cloves"/>
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