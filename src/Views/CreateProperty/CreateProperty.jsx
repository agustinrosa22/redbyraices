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
  // console.log("sellerId:", sellerId);

  const [formData, setFormData] = useState({
    propertyType: '',
    photo: '',
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
    amenities: {
      aireAcondicionado:false,
      portonAutomatico: false,
      gimnasio:false,
      losaRadiante:false,
      chimenea:false,
      hidromasaje:false,
      seguridad:false,
      pileta:false,
      caldera:false,
      businessCenter:false,
      areaCine:false,
      cisterna: false,
      laundry:false,
      estacionamientoVisitas: false,
      ascensor:false,
      salonUsosMultiples: false,
      areaDeJuegosInfantiles: false,
      canchaTenis:false,
      recepcion:false,
      areasVerdes:false,
      valetParking:false,
      canchaBasquetbol:false,
      canchaFutbol: false,
      canchaPaddle:false,
      solarium:false,
      jardinDeInvierno:false,
      piletaCubierta: false,
      piletaClimatizada:false,
      sauna:false,
      bar: false,
      calefaccion: false,
    },
    environmentsOptions: {
      dormitorio:false,
      comedor: false,
      vestidor:false,
      jardin:false,
      baño:false,
      patio:false,
      terraza:false,
      estudio:false,
      lavadero:false,
      altillo:false,
      playroom:false,
      lobby:false,
      quincho:false,
      salaDeReuniones:false, 
      balcon:false,
      pileta:false,
      cocina:false,
      toilette:false,
      habitacion:false,
      living:false,
      otro: false,
    },
    services: {
      electricidad:false,
      agua:false,
      gas:false,
      internet:false,
      telefono:false,
      desagueCloacal:false,
      televisionPorCable:false,
      alarma:false,
      televisionSatelital:false,
      aguaCorriente:false,
    },
    characteristics: {
      placard: false,
        parilla: false,
        desayunador: false, 
        orientacionSur: false,
        orientacionOeste: false,
        orientacionNorte: false,
        orientacionEste: false,
        accesoDeCocheraRampaFija: false,
        accesoDeCocheraRampaMovil: false,
        accesoDeCocheraAscensor: false,
        accesoDeCocheraHorizontal: false,
        disposicionContrafrente: false,
        disposicionFrente: false,
        disposicionInterno: false,
        disposicionLateral: false,
        amoblado: false,
        orientacionNoroeste: false, 
        orientacionNoreste: false,
        orientacionSuroeste: false,
        orientacionSureste: false,
        deck: false,
        tipoDeCampoOtro: false,
        tipoDeCampoFruticula: false,
        tipoDeCampoAgricola: false,
        tipoDeCampoChara: false,
        tipoDeCampoCriadero: false,
        tipoDeCampoTambero: false,
        tipoDeCampoFloricultura: false,
        tipoDeCampoForestal: false,
        tipoDeCampoGanadero: false,
        tipoDeCampoHaras: false,
        bodegas: false,
        tipoDeBodegaComercial: false,
        tipoDeBodegaNaveIndustrial: false,
        tipoDeBodegaAlmacen: false,
        biblioteca: false,
        galpon: false,
        sotano: false,
        baulera: false,
        permiteMascota: false,
        aptoTuristico: false,
    },
    title: '',
    description: '',
    floorPlans: '',
    documentation: '',
    isForSale: false,
    isForRent: false,
    isFinished: false,
    isUnderDevelopment: false,
    detailsProperty: {
        exclusiveContract: false,
        cartel: false,
        financing: false,
        suitableCredit: false,
        commercialSuitable: false,
        professionalSuitable: false,
        suitableForReducedMobility: false,
        pozo: false,
        CountryOrPrivateNeighborhood: false,
    },
    sellerId: '',
    userId: "",
  });
 
  useEffect(() => {
    dispatch(getAllUsers());
    
    // Verificar si el sellerId está disponible en el estado después de cargar los usuarios
    if (sellerId) {
      setFormData(prevFormData => ({
        ...prevFormData,
        sellerId: sellerId,
      }));
    }
  }, [dispatch, sellerId]);
  

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
    const currentIsForSale = formData.isForSale;
    setFormData({
      ...formData,
      isForSale: true,
      isForRent: false,
    });
    if (!currentIsForSale) {
      // Restaurar isForSale a true si no lo estaba antes
      setFormData(prevFormData => ({
        ...prevFormData,
        isForSale: true,
      }));
    }
  };
  
  const handleRentButtonClick = () => {
    const currentIsForSale = formData.isForSale;
    setFormData({
      ...formData,
      isForSale: false,
      isForRent: true,
    });
    if (currentIsForSale) {
      // Restaurar isForSale a false si estaba en true antes
      setFormData(prevFormData => ({
        ...prevFormData,
        isForSale: false,
      }));
    }
  };

  const handleChangePropertyType = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, propertyType: value });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    });
  };

  const handleEnvironmentOptionChange = (option) => {
    setFormData({
      ...formData,
      environmentsOptions: {
        ...formData.environmentsOptions,
        [option]: !formData.environmentsOptions[option]
      }
    });
  };

  const handleCharacteristicOptionChange = (option) => {
    setFormData({
      ...formData,
      characteristics: {
        ...formData.characteristics,
        [option]: !formData.characteristics[option]
      }
    });
  };
  

  const handleDetailPropertyOptionChange = (option) => {
    setFormData({
      ...formData,
      detailsProperty: {
        ...formData.detailsProperty,
        [option]: !formData.detailsProperty[option]
      }
    });
  };
  

  const handleServiceOptionChange = (service) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: !formData.services[service]
      }
    });
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
  <h2 className={style.title}>Clientes</h2>
         <div className={style.centeredContainer}>
  <div className={style.userListContainer}>
    <div className={style.userList}>
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
  </div>
