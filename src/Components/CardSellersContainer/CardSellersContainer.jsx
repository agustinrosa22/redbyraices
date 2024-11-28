import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers, getPropertiesBySeller } from '../../Redux/Actions/actions'; 
import CardSellers from '../CardSellers/CardSellers';
import styles from './CardSellersContainer.module.css';

const CardSellersContainer = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.sellers.data); 
  const sellerProperties = useSelector((state) => state.sellerProperties); 
  const error = useSelector((state) => state.error);

  const [filter, setFilter] = useState('all'); // Estado local para almacenar el filtro

  useEffect(() => {
    dispatch(getAllSellers()); 
  }, [dispatch]);

  useEffect(() => {
    if (sellers && sellers.length > 0) {
      sellers.forEach((seller) => {
        dispatch(getPropertiesBySeller(seller.id));
      });
    }
  }, [sellers, dispatch]);

  if (error) {
    return <p>Error: {error}</p>; 
  }

  if (!Array.isArray(sellers)) {
    console.error('sellers no es un array:', sellers);
    return <p>Hubo un problema al cargar los vendedores.</p>;
  }

  if (sellers.length === 0) {
    return <p>No hay vendedores disponibles.</p>; 
  }

  // Filtrar vendedores basado en el filtro seleccionado
  const filteredSellers = sellers.filter((seller) => {
    if (filter === 'all') return true;
    if (filter === 'active') return seller.status === true;
    if (filter === 'inactive') return seller.status === false;
    return true;
  });

  const numVendedores = filteredSellers.length;

  // Calcular la suma total de propiedades
  const totalPropertiesCount = filteredSellers.reduce((total, seller) => {
    const propertiesCount = sellerProperties[seller.id]?.length || 0;
    return total + propertiesCount;
  }, 0);

  return (
    <div className={styles.containerWrapper}>
   <div className={styles.containerButton}>
  <button className={styles.filterButton} onClick={() => setFilter('all')}>Todos</button>
  <button className={styles.filterButton} onClick={() => setFilter('active')}>Activos</button>
  <button className={styles.filterButton} onClick={() => setFilter('inactive')}>Inactivos</button>
</div>
      <h2 className={styles.quantityTitle}>
        Cantidad de vendedores: <span>{numVendedores}</span>
      </h2>

      <div className={styles.cardContainer}>
        {filteredSellers.map((seller) => {
          const propertiesCount = sellerProperties[seller.id]?.length || 0;
          return (
            <CardSellers key={seller.id} seller={seller} propertiesCount={propertiesCount} />
          );
        })}
      </div>

      <h3 className={styles.totalPropertiesTitle}>
        Total de propiedades: <span>{totalPropertiesCount}</span>
      </h3>
    </div>
  );
};

export default CardSellersContainer;

  