import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardBalanceAdmin.module.css';

const CardActiveAdmin = ({ property }) => {
  
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/\./g, '')) || 0;
    }
    return price || 0;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('es-AR'); // Formato de número con separadores de miles
  };

  const publishedPrice = parsePrice(property?.price);
  const closedPrice = parsePrice(property?.cerrado?.precioCierre);

  let percentageChange = 0;
  if (publishedPrice > 0) {
    percentageChange = ((closedPrice - publishedPrice) / publishedPrice) * 100;
  }

  const isPositive = percentageChange >= 0;
  const arrowStyle = isPositive ? style.greenArrow : style.redArrow;

  // Determinar mensaje de cierre
  let cierreMensaje = "";
  if (property?.cerrado?.soldByAgent) cierreMensaje = "Cerrado por el agente";
  if (property?.cerrado?.buyingTip) cierreMensaje = "Punta compradora";
  if (property?.cerrado?.selleringTip) cierreMensaje = "Punta vendedora";
  if (property?.cerrado?.buyingTip && property?.cerrado?.selleringTip) {
    cierreMensaje = "Cerrado por el agente: Punta compradora y vendedora";
  }

  // Obtener datos de comisión y formatearlos
  const {
    fecha,
    currencyCierre,
    sellerCommision,
    officeComission,
    totalComission,
    franquiciaComission,
    martillerComission,
  } = property?.cerrado || {};

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
        <h5 className={style.cardTitle}>
          Publicado: $ {property.currency} {formatPrice(publishedPrice)} / Cerrado: $ {currencyCierre} {formatPrice(closedPrice)}
        </h5>
        <p className={style.percentageChange}>
          Cambio: 
          <span className={arrowStyle}>
            {isPositive ? '▲' : '▼'} {Math.abs(percentageChange).toFixed(2)}%
          </span>
        </p>
        <p className={style.cardText}>{property.description}</p>
        <p>
          {property.ownerName && <span>{property.ownerName}</span>}
          {property.ownerName && property.ownerPhone && " / "}
          {property.ownerPhone && <span>{property.ownerPhone}</span>}
          {property.ownerPhone && property.ownerEmail && " / "}
          {property.ownerEmail && <span>{property.ownerEmail}</span>}
        </p>

        {/* Mensaje de cierre si existe */}
        {cierreMensaje && <p className={style.cierreMensaje}>{cierreMensaje}</p>}

        {/* Sección de comisiones y fecha de cierre */}
        {fecha && (
          <div className={style.cierreInfo}>
            <h4 className={style.cierreTitulo}>Detalles del cierre</h4>
            <p><strong>Fecha de cierre:</strong> {fecha}</p>
            {sellerCommision && <p><strong>Comisión vendedor:</strong> {currencyCierre} {formatPrice(sellerCommision)}</p>}
            {officeComission && <p><strong>Comisión oficina:</strong> {currencyCierre} {formatPrice(officeComission)}</p>}
            {totalComission && <p><strong>Comisión total:</strong> {currencyCierre} {formatPrice(totalComission)}</p>}
            {franquiciaComission && <p><strong>Comisión franquicia:</strong> {currencyCierre} {formatPrice(franquiciaComission)}</p>}
            {martillerComission && <p><strong>Comisión martillero:</strong> {currencyCierre} {formatPrice(martillerComission)}</p>}
          </div>
        )}

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
