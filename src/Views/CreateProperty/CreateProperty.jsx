import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProperty } from '../../Redux/Actions/actions';
import { getAllUsers } from '../../Redux/Actions/actions';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox  } from '@react-google-maps/api';
import style from './CreateProperty.module.css'
import logoEmpresa from '../../Assets/favicon-byraices.png';
import MultiplesImagenes from '../../Components/MultiplesImagenes/MultiplesImagenes';


const CreateProperty = () => {
  const dispatch = useDispatch();
  const sellerId = useSelector(state => state.userId);
  const users = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mapLocation, setMapLocation] = useState({ lat: -32.8908, lng: -68.8272 });
  const [searchBox, setSearchBox] = useState(null);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const place = places[0]; // Tomamos solo el primer lugar de la lista
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMapLocation(location);
    }
  };
  // console.log("sellerId:", sellerId);

  const [formData, setFormData] = useState({
    propertyType: '',
    // photo: [],
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
 
  const detailLabels = {
    exclusiveContract: 'Contrato Exclusivo',
    cartel: 'Cartel',
    financing: 'Financiamiento',
    suitableCredit: 'Apto a Credito',
    commercialSuitable: 'Apto Comercial',
    professionalSuitable: 'Apto Profesional',
    suitableForReducedMobility: 'Apto para Movilidad Reducida',
    pozo: 'Pozo',
    CountryOrPrivateNeighborhood: 'Country o barrio Privado',
  };
  
  const amenityLabels = {
    aireAcondicionado: 'Aire Acondicionado',
    portonAutomatico: 'Portón Automático',
    gimnasio: 'Gimnasio',
    losaRadiante: 'Losa Radiante',
    chimenea: 'Chimenea',
    hidromasaje: 'Hidromasaje',
    seguridad: 'Seguridad',
    pileta: 'Pileta',
    caldera: 'Caldera',
    businessCenter: 'Business Center',
    areaCine: 'Área de Cine',
    cisterna: 'Cisterna',
    laundry: 'Laundry',
    estacionamientoVisitas: 'Estacionamiento de Visitas',
    ascensor: 'Ascensor',
    salonUsosMultiples: 'Salón de Usos Múltiples',
    areaDeJuegosInfantiles: 'Área de Juegos Infantiles',
    canchaTenis: 'Cancha de Tenis',
    recepcion: 'Recepción',
    areasVerdes: 'Áreas Verdes',
    valetParking: 'Valet Parking',
    canchaBasquetbol: 'Cancha de Básquetbol',
    canchaFutbol: 'Cancha de Fútbol',
    canchaPaddle: 'Cancha de Paddle',
    solarium: 'Solarium',
    jardinDeInvierno: 'Jardín de Invierno',
    piletaCubierta: 'Pileta Cubierta',
    piletaClimatizada: 'Pileta Climatizada',
    sauna: 'Sauna',
    bar: 'Bar',
    calefaccion: 'Calefacción',
  };

  const characteristicLabels = {
    placard: 'Placard',
    parilla: 'Parrilla',
    desayunador: 'Desayunador', 
    orientacionSur: 'Orientación Sur',
    orientacionOeste: 'Orientación Oeste',
    orientacionNorte: 'Orientación Norte',
    orientacionEste: 'Orientación Este',
    accesoDeCocheraRampaFija: 'Acceso de Cochera - Rampa Fija',
    accesoDeCocheraRampaMovil: 'Acceso de Cochera - Rampa Móvil',
    accesoDeCocheraAscensor: 'Acceso de Cochera - Ascensor',
    accesoDeCocheraHorizontal: 'Acceso de Cochera - Horizontal',
    disposicionContrafrente: 'Disposición - Contrafrente',
    disposicionFrente: 'Disposición - Frente',
    disposicionInterno: 'Disposición - Interno',
    disposicionLateral: 'Disposición - Lateral',
    amoblado: 'Amoblado',
    orientacionNoroeste: 'Orientación Noroeste', 
    orientacionNoreste: 'Orientación Noreste',
    orientacionSuroeste: 'Orientación Suroeste',
    orientacionSureste: 'Orientación Sureste',
    deck: 'Deck',
    tipoDeCampoOtro: 'Tipo de Campo - Otro',
    tipoDeCampoFruticula: 'Tipo de Campo - Frutícola',
    tipoDeCampoAgricola: 'Tipo de Campo - Agrícola',
    tipoDeCampoChara: 'Tipo de Campo - Chacra',
    tipoDeCampoCriadero: 'Tipo de Campo - Criadero',
    tipoDeCampoTambero: 'Tipo de Campo - Tambero',
    tipoDeCampoFloricultura: 'Tipo de Campo - Floricultura',
    tipoDeCampoForestal: 'Tipo de Campo - Forestal',
    tipoDeCampoGanadero: 'Tipo de Campo - Ganadero',
    tipoDeCampoHaras: 'Tipo de Campo - Haras',
    bodegas: 'Bodegas',
    tipoDeBodegaComercial: 'Tipo de Bodega - Comercial',
    tipoDeBodegaNaveIndustrial: 'Tipo de Bodega - Nave Industrial',
    tipoDeBodegaAlmacen: 'Tipo de Bodega - Almacén',
    biblioteca: 'Biblioteca',
    galpon: 'Galpón',
    sotano: 'Sótano',
    baulera: 'Baulera',
    permiteMascota: 'Permite Mascota',
    aptoTuristico: 'Apto Turístico',
  };

  const environmentLabels = {
    dormitorio: 'Dormitorio',
    comedor: 'Comedor',
    vestidor: 'Vestidor',
    jardin: 'Jardín',
    baño: 'Baño',
    patio: 'Patio',
    terraza: 'Terraza',
    estudio: 'Estudio',
    lavadero: 'Lavadero',
    altillo: 'Altillo',
    playroom: 'Playroom',
    lobby: 'Lobby',
    quincho: 'Quincho',
    salaDeReuniones: 'Sala de Reuniones', 
    balcon: 'Balcón',
    pileta: 'Pileta',
    cocina: 'Cocina',
    toilette: 'Toilette',
    habitacion: 'Habitación',
    living: 'Living',
    otro: 'Otro',
  };

  const serviceLabels = {
    electricidad: 'Electricidad',
    agua: 'Agua',
    gas: 'Gas',
    internet: 'Internet',
    telefono: 'Teléfono',
    desagueCloacal: 'Desagüe Cloacal',
    televisionPorCable: 'Televisión por Cable',
    alarma: 'Alarma',
    televisionSatelital: 'Televisión Satelital',
    aguaCorriente: 'Agua Corriente',
  };


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
    // console.log("Datos del formulario actualizados:", updatedFormData);
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

 

  const handleMapClick = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMapLocation(newLocation);
  };
  
    const mapStyles = {
      height: '400px',
      width: '100%'
    };

 
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const propertyData = { ...formData,
         location: [`${mapLocation.lat}`, `${mapLocation.lng}`] 
        };
      dispatch(createProperty(propertyData));
     
    };

