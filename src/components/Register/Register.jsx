import React, { useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bars} from 'react-loader-spinner';



export default function Register() {
  const [errMessage,seterrMessage]= useState(null);
  const [successMessage,setSuccessMessage]= useState(null);
  const [loading,setLoading]= useState(false);
  let navigate = useNavigate();

async function registerSubmit(values){
  setLoading(true)
try {
  let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
  if(data.message == "success"){
    setSuccessMessage("ro7 login ya 3m")
    setTimeout(function(){
      navigate("/login")
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
let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
let x = yup.object({
  name:yup.string().min(3,'name min length is 3').max(10,'name max length is 10').required('name is required'),
  email:yup.string().email('email is invalid').required('email is required'),
  phone:yup.string().matches(phoneRegExp,'phone is invalid').required('phone is required'),
  password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password start with uppercase').required('password is required'),
  rePassword:yup.string().oneOf([yup.ref('password')],"password repassword don\'t match").required('repassword is required')
})
  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema:x,
    onSubmit:registerSubmit
  }
  )
  return <>
  <div className="w-75 mx-auto py-5">
    {errMessage?<div className='alert alert-danger'>{errMessage}</div>:""}
    {successMessage?<div className='alert alert-success'>{successMessage}</div>:""}
    
    <h3>Register Now</h3>
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor='name'>Name:</label>
    <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' type='text' value={formik.values.name} name='name'/>
    {formik.errors.name && formik.touched.name? <div className='my-2 p-2 alert alert-danger'>{formik.errors.name}</div>:''}


    <label htmlFor='email'>Email:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' id='email' value={formik.values.email} name='email'/>
    {formik.errors.email && formik.touched.email? <div className='my-2 p-2 alert alert-danger'>{formik.errors.email}</div>:''}

    <label htmlFor='phone'>phone:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' type='tel' value={formik.values.phone} name='phone'/>
    {formik.errors.phone && formik.touched.phone? <div className='my-2 p-2 alert alert-danger'>{formik.errors.phone}</div>:''}

    <label htmlFor='password'>Password:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' type='password' value={formik.values.password} name='password'/>
    {formik.errors.password && formik.touched.password? <div className='my-2 p-2 alert alert-danger'>{formik.errors.password}</div>:''}

    <label htmlFor='repassword'>repassword:</label>
    <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} id='repassword' type='password' value={formik.values.rePassword} name='rePassword'/>
    {formik.errors.rePassword && formik.touched.rePassword? <div className='my-2 p-2 alert alert-danger'>{formik.errors.rePassword}</div>:''}

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
