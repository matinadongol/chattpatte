import React from "react";
import "./cartDetails.css";
import CartCard from "./cartCard/CartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

export default function CartDetails(){
    const {id} = useParams("")
    console.log("cartDetails: ", id)
    return (
        <div className="CartDetails_Main">
            <h1 className="cartDetails_Heading">Cart Details</h1>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <h2 className="subTotal">
                Subtotal: &nbsp;
                <span>$100.34</span>
            </h2>
            <button className="greenbutton">
                Checkout 
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}