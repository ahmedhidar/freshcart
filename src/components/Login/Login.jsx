import style from './Login.module.css';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bars} from 'react-loader-spinner';
import { authContext } from '../../Context/Auth/Auth';


export default function Login() {
  const [errMessage,seterrMessage]= useState(null);
  const [successMessage,setSuccessMessage]= useState(null);
  const [loading,setLoading]= useState(false);
  let navigate = useNavigate();
  let {token,setToken} = useContext(authContext)

async function registerSubmit(values){
  setLoading(true)
try {
  let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
  if(data.message == "success"){
    localStorage.setItem("tkn" , data.token)
    setToken(data.token)
    setSuccessMessage(data.message)
    setTimeout(function(){
      navigate("/")
    },3000)
  }
}catch(err){
  console.log(err.response.data.message);
  seterrMessage(err.response.data.message)
}
setLoading(false)
}
// function validate(values){
// let errors = {}
// if(!values.name){
//   errors.name = "name is requied"
// }else if(values.name.length>3){
// errors.name = "name minLength is 3"
// }else if(values.name.length>10){
//   errors.name = "name maxLength is 10"
// }
// if(!values.phone){
//   errors.phone = "phone is requied"
// }

// return errors
// }
let x = yup.object({
  email:yup.string().email('email is invalid').required('email is required'),
  password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password start with uppercase').required('password is required')
})
  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema:x,
    onSubmit:registerSubmit
  }
  )
  return <>
  <div className="w-75 mx-auto py-5">
    {errMessage?<div className='alert alert-danger'>{errMessage}</div>:""}
    {successMessage?<div className='alert alert-success'>{successMessage}</div>:""}
    
    <h3>Login</h3>
  <form onSubmit={formik.handleSubmit}>


    <label htmlFor='email'>Email:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' value={formik.values.email} name='email'/>
    {formik.errors.email && formik.touched.email? <div className='my-2 p-2 alert alert-danger'>{formik.errors.email}</div>:''}


    <label htmlFor='password'>Password:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' type='password' value={formik.values.password} name='password'/>
    {formik.errors.password && formik.touched.password? <div className='my-2 p-2 alert alert-danger'>{formik.errors.password}</div>:''}


    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3'>
    {loading?<Bars
  height="30"
  width="30"
  color="#fff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />:"submit"}
    
  </button>
  </form>
  </div>

  </>
}