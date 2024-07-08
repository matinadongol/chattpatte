import React, { useEffect } from "react";
import "./Menu.css";
import MenuCard from "../popularDishes/MenuCard/MenuCard";
import {getItems} from "../../redux/actions/action.js"
import { useDispatch, useSelector } from "react-redux";

export default function Menu() {
  const {items} = useSelector(state => state.getItemsData);
    //console.log("poppular dishes: ", items);

    const dispatch = useDispatch()

    useEffect(()=> {
      dispatch(getItems())
    }, [dispatch])
  return (
    <>
      <div className="menuHeading">
        <h1>Menu</h1>
      </div>
      <div className="menuContainer">
      {items.map((item, index) => (
          <MenuCard key={index} item={item} />
      ))}
      </div>
    </>
  );
}
