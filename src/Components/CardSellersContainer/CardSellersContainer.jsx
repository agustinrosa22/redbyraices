import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers, getPropertiesBySeller } from '../../Redux/Actions/actions'; 
import CardSellers from '../CardSellers/CardSellers';
import styles from './CardSellersContainer.module.css';

const CardSellersContainer = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.sellers.data); 
  const sellerProperties = useSelector((state) => state.sellerProperties); // Debes asegurarte de que este estado existe
  const error = useSelector((state) => state.error); 

  useEffect(() => {
    dispatch(getAllSellers()); 
  }, [dispatch]);

  useEffect(() => {
    if (sellers && sellers.length > 0) {
      // Para cada vendedor, obtener la cantidad de propiedades
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

  const numVendedores = sellers.length;

  // Calcular la suma total de propiedades
  const totalPropertiesCount = sellers.reduce((total, seller) => {
    const propertiesCount = sellerProperties[seller.id]?.length || 0;
    return total + propertiesCount;
  }, 0);

  return (
    <div className={styles.containerWrapper}>
      <h2 className={styles.quantityTitle}>
        Cantidad de vendedores: <span>{numVendedores}</span>
      </h2>
     
  
      <div className={styles.cardContainer}>
        {sellers.map((seller) => {
          const propertiesCount = sellerProperties[seller.id]?.length || 0; // Debe ser un array
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
}

export default CardSellersContainer;
  