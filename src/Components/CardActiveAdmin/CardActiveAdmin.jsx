import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardActiveAdmin.module.css';

const CardActiveAdmin = ({ property }) => {
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
          <Link to={`/lista/detail/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Ver detalles</button>
          </Link>
          <Link to={`https://byraices.com/detail/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Ver en página</button>
          </Link>
          <Link to={`/detalles/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Editar</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CardActiveAdmin;
