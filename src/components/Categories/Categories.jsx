import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function Categories() {
  const [category, setcategory] = useState(null)
  async function getCategory(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setcategory(data.data)
  }
useEffect(()=>{getCategory()},[])
return <>
<div className="container py-3">
  <div className="row g-3 py-2">
    {category?.map((ca,idx)=><div key={idx} className="col-md-4 p-3 brands">
      <h3>{ca.name}</h3>
      <img src={ca.image} style={{height:"350px"}} alt='' className='w-100'/>
    </div>)}

  </div>
</div>
</>
}

