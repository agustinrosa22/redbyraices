import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPropertiesClosedBySellerId } from '../../Redux/Actions/actions';
import CardSellerPropertiesClosed from '../CardSellerPropertiesClosed/CardSellerPropertiesClosed';

const CardSellerPropertiesClosedContainer = ({ userId, properties, getPropertiesClosedBySellerId }) => {
  useEffect(() => {
    if (userId) {
      getPropertiesClosedBySellerId(userId);
    }
  }, [userId, getPropertiesClosedBySellerId]);

  if (!userId) {
    return <div>No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.</div>;
  }

  return (
    <div className="card-deck">
      {properties.length > 0 ? (
        properties.map((property) => (
          <CardSellerPropertiesClosed key={property.id} property={property} />
        ))
      ) : (
        <h3>No hay propiedades cerradas disponibles para este vendedor.</h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId, // Aquí asegúrate de que userId esté bien conectado al componente
  properties: state.propertiesClosedBySellerId || [], // Maneja un valor por defecto si no hay propiedades
});

export default connect(mapStateToProps, { getPropertiesClosedBySellerId })(CardSellerPropertiesClosedContainer);
