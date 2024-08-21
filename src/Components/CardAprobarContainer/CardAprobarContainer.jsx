import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPropertiesBySellerId } from '../../Redux/Actions/actions';
import CardSellerProperties from '../CardSellerProperties/CardSellerProperties';

const CardAprobarContainer = ({ userId, properties, getPropertiesBySellerId }) => {
  useEffect(() => {
    if (userId) {
      getPropertiesBySellerId(userId);
    }
  }, [userId, getPropertiesBySellerId]);

  if (!userId) {
    return <div>No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.</div>;
  }

  return (
    <div className="card-deck">
      {properties.map((property) => (
        <CardSellerProperties key={property.id} property={property} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userId, // Aquí asegúrate de que userId esté bien conectado al componente
  properties: state.propertiesBySellerId, // Asegúrate de que esto esté definido
});

export default connect(mapStateToProps, { getPropertiesBySellerId })(CardAprobarContainer);