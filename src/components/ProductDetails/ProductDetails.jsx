import axios from 'axios'
import React, { createContext, useContext } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {cartContext} from '../../Context/Cart/Cart'

export default function ProductDetails() {
  let {addProductToCart} = useContext(cartContext)
  let {id} = useParams();
  async function addProduct(id){
    const res = await addProductToCart(id);
    console.log(res,"nice")
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
  async function getProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {data,isLoading} = useQuery("productDetails",getProductDetails)
  if(isLoading == true){
    return <>
    <div className='vh-100 d-flex justify-content-center align-items-center'><Triangle
visible={true}
height="180"
width="180"
color="#4fa94d"
ariaLabel="triangle-loading"
wrapperStyle={{}}
wrapperClass=""
/></div>
    </>
}
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-4">
        <img src={data?.data.data.imageCover}alt='' className='w-100'/>
        </div>
        <div className="col-md-8">
        <h3>{data?.data.data.title}</h3>
        <p>{data?.data.data.description}</p>
        <h6>{data?.data.data.category.name}</h6>
        <div className="d-flex ">
        <p className='me-5'>{data?.data.data.price} EGP</p>
        <span className='mx-5'>
        <i className='fa fa-star rating-color'></i>
        {data?.data.data.ratingsAverage}
        </span>
        </div>
        <button onClick={function(){
          addProduct(data?.data.data.id)
        }} className='btn bg-main w-75 text-white fs-5'>+add to cart<i className="fa-solid  p-2 fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
  )
}
