import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getListProperties } from '../../Redux/Actions/actions';
import CardActiveAdmin from '../CardActiveAdmin/CardActiveAdmin';

const CardActiveAdminContainer = ({ activeProperties, getListProperties }) => {
  useEffect(() => {
    getListProperties();
  }, [getListProperties]);

  if (!activeProperties) {
    return <div>Cargando propiedades...</div>; // Puedes mostrar un estado de carga aquí
  }

  if (activeProperties.length === 0) {
    return <div>No hay propiedades pendientes para aprobar.</div>;
  }

  return (
    <div className="card-deck">
      <h3>Cantidad: {activeProperties.length} Publicaciones</h3>
      {activeProperties.map((property) => (
        <CardActiveAdmin key={property.id} property={property} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeProperties: state.activeProperties,
});

export default connect(mapStateToProps, { getListProperties })(CardActiveAdminContainer);

