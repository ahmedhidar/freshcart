import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner';

export default function AllOrder() {
    const [allData, setAllData] = useState(null)
  
        const userId = jwtDecode(localStorage.getItem("tkn")).id;

 
    async function getAllOrders(){
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        setAllData(data)
        console.log(data,"aho")
        console.log(userId)
    } catch (error) {
        console.log(error)
    }
    }
useEffect(function(){
    getAllOrders()
},[])
  return
//    <>
//   <div className='container py-5'>
//         <div className="row g-3">
//             {allData? allData.map(order =>            <div className="col-md-6">
//                 <div className="inner p-3 bg-info rounded-2">
//                     <p>phone : {order.shippingAddres.phone}</p>
//                     <p>city : {order.shippingAddres.city}</p>
//                     <p>details : {order.shippingAddress.details}</p>
//                     <p>payment method : {order.paymentMethodType}</p>
//                 </div>
//             </div> ):<div className='vh-100 bg-dark d-flex justify-content-center align-items-center'><Triangle
//   visible={true}
//   height="380"
//   width="380"
//   color="#4fa94d"
//   ariaLabel="triangle-loading"
//   wrapperStyle={{}}
//   wrapperClass=""
//   /></div>}

//         </div>
//     </div>
//   </>

}
