import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardSellerPropertiesClosed.module.css';

const CardSellerPropertiesClosed = ({ property }) => {
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        {property?.photo?.length > 0 && (
          <img src={property.photo[0]} className={style.image} alt={property.title} />
        )}
      </div>
      <div className={style.cardContent}>
        <h5 className={style.cardTitle}>{property.title}</h5>
        <h5 className={style.cardTitle}>$ {property.currency} {property.price}</h5>
        <p className={style.cardText}>{property.description}</p>
        <div className={style.buttonContainer}>
</div>
      </div>
    </div>
  );
};

export default CardSellerPropertiesClosed;

