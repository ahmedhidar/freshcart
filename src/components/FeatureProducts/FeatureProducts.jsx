import React, { useContext, useEffect, useState } from 'react';
import style from './FeatureProducts.module.css';
import axios from 'axios';
import { DNA, Triangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {cartContext} from '../../Context/Cart/Cart'

export default function FeatureProducts() {
  let {addProductToCart} = useContext(cartContext)
  async function getAllProduct(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let {isLoading,data} = useQuery("allProduct",getAllProduct);
  async function addProduct(id){
    const res = await addProductToCart(id);
    if(res.status == 'success'){
      toast.success(res.message,{
        duration:2000
      })
    }else{
      toast.error("error",{
        duration:2000
      })
    }

  }
//   const [products, setproducts] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
  // async function getProducts(){
  //   let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //   console.log(data);
  //   setproducts(data.data);
  //   setIsLoading(false)
  // }
  // useEffect(()=>{
  //   getProducts()
  // },[])
  return <>
  {isLoading?<div className='vh-100 bg-dark d-flex justify-content-center align-items-center'><Triangle
  visible={true}
  height="380"
  width="380"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>:""}
  <div className='container pt-5'>
    <div className="row">
      
      {data?.data.data.map((el)=><div key={el.id} className="col-md-2">
        <div className="product">
        <Link className='linkato' to={'/details/'+el._id}>
        <div className="product py-2 px-3">
        <img src={el.imageCover} className='w-100' alt=""/>
        <p className='text-main'>{el.category.name}</p>
        <h3>{el.title.split(" ").slice(0,3).join(" ")}</h3>
        <div className="d-flex justify-content-between">
        <p>{el.price} EGP</p>
        <span>
        <i className='fa fa-star rating-color'></i>
        {el.ratingsAverage}
        </span>
        </div>
        </div>
        </Link>
        <button onClick={()=>{addProduct(el._id)}} className='btn bg-main text-white'>add to cart</button>
        </div>

        </div>)}

      
    </div>
  </div>
  </>
}
