import React from 'react';
import style from './Sellers.module.css';
import FormUsuarios from '../../Components/FormUsuarios/FormUsarios'
import CardSellersContainer from '../../Components/CardSellersContainer/CardSellersContainer';
const Sellers = () => {
  return (
    <div className={style.container}>
    <FormUsuarios/>
    <CardSellersContainer/>
    </div>
  );
};

export default Sellers;
