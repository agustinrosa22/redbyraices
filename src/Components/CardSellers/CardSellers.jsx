import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CardSellers.module.css';

const CardSellers = ({ seller }) => {
  const { name, last_name, mail, phone_number, photo, type, status, officeId } = seller;
  const navigate = useNavigate(); // Reemplaza useHistory con useNavigate

  const handleEditClick = () => {
    navigate(`/edit-seller/${seller.id}`); // Navega al formulario de edición
  };

  return (
    <div className={styles.card} onClick={handleEditClick}>
      <div className={styles.header}>
        <img 
          src={photo || '/default-avatar.png'} // Usar una imagen por defecto si no hay foto
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
        <p><strong>Oficina ID:</strong> {officeId}</p>
      </div>
    </div>
  );
};

export default CardSellers;
