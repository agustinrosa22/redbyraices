import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardSellerProperties.module.css';

const CardSellerProperties = ({ property }) => {

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };


  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        {property?.photo?.length > 0 && (
          <img src={property.photo[0]} className={style.image} alt={property.title} />
        )}
      </div>
      <div className={style.cardContent}>
        <h5 className={style.cardTitle}>{property.title}</h5>
        <h5 className={style.cardTitle}>$ {property.currency} {formatPrice(property.price)}</h5>
        <p className={style.cardText}>{property.description}</p>
        <div className={style.buttonContainer}>
        <Link to={`/historial/visitas/${property.id}`} className={style.detailsLink}>
    <button className={style.detailsButton}>Historial Visitas</button>
  </Link>
  <Link to={`/visita/${property.id}`} className={style.detailsLink}>
    <button className={style.detailsButton}>Anotar Visita</button>
  </Link>
  <Link to={`/detalles/${property.id}`} className={style.detailsLink}>
    <button className={style.detailsButton}>Ver detalles</button>
  </Link>
  <Link 
  to={`https://byraices.com/detail/${property.id}`} 
  className={style.detailsLink}
>
  <button 
    className={`${style.detailsButton} ${!property.statusProperty ? style.disabledButton : ""}`}
    disabled={!property.statusProperty}
    title={!property.statusProperty ? "Propiedad no aprobada" : ""}
  >
    Ver en página web
  </button>
</Link>
  <Link to={`/cierre-property/${property.id}`} className={style.detailsLink}>
            <button className={style.closeButton}>Cerrar Propiedad</button>
          </Link>
          {/* <Link to={`/generar-alquiler/${property.id}`} className={style.detailsLink}>
            <button className={style.rentalButton}>Generar Alquiler</button>
          </Link> */}
</div>
      </div>
    </div>
  );
};

export default CardSellerProperties;

