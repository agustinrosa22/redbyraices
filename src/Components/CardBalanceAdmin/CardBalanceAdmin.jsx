import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './CardBalanceAdmin.module.css';
import { deleteProperty } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const CardActiveAdmin = ({ property }) => {
  const dispatch = useDispatch(); 

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        {property?.photo?.length > 0 && (
          <img src={property.photo[0]} className={style.image} alt={property.title} />
        )}
      </div>
      <div className={style.cardContent}>
        <h5 className={style.cardTitle}>{property.title}</h5>
        <h5 className={style.id}>{property.id}</h5>
        <h5 className={style.cardTitle}>$ {property.currency} {property.price}</h5>
        <p className={style.cardText}>{property.description}</p>
        <p>{property.ownerName} / {property.ownerPhone} / {property.ownerEmail}</p>
        <div className={style.buttonContainer}>
          <Link to={`https://byraices.com/detail/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Ver en página</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardActiveAdmin;
