import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CardSellers.module.css';

const CardSellers = ({ seller, propertiesCount }) => {
  const { name, last_name, mail, phone_number, photo, type, status, officeId, createdAt } = seller;
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-seller/${seller.id}`);
  };

  return (
    <div className={styles.card} onClick={handleEditClick}>
      <div className={styles.header}>
        <img 
          src={photo || '/default-avatar.png'} 
          alt={`${name} ${last_name}`} 
          className={styles.photo}
        />
        <div className={styles.name}>
          <h3>{name} {last_name}</h3>
          <p>{type}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <p><strong>Email:</strong> {mail}</p>
        <p><strong>Teléfono:</strong> {phone_number}</p>
        <p><strong>Estado:</strong> {status ? 'Activo' : 'Inactivo'}</p>
        <p><strong>Habilitado:</strong> {new Date(createdAt).toLocaleDateString('es-ES')}</p>
        <p><strong>Cantidad de Propiedades:</strong> {propertiesCount}</p> {/* Mostrar cantidad de propiedades */}
      </div>
    </div>
  );
};

export default CardSellers;
