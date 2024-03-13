// Home.jsx
import React from 'react';
import style from './Home.module.css';
import MultiplesImagenes from '../../Components/MultiplesImagenes/MultiplesImagenes';

const Home = () => {
  return (
    <div className={style.container}>
      <h1>HOME</h1>
      <MultiplesImagenes/>
    </div>
  );
};

export default Home;