//  const handleSubmit = (e) => {
//   e.preventDefault();
//   const propertyData = { ...formData, location: mapLocation };
//   dispatch(createProperty(propertyData));
//   // Resto del código...
// };

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
      <div className={`${style.formGroup}`}>
  <h2 className={`${style.title}`}>Precio</h2>
  <select
    id="currency"
    name="currency"
    value={formData.currency}
    onChange={handleChange}
    className={`${style.selectInput}`}
  >
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleChange}
    className={`${style.inputNumber}`}
  />
</div>
    <div className={style.formGroup}>
          <h2 className={style.title}>Expensas</h2>
      <select id="currencyExpenses" name="currencyExpenses" value={formData.currencyExpenses} onChange={handleChange} className={`${style.selectInput}`}>
    <option value="USD">USD</option>
    <option value="ARG">ARG</option>
  </select>
      <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} className={`${style.inputNumber}`}/>
    </div>
    <div className={style.formGroup}>

      <h2 className={style.title}>Comision del Vendedor</h2>
      <select id="commissionSellerType" name="commissionSellerType" value={formData.commissionSellerType} onChange={handleChange}  className={`${style.selectInput}`}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="sellerCommission" value={formData.sellerCommission} onChange={handleChange}  className={`${style.inputNumber}`}/>
 </div>

 <div className={style.formGroup}>
   
      <h2 className={style.title}>Comision del Comprador</h2>
      <select id="commissionBuyerType" name="commissionBuyerType" value={formData.commissionBuyerType} onChange={handleChange} className={`${style.selectInput}`}>
    <option value="%">%</option>
    <option value="Fijo">Fijo</option>
  </select>
      <input type="number" name="buyerCommission" value={formData.buyerCommission} onChange={handleChange} className={`${style.inputNumber}`}/>

    </div>
    <div className={style.formGroup}>
    <h2 className={style.title}>Fecha disponible</h2>
      <input type="date" name="availableDate" value={formData.availableDate} onChange={handleChange} />
      </div>
 <div className={style.formGroup}>
          <h2 className={style.title}>Fecha de vencimiento</h2>
      <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
 </div>

 <div className={style.formUbication}>
      <h2 className={style.title}>Ubicación</h2>
  <div className={style.formRow}>
    <div className={style.formColumn}>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Calle</h3>
        <input type="text" name="street" value={formData.street} onChange={handleChange} className={style.inputText} />
      </div>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Numeración</h3>
        <input type="text" name="number" value={formData.number} onChange={handleChange} className={style.inputText} />
      </div>
    </div>
    <div className={style.formColumn}>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>País</h3>
        <input type="text" name="country" value={formData.country} onChange={handleChange} className={style.inputText} />
      </div>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Provincia</h3>
        <input type="text" name="province" value={formData.province} onChange={handleChange} className={style.inputText} />
      </div>
    </div>
  </div>
  <div className={style.formRow}>
    <div className={style.formColumn}>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Departamento</h3>
        <input type="text" name="departments" value={formData.departments} onChange={handleChange} className={style.inputText} />
      </div>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Localidad</h3>
        <input type="text" name="locality" value={formData.locality} onChange={handleChange} className={style.inputText} />
      </div>
    </div>
    <div className={style.formColumn}>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Barrio</h3>
        <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className={style.inputText} />
      </div>
      <div className={style.inputGroup}>
        <h3 className={style.subtitle}>Barrio privado</h3>
        <input type="text" name="privateNeighborhood" value={formData.privateNeighborhood} onChange={handleChange} className={style.inputText} />
      </div>
    </div>
  </div>
  <LoadScript googleMapsApiKey="AIzaSyD5V2B-G8s7P7Hh6cZ6UyucD0n91y-JI3I" libraries={["places"]}>
  <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Buscar dirección..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
             
            }}
          />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={mapLocation}
          onClick={handleMapClick} // Agregar este evento onClick
        >
          <Marker
            position={mapLocation}
            draggable={true}
            onDragEnd={(e) => handleMapClick(e)} // Este evento permite actualizar la ubicación cuando se arrastra el marcador
          >
            <img src={logoEmpresa} alt="Logo de tu empresa" style={{ width: '50px', height: '50px' }} />
          </Marker>
        </GoogleMap>
      </LoadScript>
