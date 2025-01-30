import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getListProperties } from '../../Redux/Actions/actions';
import CardActiveAdmin from '../CardActiveAdmin/CardActiveAdmin';
import style from './CardActiveAdminContainer.module.css';

const CardActiveAdminContainer = ({ activeProperties, getListProperties }) => {
  const [filter, setFilter] = useState('/properties/active?cerrado=false'); // Estado para el filtro actual
  const [search, setSearch] = useState(''); // Estado para el valor de búsqueda

  // Actualizar las propiedades cada vez que cambia el filtro
  useEffect(() => {
    getListProperties(filter);
  }, [filter, getListProperties]);

  // Manejar los cambios en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Actualizar el estado del valor ingresado
  };

  // Manejar la búsqueda
  const handleSearch = () => {
    let endpoint = '/properties/active?cerrado=false'; // Filtro base
    if (search) {
      endpoint += `&search=${search}`; // Agregar el término de búsqueda al endpoint
    }
    setFilter(endpoint); // Cambiar el filtro
  };

  // Manejar cambios de filtro por botones
  const handleFilterChange = (endpoint) => {
    setFilter(endpoint); // Cambiar el endpoint según el botón presionado
  };

  // Mostrar un estado de carga o un mensaje cuando no hay propiedades
  if (!activeProperties) {
    return <div>Cargando propiedades...</div>;
  }

  if (activeProperties.length === 0) {
    return <div>No hay propiedades pendientes para aprobar.</div>;
  }

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className={style.searchBar}>
        <input
          type="text"
          placeholder="Buscar por ID..."
          value={search}
          onChange={handleSearchChange}
          className={style.searchInput}
        />
        <button onClick={handleSearch} className={style.searchButton}>
          Buscar
        </button>
      </div>

      {/* Botones de filtro */}
      <div className={style.filterButtons}>
        <button
          className={style.buttonFilter}
          onClick={() => handleFilterChange('/properties/active?cerrado=false')}
        >
          Todas
        </button>
        <button
          className={style.buttonFilter}
          onClick={() =>
            handleFilterChange('/properties/active?cerrado=false&orderBy=updatedAt')
          }
        >
          Actualizadas
        </button>
        <button
          className={style.buttonFilter}
          onClick={() => handleFilterChange('/properties/active?cerrado=true')}
        >
          Cerradas
        </button>
      </div>

      {/* Listado de propiedades */}
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

