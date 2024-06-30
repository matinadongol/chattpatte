import React, { useContext, useEffect, useState } from "react";
import './Item.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NumberInput from "../numberInput/NumberInput";
import { LoginContext } from "../context/ContextProvider";


export default function Item(){
  const {id} = useParams("")
  //console.log("item id: ", id)
  const history = useNavigate("")
  const {account, setAccount} = useContext(LoginContext)

  const [indData, setIndData] = useState([])
  //console.log("indData: ", indData)

  const getIndData = async () => {
    const res = await fetch(`/getItemsByID/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    //console.log("item data: ", data)

    if(res.status !== 201){
      console.log("no data available")
    } else {
      //console.log("getData")
      setIndData(data)
    }
  }

  const addToCart = async(id) => {
    const checkres = await fetch(`/addToCart/${id}`,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        indData
      }),
      credentials: "include"
    })

    const data1 = await checkres.json()
    //console.log(data1)
    if(checkres.status === 401 || !data1){
      console.log("invalid userrr")
      alert("invalid userrr")
    } else {
      alert("data added to your cart")
      history("/cartDetails")
      setAccount(data1)
    }
  }

  useEffect(() => {
    getIndData()
  }, [id])
  const imagePath = `${process.env.PUBLIC_URL}/image/Item/${indData.image}`;
  return (
    <>
    {indData && Object.keys(indData).length &&
      <div className="itemMain">
        <div className="itemDetail">
          <div className="itemImage">
            <img src={imagePath}></img>
          </div>
          <div className="itemDescription">
            <h1>{indData.itemName}</h1>
            <h6>Includes:</h6>
            <p>{indData.description}</p>
          </div>
        </div>
        <div className="itemSubHeading">
          <h6>Choices: 1/5</h6>
        </div>
        <div className="choices">
          <div className="choicesCard">
            <div className="choicesImage">
              <img src=""></img>
            </div>
            <div className="choicesDescription">
              <h3></h3>
              <h3></h3>
            </div>
            <div className="choicesNumberInput">
            </div>
          </div>
        </div>
        <div className="itemSubHeading">
          <h6>Dressing: 1/2</h6>
        </div>
        <div className="dressing">
          <div className="dressingCard">
            <div className="dressingImage">
              <img src=""></img>
            </div>
            <div className="dressingDescription">
              <h3></h3>
              <h3></h3>
            </div>
            <div className="dressingNumberInput">
            
            </div>
          </div>
        </div>
        <div className="itemBottom">
          <div className="numberInput">
            <NumberInput/>
          </div>
          <div className="addToCartButton">
              <button className="greenbutton" onClick={()=>addToCart(indData.id)}>
                <div className="buttonName">
                  Add To Cart
                </div>
                <div className="buttonIcon">
                <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className="buttonPrice">
                  $
                  <span>{indData.originalPrice}</span>
                </div>
              </button>
            </div>
        </div>
      </div>
    }
    </>
  );
}