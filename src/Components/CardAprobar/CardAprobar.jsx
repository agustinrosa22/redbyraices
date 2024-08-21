import React from 'react';
import { Link } from 'react-router-dom';
import style from './CardAprobar.module.css';
import { useDispatch } from 'react-redux'; // Importar useDispatch
import { editProperty } from '../../Redux/Actions/actions'; // Importar la acción

const CardAprobar = ({ property }) => {
  const dispatch = useDispatch();

  // Función para manejar el cambio de estado de la propiedad
  const handleEdit = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas cambiar el estado de esta propiedad?');
    if (confirmed) {
      dispatch(editProperty(property.id, { ...property, statusProperty: true }));
    }
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
        <h5 className={style.cardTitle}>$ {property.currency} {property.price}</h5>
        <p className={style.cardText}>{property.description}</p>
        <Link to={`https://byraices.com/detail/${property.id}`} className={style.detailsLink}>
          <button className={style.detailsButton}>Ver detalles</button>
        </Link>
        <button onClick={handleEdit} className={style.editButton}>
          Aprobar Propiedad
        </button>
      </div>
    </div>
  );
};

export default CardAprobar;
