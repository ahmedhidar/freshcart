import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

export default function Brands() {
  const [brands, setBrands] = useState(null)
  async function getBrands(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrands(data.data)
  }
useEffect(()=>{getBrands()},[])
return <>
<div className="container py-3">
  <div className="row g-4 py-2">
    {brands?.map((br,idx)=><div key={idx} className="col-md-4 p-3 brands">
      <h3>{br.name}</h3>
      <img src={br.image} style={{height:"350px"}} alt='' className='w-100'/>
    </div>)}

  </div>
</div>
</>
}
