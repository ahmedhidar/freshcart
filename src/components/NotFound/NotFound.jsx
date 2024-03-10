import React from 'react';
import NotFoundPic from '../../Assets/images/error.svg';

export default function NotFound() {
  return (
    <div className='text-center vh-100 bg-dark'><img src={NotFoundPic} className='W-100' alt='ll' /></div>
  )
}