</div>


<div className={style.formGroup}>
  <h2 className={style.title}>Hambientes</h2>
  <input
    type="number"
    name="environments"
    value={formData.environments}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Dormitorios</h2>
  <input
    type="number"
    name="rooms"
    value={formData.rooms}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Baños</h2>
  <input
    type="number"
    name="bathrooms"
    value={formData.bathrooms}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Toilettes</h2>
  <input
    type="number"
    name="toilettes"
    value={formData.toilettes}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Cocheras</h2>
  <input
    type="number"
    name="garages"
    value={formData.garages}
    onChange={handleChange}
    className={style.inputText}
  />
</div>


    <h2 className={style.title}>Superficie</h2>
<div className={style.formGroupMedidas}>
  <div className={style.inputGroup}>
    <div className={style.inputContainer}>
      <h3 className={style.subtitleM}>Cubierto (m²)</h3>
      <input
        type="number"
        name="coveredSquareMeters"
        value={formData.coveredSquareMeters}
        onChange={handleChange}
        className={style.inputM}
      />
    </div>
    <div className={style.inputContainer}>
    <h3 className={style.subtitleM}>Semicubierto (m²)</h3>
       
      <input
        type="number"
        name="semiCoveredSquareMeters"
        value={formData.semiCoveredSquareMeters}
        onChange={handleChange}
        className={style.inputM}
      />
    </div>
    <div className={style.inputContainer}>
    <h3 className={style.subtitleM}>Descubierto (m²)</h3>
    
      <input
        type="number"
        name="uncovered"
        value={formData.uncovered}
        onChange={handleChange}
        className={style.inputM}
      />
    </div>
    <div className={style.inputContainer}>
      <h3 className={style.subtitleM}>Terreno (m²)</h3>

      <input
        type="number"
        name="land"
        value={formData.land}
        onChange={handleChange}
        className={style.inputM}
      />
    </div>
    <div className={style.inputContainer}>
      <h2 className={style.label}>Total (m²): {formData.totalSquareMeters}</h2>
    </div>
  </div>
