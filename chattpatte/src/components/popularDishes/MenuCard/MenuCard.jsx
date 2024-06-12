import React from "react";
import './menuCard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function MenuCard({item}){
    return (
        <div className="menuCard_main">
            <div className="menuCardImage">
                <img src={`../../image/Item/${item.image}`} alt="salad"/>
            </div>
            <div className="menuCardDescription">
                <h6>{item.itemName}</h6>
                <p>{item.description}</p>
                <div className="menuCardBottom">
                    <h6>${item.originalPrice}</h6>
                    <div className="menuCardButton">
                        <FontAwesomeIcon icon={faHeart} className="menuCardIcon"/>
                        <Link 
                            to={`/getItemsByID/${item.id}`} 
                            state={{ item }} 
                            className="menuCardLink"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="menuCardIcon"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}