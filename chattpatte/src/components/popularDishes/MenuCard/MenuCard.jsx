import React from "react";
import './menuCard.css';
import menuImg from "../../../image/Item/ItemImg1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function MenuCard(){
    return (
        <div className="menuCard_main">
            <div className="menuCardImage">
                <img src={menuImg} alt="salad"/>
            </div>
            <div className="menuCardDescription">
                <h6>Caesar Salda</h6>
                <p>salad with chicken mayo bread salad with chicken mayo bread</p>
                <div className="menuCardBottom">
                    <h6>$16</h6>
                    <div className="menuCardButton">
                        <FontAwesomeIcon icon={faHeart} className="menuCardIcon"/>
                        <FontAwesomeIcon icon={faShoppingCart} className="menuCardIcon"/>
                    </div>
                </div>
            </div>
        </div>
    );
}