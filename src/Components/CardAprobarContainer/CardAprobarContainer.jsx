import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPendingProperties } from '../../Redux/Actions/actions';
import CardAprobar from '../CardAprobar/CardAprobar';

const CardAprobarContainer = ({ pendingProperties, getPendingProperties }) => {
  useEffect(() => {
    getPendingProperties();
  }, [getPendingProperties]);

  if (!pendingProperties) {
    return <div>Cargando propiedades...</div>; // Puedes mostrar un estado de carga aquí
  }

  if (pendingProperties.length === 0) {
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
  pendingProperties: state.pendingProperties,
});

export default connect(mapStateToProps, { getPendingProperties })(CardAprobarContainer);
