import React from 'react';
import style from './Home.module.css';
import { useContext } from 'react';
import { authContext } from '../../Context/Auth/Auth';
import "../FeatureProducts/FeatureProducts"
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlide from '../CategorySlide/CategorySlide';

export default function Home() {
  let {token} = useContext(authContext);
  return <>

  <HomeSlider/>
  <CategorySlide/>
  <FeatureProducts/>
  </>
}
