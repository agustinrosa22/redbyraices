// Home.jsx
import React from 'react';
import style from './Balance.module.css';
import CardBalanceAdminContainer from '../../Components/CardBalanceAdminContainer/CardBalanceAdminContainer';

const Balance = () => {
  return (
    <div className={style.container}>
    <CardBalanceAdminContainer/>
    
    </div>
  );
};

export default Balance;
