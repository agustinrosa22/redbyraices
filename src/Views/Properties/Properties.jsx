// Home.jsx
import React from 'react';
import style from './Properties.module.css';

import CardSellerPropertiesClosedContainer from '../../Components/CardSellerPropertiesClosedContainer/CardSellerPropertiesClosedContainer';

const Properties = () => {
  return (
    <div className={style.container}>
    <h1>Propiedades cerradas</h1>
    <CardSellerPropertiesClosedContainer/>
    
    </div>
  );
};

export default Properties;
