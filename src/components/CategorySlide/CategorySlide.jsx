import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function CategorySlide() {
    var settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    async function getAllCategory(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let {data,isLoading} = useQuery("category",getAllCategory)
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
  return <>

<Slider {...settings}>
    {data?.data.data.map(function(element,idx){return<div key={idx}>
        <img className='w-100' style={{width:'100%' , height:'200px'}} src={element.image} alt=""/>
        <h6  className='my-3'>{element.name}</h6>
      </div>
})}
      
    </Slider>

  </>
}
