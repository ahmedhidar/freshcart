import React, { useContext } from 'react';
import style from './Cart.module.css';
import { cartContext } from '../../Context/Cart/Cart';
import { Triangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {numOfItems,updateCountProduct,totalPrice,products,removeItem,clearCart} = useContext(cartContext)
  console.log(products)
  async function remove(id){
    const res = await removeItem(id)
    if(res.status == 'success'){
      toast.success("item removed successfully",{
        duration:2000
      })
    }else{
      toast.error("error",{
        duration:2000
      })
    }
  }
  async function clearCartUser(){
    await clearCart()
  }


  async function update(id , count){
    const res = await updateCountProduct(id , count);
    // !====================(error in res need handle)==========
    // console.log(res)
    // if(res.status == "success"){
    //   toast.success("count updated successfully",{
    //     duration:2000
    //   })
    // }else{
    //   toast.error("error",{
    //     duration:2000
    //   })
    // }
  }
  if(products == null){return <>
    <div className='vh-100 bg-dark d-flex justify-content-center align-items-center'><Triangle
  visible={true}
  height="380"
  width="380"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
  </>
  }
  if(products.length ==0){return<div className='vh-100 bg-dark d-flex justify-content-center align-items-center'>
  <h2 className='text-danger'>No data to display</h2>
</div>
  }
  return<div style={{backgroundColor:"#eee"}} className="container py-5">
    <h2>shop cart:</h2>
    <h3 className="text-success">{totalPrice}</h3>
    <button onClick={clearCartUser} className='btn btn-warning my-3'>clear cart</button>
    <Link to={"/payment"}  className='btn btn-primary mx-3 my-3'>payment</Link>
    <Link to={"/allorders"} className='btn btn-info mx-3 my-3'>all orders</Link>
    {products?.map(function(product , idx){return (<div key={idx} className="row border-bottom border-4 g-4 py-5 align-items-center">
      <div className="col-sm-1">
        <div>
          <img src={product.product.imageCover} alt='' className='w-100'/>
        </div>
      </div>
      <div className="col-sm-8">
        <div>
          <h4>{product.product.title}</h4>
          <h6>{product.price}EGP</h6>
          <button onClick={()=>{remove(product.product.id)}} className='btn btn-danger'>remove</button>
        </div>
        </div>
      
      <div className="col-sm-3">
        <div className="d-flex align-items-center">


        {product.count <= 0 ? <button onClick={()=>{remove(product.product.id)}} className='btn btn-outline-danger'>-</button>:<button onClick={function(){update(product.product.id ,product.count -1 )}} className='btn btn-outline-danger'>-</button>}

        
        <span className='mx-3'>{product.count}</span>
        <button onClick={function(){update(product.product.id ,product.count+1 )}} className='btn btn-outline-success'>+</button>
        </div>
      </div>
      </div>
      )})}
    </div>

}
