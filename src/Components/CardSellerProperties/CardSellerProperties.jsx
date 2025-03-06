import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardSellerProperties.module.css';

const CardSellerProperties = ({ property }) => {

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

    // Calcular días publicados
    const getDaysPublished = () => {
      if (!property.createdAt) return "Fecha desconocida";
  
      const createdAtDate = new Date(property.createdAt);
      const currentDate = new Date();
      const differenceInTime = currentDate.getTime() - createdAtDate.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convertir ms a días
  
      return differenceInDays === 1 ? "1 día publicado" : `${differenceInDays} días publicados`;
    };
  
    const getFormattedDate = (dateString) => {
      if (!dateString) return "Fecha desconocida";
    
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString("es-ES", options);
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
              {/* Fecha de creación y días publicados */}
<p className={style.dateInfo}>
  Creado el <strong>{getFormattedDate(property.createdAt)}</strong> - {getDaysPublished()}
</p>

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