</div>
      <h2 className={style.title}>Tipo de operación</h2>
      <div className={style.operationContainer}>
  <button
    type="button"
    onClick={handleSaleButtonClick}
    className={`${style.operationButton} ${style.sale} ${formData.isForSale ? style.selected : ''}`}
  >
    Venta
  </button>
  <button
    type="button"
    onClick={handleRentButtonClick}
    className={`${style.operationButton} ${style.rent} ${formData.isForRent ? style.selected : ''}`}
  >
    Alquiler
  </button>
</div>
<h2 className={style.title}>Tipo de propiedad</h2>
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
    <h2 className={style.title}>Precio</h2>
  <select id="currency" name="currency" value={formData.currency} onChange={handleChange}>
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
      <input type="number" name="price" value={formData.price} onChange={handleChange} />
    </div>
    <div className={style.formGroup}>
          <h2 className={style.title}>Expensas</h2>
      <select id="currencyExpenses" name="currencyExpenses" value={formData.currencyExpenses} onChange={handleChange}>
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
      <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} />
    </div>
    <div className={style.formGroup}>

      <h2 className={style.title}>Comision del Vendedor</h2>
      <select id="commissionSellerType" name="commissionSellerType" value={formData.commissionSellerType} onChange={handleChange}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="sellerCommission" value={formData.sellerCommission} onChange={handleChange} />
 </div>

 <div className={style.formGroup}>
   
      <h2 className={style.title}>Comision del Comprador</h2>
      <select id="commissionBuyerType" name="commissionBuyerType" value={formData.commissionBuyerType} onChange={handleChange}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="buyerCommission" value={formData.buyerCommission} onChange={handleChange} />

    </div>
    <div className={style.formGroup}></div>
    <h2 className={style.title}>Fecha disponible</h2>
      <input type="date" name="availableDate" value={formData.availableDate} onChange={handleChange} />
    
 <div className={style.formGroup}>
          <h2>fecha de vencimiento</h2>
      <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
 </div>

 <div className={style.formGroup}>

     <h2 className={style.title}>Ubicacion</h2>
     <h3 className={style.title}>Calle</h3>
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
   <h2 className={style.title}>Hambientes</h2>
      <input type="number" name="environments" value={formData.environments} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2 className={style.title}>Dormitorios</h2>
      <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2 className={style.title}>Baños</h2>
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2 className={style.title}>Toilettes</h2>
      <input type="number" name="toilettes" value={formData.toilettes} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
   <h2 className={style.title}>Cocheras</h2>
      <input type="number" name="garages" value={formData.garages} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
  <h2 className={style.title}>Superficie</h2>
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
      <h2 className={style.title}>Año de construccion</h2>
      <input type="number" name="age" placeholder='Ej: 2010' value={formData.age} onChange={handleChange} />
    </div>

    <div className={style.formGroup}>
    <label>

    <div className={style.formGroup}>
  <h2 className={style.title}>Detalles de la propiedad</h2>
  {Object.entries(formData.detailsProperty).map(([detail, value]) => (
    <div key={detail}>
      <input
        type="checkbox"
        id={detail}
        checked={value}
        onChange={() => handleDetailPropertyOptionChange(detail)}
      />
      <label htmlFor={detail}>{detail}</label>
    </div>
  ))}
</div>

      
    <div className={style.formGroup}>
        <h2 className={style.title}>Comodidades</h2>
        {/* Agregar checkboxes para cada amenidad */}
        {Object.entries(formData.amenities).map(([amenity, value]) => (
          <div key={amenity} className={style.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                name={amenity}
                checked={value}
                onChange={handleAmenityChange}
              />
              {amenity}
            </label>
          </div>
        ))}
        </div>
        <div className={style.formGroup}>
          <h2 className={style.title}>Caracteristicas</h2>
          {Object.entries(formData.characteristics).map(([option, value]) => (
         <div key={option} className={style.checkboxContainer}>
            <input
              type="checkbox"
              id={option}
              checked={value}
              onChange={() => handleCharacteristicOptionChange(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}

        </div>
        <h2 className={style.title}>Ambientes</h2>
       {Object.entries(formData.environmentsOptions).map(([option, value]) => (
  <div key={option}>
    <input
      type="checkbox"
      id={option}
      checked={value}
      onChange={() => handleEnvironmentOptionChange(option)}
    />
    <label htmlFor={option}>{option}</label>
  </div>
))}

<h2 className={style.title}>servicios</h2>
{Object.entries(formData.services).map(([service, value]) => (
  <div key={service}>
    <input
      type="checkbox"
      id={service}
      checked={value}
      onChange={() => handleServiceOptionChange(service)}
    />
    <label htmlFor={service}>{service}</label>
  </div>
))}
 <div className={style.formGroup}>

    <label>
     <h2 className={style.title}>Titulo</h2>
      <input type="text" name="title" placeholder='Ingrese un titulo' value={formData.title} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
     <h2 className={style.title}>Descripcion</h2>
      <textarea type="text" name="description" placeholder='Ingrese una descripcion' cols="30" rows="5" value={formData.description} onChange={handleChange} />
    </label>
 </div>

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
      Documentation:
      <input type="text" name="documentation" value={formData.documentation} onChange={handleChange} />
    </label>
 </div>
    <button type="submit">Submit</button>
  </form>
  );
};

export default CreateProperty;

