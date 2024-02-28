import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProperty } from '../../Redux/Actions/actions';
import style from './CreateProperty.module.css'


const CreateProperty = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  // console.log("userId:", userId);

  const [formData, setFormData] = useState({
    propertyType: '',
    photo: '',
    videoLink: '',
    price: '',
    expenses: '',
    totalSquareMeters: '',
    coveredSquareMeters: '',
    age: '',
    sellerCommission: '',
    buyerCommission: '',
    availableDate: '',
    expirationDate: '',
    location: '',
    surface: '',
    title: '',
    description: '',
    floorPlans: '',
    documentation: '',
    isForSale: false,
    isForRent: false,
    isFinished: false,
    isUnderDevelopment: false,
    sellerId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProperty(formData));
    // Resetear el formulario o realizar otras acciones necesarias después de enviar los datos
    //  console.log("Form Data:", formData);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
         <div className={style.formGroup}>
    <label>
      Property Type:
      <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} />
    </label>
    </div>
    <div className={style.formGroup}>
    <label>
      Photo:
      <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
    </label>
    </div>
    <div className={style.formGroup}>

    <label>
      Video Link:
      <input type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} />
    </label>
    </div>
    <div className={style.formGroup}>

    <label>
      Price:
      <input type="text" name="price" value={formData.price} onChange={handleChange} />
    </label>
    </div>
    <div className={style.formGroup}>

    <label>
      Expenses:
      <input type="text" name="expenses" value={formData.expenses} onChange={handleChange} />
    </label>
    </div>
    <div className={style.formGroup}>

    <label>
      Total Square Meters:
      <input type="text" name="totalSquareMeters" value={formData.totalSquareMeters} onChange={handleChange} />
    </label>
    </div>
     <div className={style.formGroup}>

    <label>
      Covered Square Meters:
      <input type="text" name="coveredSquareMeters" value={formData.coveredSquareMeters} onChange={handleChange} />
    </label>
     </div>
    <label>
      Age:
      <input type="text" name="age" value={formData.age} onChange={handleChange} />
    </label>
 <div className={style.formGroup}>

    <label>
      Seller Commission:
      <input type="text" name="sellerCommission" value={formData.sellerCommission} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}></div>
    <label>
      Buyer Commission:
      <input type="text" name="buyerCommission" value={formData.buyerCommission} onChange={handleChange} />
    </label>
 <div className={style.formGroup}></div>
    <label>
      Available Date:
      <input type="text" name="availableDate" value={formData.availableDate} onChange={handleChange} />
    </label>
 <div className={style.formGroup}>

    <label>
      Expiration Date:
      <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Location:
      <input type="text" name="location" value={formData.location} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Surface:
      <input type="text" name="surface" value={formData.surface} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Title:
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Description:
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Floor Plans:
      <input type="text" name="floorPlans" value={formData.floorPlans} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Documentation:
      <input type="text" name="documentation" value={formData.documentation} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Is For Sale:
      <input type="checkbox" name="isForSale" checked={formData.isForSale} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Is For Rent:
      <input type="checkbox" name="isForRent" checked={formData.isForRent} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Is Finished:
      <input type="checkbox" name="isFinished" checked={formData.isFinished} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
      Is Under Development:
      <input type="checkbox" name="isUnderDevelopment" checked={formData.isUnderDevelopment} onChange={handleChange} />
    </label>
 </div>
    <button type="submit">Submit</button>
  </form>
  );
};

export default CreateProperty;

