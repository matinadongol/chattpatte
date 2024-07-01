import React, {useState, useEffect, useContext} from "react";
import "./cartCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../../numberInput/NumberInput";
import { LoginContext } from "../../context/ContextProvider";

export default function CartCard({ item, onItemDelete }){
    const {account, setAccount} = useContext(LoginContext)
    const imagePath = `${process.env.PUBLIC_URL}/image/Item/${item.image}`
    const deleteItem  = async(req,res) => {
        try{
            const res = await fetch(`/removeItem/${item.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            //console.log("delete item data: ", data)
            if(res.status === 400 || !data){
                console.log("error while deleting item or no data")
            } else {
                setAccount(data)
                onItemDelete(item.id)
            }
        } catch (error){
            console.log("error while deleting items")
        }
    }
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
                <FontAwesomeIcon icon={faTimes} onClick={deleteItem}/>
            </div>
        </div>
    );
}