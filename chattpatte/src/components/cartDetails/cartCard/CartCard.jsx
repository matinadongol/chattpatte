import React from "react";
import "./cartCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../../numberInput/NumberInput";

export default function CartCard({ item }){
    const imagePath = `${process.env.PUBLIC_URL}/image/Item/${item.image}`;
    return (
        <div className="cartCard_Main">
            <div className="cartCard_Img">
                <img src={imagePath} alt="mixed salad"/>
            </div>
            <div className="cartCard_Description">
                <h1>{item.itemName}</h1>
                <p>Added: {item.description}
                </p>
            </div>
            <div className="cartCard_Quantity">
                <NumberInput/>
            </div>
            <div className="cartCard_Price">
                <h6>${item.currentPrice}</h6>
            </div>
            <div className="cartCard_Button">
                <FontAwesomeIcon icon={faTimes}/>
            </div>
        </div>
    );
}