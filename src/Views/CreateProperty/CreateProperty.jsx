import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProperty } from '../../Redux/Actions/actions';
import { getAllUsers } from '../../Redux/Actions/actions';
import style from './CreateProperty.module.css'


const CreateProperty = () => {
  const dispatch = useDispatch();
  const sellerId = useSelector(state => state.userId);
  const users = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log("userId:", sellerId);

  const [formData, setFormData] = useState({
    propertyType: '',
    photo: '',
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
    location: '',
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
    documentation: '',
    isForSale: false,
    isForRent: false,
    isFinished: false,
    isUnderDevelopment: false,
    exclusiveContract: false,
    cartel: false,
    financing: false,
    suitableCredit: false,
    commercialSuitable: false,
    professionalSuitable: false,
    suitableForReducedMobility: false,
    pozo: false,
    CountryOrPrivateNeighborhood: false,
    sellerId: sellerId,
    userId: "",
  });
 
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFormData({ ...formData, userId: user.id });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
  
    // Verificar si se están modificando los campos de metros cuadrados
    if (name === "coveredSquareMeters" || name === "semiCoveredSquareMeters" || name === "uncovered" || name === "land") {
      // Calcular el total de metros cuadrados
      const totalSquareMeters = calculateTotalSquareMeters(updatedFormData);
      updatedFormData = { ...updatedFormData, totalSquareMeters };
    }
  
    setFormData(updatedFormData);
    console.log("Datos del formulario actualizados:", updatedFormData);
  };

  const calculateTotalSquareMeters = (data) => {
    const { coveredSquareMeters, semiCoveredSquareMeters, uncovered } = data;
    const total = parseFloat(coveredSquareMeters || 0) +
                  parseFloat(semiCoveredSquareMeters || 0) +
                  parseFloat(uncovered || 0) 
    return total;
  };

  const handleSaleButtonClick = () => {
    setFormData({
      ...formData,
      isForSale: true,
      isForRent: false,
    });
  };
  
  const handleRentButtonClick = () => {
    setFormData({
      ...formData,
      isForSale: false,
      isForRent: true,
    });
  };

  const handleChangePropertyType = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, propertyType: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProperty(formData));
    // Resetear el formulario o realizar otras acciones necesarias después de enviar los datos
     console.log("Form Data:", formData);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
         <div className={style.formGroup}>
         <div className={style.userList}>
        <h2>Clientes</h2>
        {users.map(user => (
          <div
            key={user.id}
            className={`${style.userCard} ${selectedUser && selectedUser.id === user.id ? style.selected : ''}`}
            onClick={() => handleUserSelect(user)}
          >
            <h3 className={style.Username}>{user.name} {user.last_name}</h3>
            <p className={style.Userinfo}>{user.mail}</p>
            <p className={style.Userinfo}>{user.phone_number}</p>
            {/* Agrega más detalles del usuario según sea necesario */}
          </div>
        ))}
      </div>
      <h2>Tipo de operación</h2>
      <div>
          <button
            type="button"
            onClick={handleSaleButtonClick}
            className={`${style.operationButton} ${formData.isForSale ? style.selected : ''}`}
          >
            Venta
          </button>
          <button
            type="button"
            onClick={handleRentButtonClick}
            className={`${style.operationButton} ${formData.isForRent ? style.selected : ''}`}
          >
            Alquiler
          </button>
        </div>
        <h2>Tipo de propiedad</h2>
        <select className={style.propertyTypeDropdown} onChange={handleChangePropertyType}>
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
          <option value="ph">PH</option>
          <option value="local">Local</option>
          <option value="terrenos y lotes">Terrenos y lotes</option>
          <option value="campos y chacras">Campos y chacras</option>
          <option value="fondo de comercio">Fondo de comercio</option>
          <option value="cochera">Cochera</option>
          <option value="oficina">Oficina</option>
          <option value="galpon">Galpón</option>
          <option value="quinta">Quinta</option>
          <option value="otros">Otros</option>
        </select>
    </div>
    <div className={style.formGroup}>
 
      </div>
  <div className={style.formGroup}>
    <h2>Precio</h2>
  <select id="currency" name="currency" value={formData.currency} onChange={handleChange}>
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
      <input type="number" name="price" value={formData.price} onChange={handleChange} />
    </div>
    <div className={style.formGroup}>
          <h2>Expensas</h2>
      <select id="currencyExpenses" name="currencyExpenses" value={formData.currencyExpenses} onChange={handleChange}>
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
      <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} />
    </div>
    <div className={style.formGroup}>

      <h2>Comision del Vendedor</h2>
      <select id="commissionSellerType" name="commissionSellerType" value={formData.commissionSellerType} onChange={handleChange}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="sellerCommission" value={formData.sellerCommission} onChange={handleChange} />
 </div>

 <div className={style.formGroup}>
   
      <h2>Comision del Comprador</h2>
      <select id="commissionBuyerType" name="commissionBuyerType" value={formData.commissionBuyerType} onChange={handleChange}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="buyerCommission" value={formData.buyerCommission} onChange={handleChange} />

    </div>
    <div className={style.formGroup}></div>
    <h2>Fecha disponible</h2>
      <input type="date" name="availableDate" value={formData.availableDate} onChange={handleChange} />
    
 <div className={style.formGroup}>
          <h2>fecha de vencimiento</h2>
      <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
 </div>

 <div className={style.formGroup}>

     <h2>Ubicacion</h2>
     <h3>Calle</h3>
      <input type="text" name="street" value={formData.street} onChange={handleChange} />
      <h3>Numeracion</h3>
      <input type="text" name="number" value={formData.number} onChange={handleChange} />
      <h3>Pais</h3>
      <input type="text" name="country" value={formData.country} onChange={handleChange} />
      <h3>Provincia</h3>
      <input type="text" name="province" value={formData.province} onChange={handleChange} />
      <h3>Departamento</h3>
      <input type="text" name="departments" value={formData.departments} onChange={handleChange} />
      <h3>Localidad</h3>
      <input type="text" name="locality" value={formData.locality} onChange={handleChange} />
      <h3>Barrio</h3>
      <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
      <h3>Barrio privado</h3>
      <input type="text" name="privateNeighborhood" value={formData.privateNeighborhood} onChange={handleChange} />
    
 </div>

 <div className={style.formGroup}>
   <h2>Hambientes</h2>
      <input type="number" name="environments" value={formData.environments} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2>Dormitorios</h2>
      <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2>Baños</h2>
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2>Toilettes</h2>
      <input type="number" name="toilettes" value={formData.toilettes} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2>Cocheras</h2>
      <input type="number" name="garages" value={formData.garages} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
  <h2>Superficie</h2>
  <label>
    Cubierto (m²):
    <input type="number" name="coveredSquareMeters" value={formData.coveredSquareMeters} onChange={handleChange} />
  </label>
</div>

<div className={style.formGroup}>
  <label>
    Semicubierto (m²):
    <input type="number" name="semiCoveredSquareMeters" value={formData.semiCoveredSquareMeters} onChange={handleChange} />
  </label>
</div>

<div className={style.formGroup}>
  <label>
    Descubierto (m²):
    <input type="number" name="uncovered" value={formData.uncovered} onChange={handleChange} />
  </label>
</div>

<div className={style.formGroup}>
  <label>
    Terreno (m²):
    <input type="number" name="land" value={formData.land} onChange={handleChange} />
  </label>
</div>

<div className={style.formGroup}>
  <h2>Total (m²): {formData.totalSquareMeters}</h2>
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
    <label>
      Age:
      <input type="text" name="age" value={formData.age} onChange={handleChange} />
    </label>
 
 
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
    <button type="submit">Submit</button>
  </form>
  );
};

export default CreateProperty;

