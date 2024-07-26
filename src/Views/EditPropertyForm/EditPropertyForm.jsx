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
    dispatch(editProperty(id, formData,));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedFormData = { ...formData, statusProperty: false };
  //   dispatch(editProperty(id, updatedFormData));
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Editar Propiedad</h1>
      <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>
        propertyType:
          <textarea
            className={styles.input}
            name="propertyType"
            type="text"
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
        </div>
        <label>       
        videoLink:
          <input
            className={styles.input}
            name="videoLink"
            type="text"
            value={formData.videoLink}
            onChange={handleChange}
          />
        </label>    
        <label>
        expenses:
          <input
            className={styles.input}
            name="expenses"
            type="number"
            value={formData.expenses}
            onChange={handleChange}
          />
        </label>   
         <label>
        totalSquareMeters:
          <input
            className={styles.input}
            type="number"
            name="totalSquareMeters"
            value={formData.totalSquareMeters}
            onChange={handleChange}
          />
        </label>
        <label>
        semiCoveredSquareMeters:
          <input
            className={styles.input}
            type="number"
            name="semiCoveredSquareMeters"
            value={formData.semiCoveredSquareMeters}
            onChange={handleChange}
          />
        </label>
        <label>
        uncovered:
          <input
            className={styles.input}
            type="number"
            name="uncovered"
            value={formData.uncovered}
            onChange={handleChange}
          />
        </label>
        <label>
        land:
          <input
            className={styles.input}
            type="number"
            name="land"
            value={formData.land}
            onChange={handleChange}
          />
        </label>
        <label>
        age:
          <input
            className={styles.input}
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <label>
        commissionSellerType:
          <input
            className={styles.input}
            type="text"
            name="commissionSellerType"
            value={formData.commissionSellerType}
            onChange={handleChange}
          />
        </label>
        <label>
        commissionBuyerType:
          <input
            className={styles.commissionBuyerType}
            type="text"
            name="commissionBuyerType"
            value={formData.commissionBuyerType}
            onChange={handleChange}
          />
        </label>
        <label>
        sellerCommission:
          <input
            className={styles.input}
            type="number"
            name="sellerCommission"
            value={formData.sellerCommission}
            onChange={handleChange}
          />
        </label>
        <label>
        buyerCommission:
          <input
            className={styles.input}
            type="number"
            name="buyerCommission"
            value={formData.buyerCommission}
            onChange={handleChange}
          />
        </label>
        <label>
        availableDate:
          <input
            className={styles.input}
            type="date"
            name="availableDate"
            value={formData.availableDate}
            onChange={handleChange}
          />
        </label>
        <label>
        expirationDate:
          <input
            className={styles.input}
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </label>
        <label>
        street:
          <input
            className={styles.input}
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </label>
        <label>
        number:
          <input
            className={styles.input}
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </label>
        <label>
        country:
          <input
            className={styles.input}
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
        province:
          <input
            className={styles.input}
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </label>
        <label>
        departments:
          <input
            className={styles.input}
            type="text"
            name="departments"
            value={formData.departments}
            onChange={handleChange}
          />
        </label>
        <label>
        locality:
          <input
            className={styles.input}
           type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
          />
        </label>
        <label>
        neighborhood:
          <input
            className={styles.input}
           type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
        </label>
        <label>
        privateNeighborhood:
          <input
            className={styles.input}
           type="text"
            name="privateNeighborhood"
            value={formData.privateNeighborhood}
            onChange={handleChange}
          />
        </label>
        <label>
        environments:
          <input
            className={styles.input}
           type="number"
            name="environments"
            value={formData.environments}
            onChange={handleChange}
          />
        </label>
        <label>
        rooms:
          <input
            className={styles.input}
           type='number'
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
          />
        </label>
        <label>
        bathrooms:
          <input
            className={styles.bathrooms}
            type='number'
            name="locality"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
        toilettes:
          <input
            className={styles.input}
             type='number'
            name="toilettes"
            value={formData.toilettes}
            onChange={handleChange}
          />
        </label>
        <label>
        garages:
          <input
            className={styles.input}
            type='number'
            name="garages"
            value={formData.garages}
            onChange={handleChange}
          />
        </label>
        <label>
        floorPlans:
          <input
            className={styles.input}
           type='number'
            name="floorPlans"
            value={formData.floorPlans}
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
