import axios, { Axios } from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/Cart/Cart';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [phone , setPhone] = useState("")
  const [city, setCity] = useState("")
  const [details, setDetails] = useState("");
  const{cartId,setnumOfItems,setProducts,setTotalPrice} = useContext(cartContext);
  const nav = useNavigate()

 

  async function cashPayment(){
    
    let formData = {
      shippingAdress:{
        details : details,
        phone : phone,
        city : city ,
      },
    };
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,formData,{
      headers : {token: localStorage.getItem("tkn")},
    })
    if(data.status == "success"){
      setTotalPrice(0);
      setProducts([]);
      setnumOfItems(0)
      nav("/allorders")
    }
    console.log(data)
    } catch (error) {
      console.log(error)
    }
    
  }
  async function onlinePayment(){
    let formData = {
      shippingAdress:{
        details : details,
        phone : phone,
        city : city ,
      },
    };
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,formData,{
        headers : {
          token : localStorage.getItem("tkn")
        },
        params : {
          url:"http://localhost:3000"},
      })
      if(data.status == "success"){
        window.open(data.session.url)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-50 m-auto'>
      
        <label htmlFor="city" >city</label>
        <input onChange={(e)=>{setCity(e.target.value)}} type='text' className='form-control my-3' id='city'/>
        <label  htmlFor="phone" >phone</label>
        <input onChange={function(e){setPhone(e.target.value)}} type='tel' className='form-control my-3' id='phone'/>
        <label htmlFor="details" >details</label>
        <textarea onChange={(e)=>{setDetails(e.target.value)}} className='form-control my-3' id='details'></textarea>
        <button onClick={cashPayment} className='btn btn-dark'>cash payment<i className="mx-2 fa-solid fa-dollar-sign"></i></button>
        <button onClick={onlinePayment} className='btn btn-warning mx-3'>online payment<i className="mx-2 fa-solid fa-dollar-sign"></i></button>
      
    </div>
  )
}
