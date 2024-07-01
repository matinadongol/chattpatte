import React, {useState, useEffect} from "react";
import "./cartDetails.css";
import CartCard from "./cartCard/CartCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";

export default function CartDetails(){
    const [cartData, setCartData] = useState([])
    //console.log("cartData: ", cartData)

    const getBuyer = async() => {
        const res = await fetch("/cartDetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if(res.status !== 201){
            console.log("getBuyer error")
        } else {
            setCartData(data.carts)
        }
    }
    const calculateSubTotal = () => {
        return cartData.reduce((acc, item) => acc + parseFloat(item.currentPrice), 0).toFixed(2);
    }
    const handleItemDelete = (id) => {
        setCartData(cartData.filter(item => item.id !== id));
    }
    useEffect(()=> {
        getBuyer()
    }, [])
    return (
        <div className="CartDetails_Main">
            <h1 className="cartDetails_Heading">Cart Details</h1>
            {cartData.map((item, index)=>{
                return (
                    <CartCard key={index} item={item} onItemDelete={handleItemDelete}/>
                )
            })}
            
            <h2 className="subTotal">
                Subtotal: &nbsp;
                <span>${calculateSubTotal()}</span>
            </h2>
            <button className="greenbutton">
                Checkout 
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
}