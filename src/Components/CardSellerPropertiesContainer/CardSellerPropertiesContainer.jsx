import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPendingProperties } from '../../Redux/Actions/actions'; // Importa la acción que obtendrá las propiedades pendientes
import CardAprobar from '../CardAprobar/CardAprobar'; // Importa la tarjeta que creaste

const CardAprobarContainer = ({ pendingProperties, getPendingProperties }) => {
  useEffect(() => {
    getPendingProperties(); // Llama a la acción para obtener las propiedades pendientes
  }, [getPendingProperties]);

  if (!pendingProperties || pendingProperties.length === 0) {
    return <div>No hay propiedades pendientes para aprobar.</div>;
  }

  return (
    <div className="card-deck">
      {pendingProperties.map((property) => (
        <CardAprobar key={property.id} property={property} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pendingProperties: state.propertiesReducer.pendingProperties, // Asegúrate de que esté bien conectado al estado
});

export default connect(mapStateToProps, { getPendingProperties })(CardAprobarContainer);
