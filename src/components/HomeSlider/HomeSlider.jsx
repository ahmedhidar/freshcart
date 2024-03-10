import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return<>
  <div className="container"> 
    <div className="row g-0">
<div className="col-md-9">
<Slider {...settings}>
      <div>
        <img className='w-100' style={{width:'100%' , height:'400px'}} src={require("../../Assets/images/slider-image-1.jpeg")} alt=""/>
      </div>
      <div>
      <img className='w-100' style={{width:'100%' , height:'400px'}} src={require("../../Assets/images/slider-image-2.jpeg")} alt=""/>
      </div>
      <div>
      <img className='w-100' style={{width:'100%' , height:'400px'}} src={require("../../Assets/images/slider-image-3.jpeg")} alt=""/>
      </div>
      <div>
      <img className='w-100' style={{width:'100%' , height:'400px'}} src={require("../../Assets/images/slider-2.jpeg")} alt=""/>
      </div>

    </Slider>
  );
</div>
<div className="col-md-3">
    <img className='w-100' style={{height:"200px"}} src={require("../../Assets/images/grocery-banner-2.jpeg")} alt='' />
    <img className='w-100' style={{height:"200px"}} src={require("../../Assets/images/grocery-banner.png")} alt='' />
</div>
  </div>
  </div>
  </>

}
