import React from 'react';
import style from './CardSellerPropertiesClosed.module.css';

const CardSellerPropertiesClosed = ({ property }) => {
  // Calcula la diferencia porcentual entre precio publicado y cerrado
  const publishedPrice = property?.price || 0;
  const closedPrice = property?.cerrado?.precioCierre || 0;

  let percentageChange = 0;
  if (publishedPrice > 0) {
    percentageChange = ((closedPrice - publishedPrice) / publishedPrice) * 100;
  }

  const isPositive = percentageChange >= 0;
  const arrowStyle = isPositive ? style.greenArrow : style.redArrow;

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        {property?.photo?.length > 0 && (
          <img src={property.photo[0]} className={style.image} alt={property.title} />
        )}
      </div>
      <div className={style.cardContent}>
        <h5 className={style.cardTitle}>{property.title}</h5>
        <h5 className={style.cardTitle}>
          Publicado: $ {property.currency} {property.price} / Cerrado: $ {property?.cerrado?.currencyCierre} {property?.cerrado?.precioCierre}
        </h5>
        <p className={style.percentageChange}>
          Cambio: 
          <span className={arrowStyle}>
            {isPositive ? '▲' : '▼'} {Math.abs(percentageChange).toFixed(2)}%
          </span>
        </p>
        <p className={style.cardText}>{property.description}</p>
        <div className={style.buttonContainer}></div>
      </div>
    </div>
  );
};

export default CardSellerPropertiesClosed;
