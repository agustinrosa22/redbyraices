import React from 'react';
import style from './CardSellerPropertiesClosed.module.css';

const CardSellerPropertiesClosed = ({ property }) => {
  // Función para eliminar puntos y convertir a número
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/\./g, '')) || 0;
    }
    return price || 0;
  };

  // Formatea un número como moneda con puntos
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Obtener precios sin puntos para cálculo
  const publishedPrice = parsePrice(property?.price);
  const closedPrice = parsePrice(property?.cerrado?.precioCierre);

  // Calcular la diferencia porcentual entre precios
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
          Publicado: $ {property.currency} {formatPrice(publishedPrice)} / Cerrado: $ {property?.cerrado?.currencyCierre} {formatPrice(closedPrice)}
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
