import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createContext } from "react";
export let cartContext = createContext();



export default function CartProvider({children}) {
    const [numOfItems, setnumOfItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState(null)
    const [cartId, setCartId] = useState("")
    useEffect(function(){
        getUserCart()
    },[])
    async function addProductToCart(productId){
        try{        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
    productId: productId,
        },
        {
            headers: {token: localStorage.getItem("tkn")},
            
        });
        if(data.status == "success"){
            console.log(data)
            getUserCart()
        // setnumOfItems(data.numOfCartItems);
        // setTotalPrice(data.data.totalCartPrice);
        // setProducts(data.data.products);
        }
console.log(data,"a7a")
        return data
    }
    
        catch(error){
            console.log(error)
        }

    }
    async function getUserCart(){
        try{
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{token:localStorage.getItem("tkn")}
        });
        if(data.status == "success"){
            setnumOfItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
            setCartId(data.data._id)
        }
        return data
        }catch (error){
        setProducts([])
        }
    }
    async function removeItem(id){
    try{
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers : {
            token : localStorage.getItem("tkn")
        }
    })
    if(data.status == "success"){
        setnumOfItems(data.numOfCartItems);
        setTotalPrice(data.data.totalCartPrice);
        setProducts(data.data.products);
    }
    return data
    }catch(error){
console.log("error remove cart")
    }
    }
    async function updateCountProduct(id , count){
        try{
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count: count
        },{
            headers : {
                token : localStorage.getItem("tkn")
            },
        });
        if(data.status == "success"){
            setnumOfItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
        }
        }catch(error){
            console.log("error update count")
        }
    }

    async function clearCart(){
        try{
            const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
                headers : {
                    token : localStorage.getItem("tkn")}
            })
            if(data.message == "success"){
                setnumOfItems(0);
                setTotalPrice(0);
                setProducts([]);
            }
            return data
        }catch(error){
console.log(error)
        }
    }
  return (
    <cartContext.Provider value={{updateCountProduct,removeItem,addProductToCart,numOfItems,totalPrice,products,clearCart,cartId,setnumOfItems,setProducts,setTotalPrice}}>

    {children}
    </cartContext.Provider>
  )
}
