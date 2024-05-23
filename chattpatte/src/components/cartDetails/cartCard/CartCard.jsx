import React from "react";
import "./cartCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../../numberInput/NumberInput";
import ItemImg from "../../../image/Item/ItemImg1.png";

export default function CartCard(){
    return (
        <div className="cartCard_Main">
            <div className="cartCard_Img">
                <img src={ItemImg} alt="mixed salad"/>
            </div>
            <div className="cartCard_Description">
                <h1>Mixed Salad</h1>
                <p>Added: eggs, Chicken, olives,
                    tomatoes, onion, green beans.Added: eggs, Chicken, olives,
                    tomatoes, onion, green beans.Added: eggs, Chicken, olives,
                    tomatoes, onion, green beans.
                </p>
            </div>
            <div className="cartCard_Quantity">
                <NumberInput/>
            </div>
            <div className="cartCard_Price">
                <h6>$16</h6>
            </div>
            <div className="cartCard_Button">
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    );
}