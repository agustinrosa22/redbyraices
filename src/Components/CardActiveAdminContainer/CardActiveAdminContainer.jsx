import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getListProperties } from '../../Redux/Actions/actions';
import CardActiveAdmin from '../CardActiveAdmin/CardActiveAdmin';
import style from './CardActiveAdminContainer.module.css'

const CardActiveAdminContainer = ({ activeProperties, getListProperties }) => {
  const [filter, setFilter] = useState('/properties/active?cerrado=false'); // Estado para controlar el filtro actual

  useEffect(() => {
    getListProperties(filter);
  }, [filter, getListProperties]);

  const handleFilterChange = (endpoint) => {
    setFilter(endpoint); // Cambiar el endpoint según el botón presionado
  };

  if (!activeProperties) {
    return <div>Cargando propiedades...</div>; // Puedes mostrar un estado de carga aquí
  }

  if (activeProperties.length === 0) {
    return <div>No hay propiedades pendientes para aprobar.</div>;
  }

  return (
    <div>
      <div className={style.filterButtons}>
        <button className={style.buttonFilter} onClick={() => handleFilterChange('/properties/active?cerrado=false')}>Todas</button>
        <button className={style.buttonFilter} onClick={() => handleFilterChange('/properties/active?cerrado=false&orderBy=updatedAt')}>
          Actualizadas
        </button>
        <button className={style.buttonFilter} onClick={() => handleFilterChange('/properties/active?cerrado=true')}>
          Cerradas
        </button>
      </div>
      <div className="card-deck">
        <h3>Cantidad: {activeProperties.length} Publicaciones</h3>
        {activeProperties.map((property) => (
          <CardActiveAdmin key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeProperties: state.activeProperties,
});

export default connect(mapStateToProps, { getListProperties })(CardActiveAdminContainer);


