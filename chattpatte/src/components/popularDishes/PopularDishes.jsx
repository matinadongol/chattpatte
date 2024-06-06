import React, { useEffect } from "react";
import './popularDishes.css';
import MenuCard from "./MenuCard/MenuCard.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {getItems} from "../../redux/actions/action.js"

export default function PopularDishes(){
    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        swipeToSlide: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    const {items} = useSelector(state => state.getItemsData);
    console.log("poppular dishes: ", items);

    const dispatch = useDispatch()

    useEffect(()=> {
      dispatch(getItems())
    }, [dispatch])
    return (
        <div className="popularDishes_main">
            <h1>Popular Dishes</h1>
            <Slider {...settings}>
              {items.map((item, index) => (
                    <MenuCard key={index} item={item} />
                ))}
            </Slider>
        </div>
    );
}