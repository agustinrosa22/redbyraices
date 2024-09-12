import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers } from '../../Redux/Actions/actions'; // Asegúrate de importar la acción correctamente
import CardSellers from '../CardSellers/CardSellers';
import styles from './CardSellersContainer.module.css';

const CardSellersContainer = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.sellers.data); // Obtén la lista de vendedores del estado global
  const error = useSelector((state) => state.error); // Obtén cualquier error del estado global
console.log(sellers)
  useEffect(() => {
    dispatch(getAllSellers()); // Despacha la acción para obtener los vendedores cuando el componente se monte
  }, [dispatch]);

  if (error) {
    return <p>Error: {error}</p>; // Muestra un mensaje de error si ocurre
  }

  if (!Array.isArray(sellers)) {
    console.error('sellers no es un array:', sellers);
    return <p>Hubo un problema al cargar los vendedores.</p>;
  }

  if (sellers.length === 0) {
    return <p>No hay vendedores disponibles.</p>; // Mensaje si no hay vendedores
  }

  return (
    <div className={styles.container}>
      {sellers.map((seller) => (
        <CardSellers key={seller.id} seller={seller} />
      ))}
    </div>
  );
};

export default CardSellersContainer;
