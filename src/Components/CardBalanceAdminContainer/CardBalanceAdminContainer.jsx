import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getListProperties } from '../../Redux/Actions/actions';
import CardBalanceAdmin from '../CardBalanceAdmin/CardBalanceAdmin';
import style from './CardBalanceAdminContainer.module.css';

const CardBalanceAdminContainer = ({ activeProperties, getListProperties }) => {
  // Cargar solo las propiedades cerradas
  useEffect(() => {
    getListProperties('/properties/active?cerrado=true');
  }, [getListProperties]);

  // Mostrar estado de carga o mensaje si no hay propiedades
  if (!activeProperties) {
    return <div>Cargando propiedades...</div>;
  }

  if (activeProperties.length === 0) {
    return <div>No hay propiedades cerradas.</div>;
  }

  return (
    <div>
      <h3 className={style.title}>Cantidad: {activeProperties.length} Publicaciones Cerradas</h3>

      {/* Listado de propiedades cerradas */}
      <div className="card-deck">
        {activeProperties.map((property) => (
          <CardBalanceAdmin key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeProperties: state.activeProperties,
});

export default connect(mapStateToProps, { getListProperties })(CardBalanceAdminContainer);


