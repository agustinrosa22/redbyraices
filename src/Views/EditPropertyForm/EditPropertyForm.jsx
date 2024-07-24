import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { editProperty } from '../../Redux/Actions/actions';
import styles from './EditPropertyForm.module.css';

const EditPropertyForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    propertyType: '',
    statusProperty: false,
    videoLink: '',
    currency: 'USD',
    price: '',
    currencyExpenses: 'USD',
    expenses: '',
    totalSquareMeters: '',
    coveredSquareMeters: '',
    semiCoveredSquareMeters: '',
    uncovered: '',
    land: '',
    age: '',
    commissionSellerType: '%',
    commissionBuyerType: '%',
    sellerCommission: '',
    buyerCommission: '',
    availableDate: '',
    expirationDate: '',
    location: [],
    street: '',
    number: '',
    country: '',
    province: '',
    departments: '',
    locality: '',
    neighborhood: '',
    privateNeighborhood: '',
    environments: '',
    rooms: '',
    bathrooms: '',
    toilettes: '',
    garages: '',
    title: '',
    description: '',
    floorPlans: '',
    isForSale: false,
    isForRent: false,
    isFinished: false,
    isUnderDevelopment: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        const propertyData = response.data.data;
        setFormData({
          price: propertyData.price,
          description: propertyData.description,
          propertyType: propertyData.propertyType,
          videoLink: propertyData.videoLink,
          currency: propertyData.currency,
          currencyExpenses: propertyData.currencyExpenses,
          expenses: propertyData.expenses,
          totalSquareMeters: propertyData.totalSquareMeters,
          semiCoveredSquareMeters: propertyData.semiCoveredSquareMeters,
          uncovered: propertyData.uncovered,
          land: propertyData.land,
          age: propertyData.age,
          commissionSellerType: propertyData.commissionSellerType,
          commissionBuyerType: propertyData.commissionBuyerType,
          sellerCommission: propertyData.sellerCommission,
          buyerCommission: propertyData.buyerCommission,
          availableDate: propertyData.availableDate,
          expirationDate: propertyData.expirationDate,
          location: propertyData.location,
          street: propertyData.street,
          number: propertyData.number,
          country: propertyData.country,
          province: propertyData.province,
          departments: propertyData.departments,
          locality: propertyData.locality,
          neighborhood: propertyData.neighborhood,
          privateNeighborhood: propertyData.privateNeighborhood,
          environments: propertyData.environments,
          rooms: propertyData.rooms,
          bathrooms: propertyData.bathrooms,
          toilettes: propertyData.toilettes,
          garages: propertyData.garages,
          title: propertyData.title,
          floorPlans: propertyData.floorPlans,
          isForSale: propertyData.isForSale,
          isForRent: propertyData.isForRent,
          isFinished: propertyData.isFinished,
          isUnderDevelopment: propertyData.isUnderDevelopment,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = (name) => {
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProperty(id, formData));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Editar Propiedad</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Precio:
          <input
            className={styles.input}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
        propertyType:
          <textarea
            className={styles.input}
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio:
          <input
            className={styles.input}
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          En Venta:
          <button
            type="button"
            className={formData.isForSale ? styles.buttonActive : styles.buttonInactive}
            onClick={() => handleToggle('isForSale')}
          >
            {formData.isForSale ? 'Sí' : 'No'}
          </button>
        </label>
        <label>
          En Alquiler:
          <button
            type="button"
            className={formData.isForRent ? styles.buttonActive : styles.buttonInactive}
            onClick={() => handleToggle('isForRent')}
          >
            {formData.isForRent ? 'Sí' : 'No'}
          </button>
        </label>
        <label>
          Finalizado:
          <button
            type="button"
            className={formData.isFinished ? styles.buttonActive : styles.buttonInactive}
            onClick={() => handleToggle('isFinished')}
          >
            {formData.isFinished ? 'Sí' : 'No'}
          </button>
        </label>
        <label>
          En Desarrollo:
          <button
            type="button"
            className={formData.isUnderDevelopment ? styles.buttonActive : styles.buttonInactive}
            onClick={() => handleToggle('isUnderDevelopment')}
          >
            {formData.isUnderDevelopment ? 'Sí' : 'No'}
          </button>
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditPropertyForm;