</div>

<div className={style.formGroup}>
      <h2 className={style.title}>Año de construccion</h2>
      <input className={style.inputAge} type="number" name="age" placeholder='Ej: 2010' value={formData.age} onChange={handleChange} />
    </div>

  <h2 className={style.title}>Detalles de la propiedad</h2>
    <div className={style.formGroupChechbox}>
  {Object.entries(formData.detailsProperty).map(([detail, value]) => (
    <div key={detail}>
      <input
        type="checkbox"
        id={detail}
        checked={value}
        onChange={() => handleDetailPropertyOptionChange(detail)}
      />
      <label htmlFor={detail}>{detailLabels[detail]}</label>
    </div>
  ))}
</div>

      
  <h2 className={style.title}>Comodidades</h2>
  <div className={style.formGroupChechbox}>
  {Object.entries(formData.amenities).map(([amenity, value]) => (
    <div key={amenity} className={style.checkboxContainer}>
      <label>
        <input
          type="checkbox"
          name={amenity}
          checked={value}
          onChange={handleAmenityChange}
        />
        {amenityLabels[amenity]}
      </label>
    </div>
  ))}
</div>
        
          <h2 className={style.title}>Caracteristicas</h2>
          <div className={style.formGroupChechbox}>
          {Object.entries(formData.characteristics).map(([option, value]) => (
         <div key={option} className={style.checkboxContainer}>
            <input
              type="checkbox"
              id={option}
              checked={value}
              onChange={() => handleCharacteristicOptionChange(option)}
            />
              <label htmlFor={option}>{characteristicLabels[option]}</label>
          </div>
        ))}
        </div>
        <h2 className={style.title}>Ambientes</h2>
        <div className={style.formGroupChechbox}>
       {Object.entries(formData.environmentsOptions).map(([option, value]) => (
  <div key={option}>
    <input
      type="checkbox"
      id={option}
      checked={value}
      onChange={() => handleEnvironmentOptionChange(option)}
    />
    <label htmlFor={option}>{environmentLabels[option]}</label>
  </div>
))}
</div>

<h2 className={style.title}>servicios</h2>
<div className={style.formGroupChechbox}>
{Object.entries(formData.services).map(([service, value]) => (
  <div key={service}>
    <input
      type="checkbox"
      id={service}
      checked={value}
      onChange={() => handleServiceOptionChange(service)}
    />
   <label htmlFor={service}>{serviceLabels[service]}</label>
  </div>
))}
</div>
 <div className={style.formGroup}>

    <label>
     <h2 className={style.title}>Titulo</h2>
      <input className={style.inputText} type="text" name="title" placeholder='Ingrese un titulo' value={formData.title} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
     <h2 className={style.title}>Descripcion</h2>
      <textarea className={style.inputDescription} type="text" name="description" placeholder='Ingrese una descripcion' cols="30" rows="5" value={formData.description} onChange={handleChange} />
    </label>
 </div>

 <MultiplesImagenes/>
    <div className={style.formGroup}>

  <h2 className={style.title}>
  Video Link
  </h2>
     
      <input className={style.inputText} type="text" name="videoLink" placeholder='Link de YouTube' value={formData.videoLink} onChange={handleChange} />
   
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

