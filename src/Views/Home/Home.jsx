// Home.jsx
import React from 'react';
import style from './Home.module.css';
import MultiplesImagenes from '../../Components/MultiplesImagenes/MultiplesImagenes';
import CardSellerPropertiesContainer from '../../Components/CardSellerPropertiesContainer/CardSellerPropertiesContainer';

const Home = () => {
  return (
    <div className={style.container}>
    <CardSellerPropertiesContainer/>
    
    </div>
  );
};

export default Home;
