import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProperty } from '../../Redux/Actions/actions';
import { getAllUsers } from '../../Redux/Actions/actions';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox  } from '@react-google-maps/api';
import style from './CreateProperty.module.css'
import logoEmpresa from '../../Assets/favicon-byraices.png';
import axios from 'axios';
import FileUploader from '../../Components/MultiplesImagenes/MultiplesImagenes';
import Documentacion from '../../Components/Documents/Documentacion';
import loadingGif from '../../Assets/carga.gif';


const CreateProperty = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const sellerId = useSelector(state => state.userId);
  const user = useSelector(state => state.user);
  // const users = useSelector(state => state.users);
  // const [selectedUser, setSelectedUser] = useState(null);
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
    statusProperty: false,
    videoLink: '',
    currency: 'USD',
    price: '',
    currencyExpenses: 'USD',
    expenses: '0',
    totalSquareMeters: '',
    coveredSquareMeters: '',
    semiCoveredSquareMeters: '',
    uncovered: '',
    land: '',
    age: '',
    commissionSellerType: '%',
    commissionBuyerType: '%',
    sellerCommission: '3',
    buyerCommission: '3',
    availableDate: '',
    expirationDate: '',
    location: [],
    photo: [],
    documentation: [],
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
    isForSale: false,
    isForRent: false,
    isFinished: false,
    isUnderDevelopment: false,
    amenities: {
      aireAcondicionado: false,
      portonAutomatico: false,
      gimnasio: false,
      losaRadiante: false,
      chimenea: false,
      hidromasaje: false,
      seguridad: false,
      pileta: false,
      caldera: false,
      businessCenter: false,
      areaCine: false,
      cisterna: false,
      laundry: false,
      estacionamientoVisitas: false,
      ascensor: false,
      salonUsosMultiples: false,
      areaDeJuegosInfantiles: false,
      canchaTenis: false,
      recepcion: false,
      areasVerdes: false,
      valetParking: false,
      canchaBasquetbol: false,
      canchaFutbol: false,
      canchaPaddle: false,
      solarium: false,
      jardinDeInvierno: false,
      piletaCubierta: false,
      piletaClimatizada: false,
      sauna: false,
      bar: false,
      calefaccion: false,
    },
    environmentsOptions: {
      dormitorio: false,
      comedor: false,
      vestidor: false,
      jardin: false,
      baño: false,
      patio: false,
      terraza: false,
      estudio: false,
      lavadero: false,
      altillo: false,
      playroom: false,
      lobby: false,
      quincho: false,
      salaDeReuniones: false,
      balcon: false,
      pileta: false,
      cocina: false,
      toilette: false,
      habitacion: false,
      living: false,
      otro: false,
    },
    services: {
      electricidad: false,
      agua: false,
      gas: false,
      internet: false,
      telefono: false,
      desagueCloacal: false,
      televisionPorCable: false,
      alarma: false,
      televisionSatelital: false,
      aguaCorriente: false,
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
    martillerId: null,
    sellerId: null,
    userId: "1",
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
   
  });

  const [isValid, setIsValid] = useState(true);
  const [displayPrice, setDisplayPrice] = useState('');
  const [photo, setPhotos] = useState([]);
  const [documentation, setDocumentation] = useState([]);

 
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
    if (user.user?.type) {
      if (user.user.type === 'MARTILLER') {
        setFormData(prevFormData => ({
          ...prevFormData,
          martillerId: user.user.id, // El ID del usuario tipo MARTILLER
          sellerId: null,
        }));
      } else if (user.user.type === 'Vendedor') {
        setFormData(prevFormData => ({
          ...prevFormData,
          martillerId: null,
          sellerId: user.user.id, // El ID del usuario tipo VENDEDOR
        }));
      }
    }
  }, [user]);

  

  // const handleUserSelect = (user) => {
  //   setSelectedUser(user);
  //   setFormData({ ...formData, userId: user.id });
  // };

  const provincesArgentina = [
    // 'Buenos Aires',
    // 'Catamarca',
    // 'Chaco',
    // 'Chubut',
    // 'Córdoba',
    // 'Corrientes',
    // 'Entre Ríos',
    // 'Formosa',
    // 'Jujuy',
    // 'La Pampa',
    // 'La Rioja',
    'Mendoza',
    // 'Misiones',
    // 'Neuquén',
    // 'Río Negro',
    // 'Salta',
    // 'San Juan',
    // 'San Luis',
    // 'Santa Cruz',
    // 'Santa Fe',
    // 'Santiago del Estero',
    // 'Tierra del Fuego',
    // 'Tucumán'
  ];

  // Datos de departamentos por provincia
  const departmentsByProvince = {
    Mendoza: [
      'Capital',
      'General Alvear',
      'Godoy Cruz',
      'Guaymallén',
      'Junín',
      'La Paz',
      'Las Heras',
      'Lavalle',
      'Luján de Cuyo',
      'Maipú',
      'Malargüe',
      'Rivadavia',
      'San Carlos',
      'San Martín',
      'San Rafael',
      'Santa Rosa',
      'Tunuyán',
      'Tupungato'
    ],
    // Puedes agregar más provincias y sus respectivos departamentos aquí
  };

  const localitiesByDepartment = {
    Mendoza: {
      Capital: [
        'Barrio Cano',
        'Barrio San Martín',
        'Bombal',
        'Centro',
        'Ciudad',
        'Cuarta Sección',
        'Quinta Sección',
        'Sexta Sección',
        'Parque Central',
        'Villa Nueva'
      ],
      'General Alvear': [
      'Alvear Oeste',
      'Bowen',
      'Carmensa',
      'El Juncalito',
      'La Escandinava',
      'Los Compartos',
      'Posta del Agua',
      'San Pedro del Atuel',
      'Soitué'
      ],
      'Godoy Cruz': [
        'Andino', 
        'Benegas',
        'Carrodilla',
        'Ciudad', 
        'Las Tortugas',
        'Pueblo Nuevo',
        'San Francisco del Monte',
        'Trapiche',
        'Villa del Parque',
        'Villa Hipódromo',
        'Villa Marini',
        'Villa San Ignacio'
      ],
      'Guaymallén': [
      'Villa Nueva',
      'Las Cañas',
      'El Bermejo',
      'Dorrego',
      'Pedro Molina',
      'San José',
      'Rodeo de la Cruz',
      'El Sauce',
      'Colonia Segovia',
      'Buena Nueva',
      'Kilómetro 8',
      'Kilómetro 11',
      'Kilómetro 5',
      'Puente de Hierro',
      'Los Corralitos'
    ],
    'Junín': [
      'Los Barriales',
      'Medrano',
      'Philipps',
      'Algarrobo Grande',
      'Rodríguez Peña',
      'La Colonia',
      'Mundo Nuevo',
      'Alto Verde'
    ],
     'La Paz': [
      'Desaguadero',
      'Villa Antigua',
      'Villa de La Paz',
      'El Atuel',
      'La Armonía',
      'El Carmen',
      'La Primavera',
      'Barrancas',
      'Tres Esquinas'
    ],
      'Las Heras': [
      'El Challao',
      'Panquehua',
      'El Resguardo',
      'La Carrera',
      'Las Heras',
      'El Algarrobal',
      'El Plumerillo',
      'La Candelaria',
      'Los Cerrillos',
      'Punta de Vines',
      'Las Compuertas',
      'Chacras de Coria',
      'El Salto'
    ],
      'Lavalle': [
      'Costa de Araujo',
      'El Vergel',
      'Jocolí',
      'Jocolí Viejo',
      'La Libertad',
      'La Candelaria',
      'Los Corralitos',
      'San Luis',
      'Tres Esquinas',
      'Villa Tulumaya'
    ],
      'Luján de Cuyo': [
      'Chacras de Coria',
      'Las Compuertas',
      'Perdriel',
      'Carrodilla',
      'Vistalba',
      'Agrelo',
      'El Salto',
      'La Primavera',
      'Mayor Drummond',
      'Ugarteche',
      'Los Árboles',
      'La Puntilla'
    ],
      'Maipú': [
      'General Gutiérrez',
      'Luzuriaga',
      'Rodeo del Medio',
      'Barrancas',
      'Russel',
      'La Pega',
      'El Carril',
      'El Rosario',
      'San José',
      'Maipú Centro',
      'Coquimbito',
      'Villa del Parque'
    ],
     'Maipú': [
      'General Gutiérrez',
      'Luzuriaga',
      'Rodeo del Medio',
      'Barrancas',
      'Russel',
      'La Pega',
      'El Carril',
      'El Rosario',
      'San José',
      'Maipú Centro',
      'Coquimbito',
      'Villa del Parque'
    ],
      'Rivadavia': [
      'Santa María de Oro',
      'Los Árboles',
      'La Libertad',
      'La Reducción',
      'Villa Seca',
      'Tres Esquinas',
      'El Mirador',
      'El Pimiento'
    ],
      'San Carlos': [
      'La Consulta',
      'Chilecito',
      'Eugenio Bustos',
      'San Carlos Centro',
      'El Algarrobal',
      'Los Sauces',
      'Pareditas',
      'El Zampal',
      'Tunuyán',
      'La Carrera'
    ],
      'San Martín': [
      'Palmira',
      'Tres Porteñas',
      'Montecaseros',
      'La Colonia',
      'San Martín Centro',
      'Alto Salvador',
      'El Solado',
      'Rivadavia',
      'Jocolí Viejo',
      'Fray Luis Beltrán'
    ],
      'San Rafael': [
      'El Nihuil',
      'Salto de las Rosas',
      'Villa 25 de Mayo',
      'Las Malvinas',
      'Cañón del Atuel',
      'Alvear',
      'Villa Atuel',
      'La Llave',
      'Monte Comán',
      'San Rafael Centro',
      'El Sosneado',
      'Real del Padre'
    ],
      'Santa Rosa': [
      'Las Catitas',
      'La Dormida',
      'Villa Cabecera',
      'Las Tinajas',
      'El Mirador',
      'La Reducción',
      'Las Compuertas'
    ],
     'Tunuyán': [
      'Vista Flores',
      'Colonia Las Rosas',
      'Los Sauces',
      'Tunuyán',
      'El Algarrobal',
      'San Carlos',
      'La Consulta',
      'La Dormida'
    ],
      'Tupungato': [
      'El Peral',
      'San José',
      'Villa Bastías',
      'Ugarteche',
      'La Arboleda',
      'Los Claveles',
      'La Consulta',
      'El Zampal'
    ],
    },
  };
  


  const calculateTotalSquareMeters = (data) => {
    const { coveredSquareMeters, semiCoveredSquareMeters, uncovered, land } = data;
    return (parseFloat(coveredSquareMeters) || 0) +
           (parseFloat(semiCoveredSquareMeters) || 0) 
  };


  const formatPrice = (value) => {
    // Eliminar cualquier carácter que no sea dígito ni punto ni coma
    let cleanedValue = value.replace(/[^\d,.]/g, '');

    return  cleanedValue;
  };

  const [availableDepartments, setAvailableDepartments] = useState([]);
const [availableLocalities, setAvailableLocalities] = useState([]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'price') {
    // Filtrar el valor para permitir solo números (sin puntos, comas o espacios)
    const numericValue = value.replace(/[^0-9]/g, '');

    // Actualizar el estado del formulario para 'price' con el valor numérico
    setFormData({ ...formData, price: numericValue });
    setDisplayPrice(numericValue); // Mostrar el valor en tiempo real sin puntos
    setIsValid(!!numericValue);
  } else {
    let updatedFormData = { ...formData, [name]: value };

    // Si los campos modificados son metros cuadrados, recalcular el total
    if (
      name === 'coveredSquareMeters' ||
      name === 'semiCoveredSquareMeters' ||
      name === 'uncovered' ||
      name === 'land'
    ) {
      const totalSquareMeters = calculateTotalSquareMeters(updatedFormData);
      updatedFormData = { ...updatedFormData, totalSquareMeters };
    }

    // Lógica para cambios en el país
    if (name === 'country') {
      updatedFormData = {
        ...updatedFormData,
        province: '', // Reiniciar provincia al cambiar país
        departments: '', // Reiniciar departamento
        locality: '', // Reiniciar localidad
      };

      // Si es Argentina, habilitar selección de provincias
      if (value === 'Argentina') {
        setAvailableDepartments([]); // Reiniciar departamentos
        setAvailableLocalities([]); // Reiniciar localidades
      } else {
        setAvailableDepartments([]);
        setAvailableLocalities([]);
      }
    }

    // Lógica para cambios en la provincia
    if (name === 'province') {
      updatedFormData = {
        ...updatedFormData,
        departments: '', // Reiniciar departamento al cambiar provincia
        locality: '', // Reiniciar localidad
      };

      if (departmentsByProvince[value]) {
        setAvailableDepartments(departmentsByProvince[value]); // Actualizar departamentos disponibles
        setAvailableLocalities([]); // Reiniciar localidades
      } else {
        setAvailableDepartments([]); // Si no hay departamentos, reiniciar
        setAvailableLocalities([]);
      }
    }

    // Lógica para cambios en el departamento
    if (name === 'departments') {
      updatedFormData = {
        ...updatedFormData,
        locality: '', // Reiniciar localidad al cambiar departamento
      };

      if (localitiesByDepartment[formData.province]?.[value]) {
        setAvailableLocalities(
          localitiesByDepartment[formData.province][value]
        ); // Actualizar localidades disponibles
      } else {
        setAvailableLocalities([]); // Si no hay localidades, reiniciar
      }
    }

    // Actualizar el estado del formulario
    setFormData(updatedFormData);
  }
};

  const handleBlur = () => {
    if (!formData.price) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };


 const handleFileChange = (e) => {
  const { name, files } = e.target;
  const newFiles = Array.from(files).map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
    id: `${file.name}-${Date.now()}`,
  }));

  if (name === 'photo') {
    setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
  } else if (name === 'documentation') {
    setDocumentation((prevDocs) => [...prevDocs, ...newFiles]);
  }
};

  // Función para eliminar archivos por ID (para fotos y documentos)
const handleFileDelete = (id, type) => {
  if (type === 'photo') {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  } else if (type === 'documentation') {
    setDocumentation((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  }
};

const handleFileReorder = (type, fromIndex, toIndex) => {
  const list = type === 'photo' ? [...photo] : [...documentation];
  const [movedFile] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, movedFile);

  if (type === 'photo') {
    setPhotos(list);
  } else if (type === 'documentation') {
    setDocumentation(list);
  }
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
      setIsLoading(true); // Activar indicador de carga inmediatament
    
      // Usar un setTimeout para introducir un retraso visible
      setTimeout(async () => {

      // Crear un nuevo FormData para enviar archivos y otros datos
      const formDataToSend = new FormData();
    
      // Añadir los campos de texto y booleanos al FormData
      formDataToSend.append('propertyType', formData.propertyType);
      formDataToSend.append('statusProperty', formData.statusProperty);
      formDataToSend.append('videoLink', formData.videoLink);
      formDataToSend.append('currency', formData.currency);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('currencyExpenses', formData.currencyExpenses);
      formDataToSend.append('expenses', formData.expenses);
      formDataToSend.append('totalSquareMeters', formData.totalSquareMeters);
      formDataToSend.append('coveredSquareMeters', formData.coveredSquareMeters);
      formDataToSend.append('semiCoveredSquareMeters', formData.semiCoveredSquareMeters);
      formDataToSend.append('uncovered', formData.uncovered);
      formDataToSend.append('land', formData.land);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('commissionSellerType', formData.commissionSellerType);
      formDataToSend.append('commissionBuyerType', formData.commissionBuyerType);
      formDataToSend.append('sellerCommission', formData.sellerCommission);
      formDataToSend.append('buyerCommission', formData.buyerCommission);
      formDataToSend.append('availableDate', formData.availableDate);
      formDataToSend.append('expirationDate', formData.expirationDate);
      formDataToSend.append('street', formData.street);
      formDataToSend.append('number', formData.number);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('province', formData.province);
      formDataToSend.append('departments', formData.departments);
      formDataToSend.append('locality', formData.locality);
      formDataToSend.append('neighborhood', formData.neighborhood);
      formDataToSend.append('privateNeighborhood', formData.privateNeighborhood);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('floorPlans', formData.floorPlans);
      formDataToSend.append('isForSale', formData.isForSale);
      formDataToSend.append('isForRent', formData.isForRent);
      formDataToSend.append('isFinished', formData.isFinished);
      formDataToSend.append('isUnderDevelopment', formData.isUnderDevelopment);

      formDataToSend.append('environments', formData.environments);
      formDataToSend.append('rooms', formData.rooms);
      formDataToSend.append('bathrooms', formData.bathrooms);
      formDataToSend.append('toilettes', formData.toilettes);
      formDataToSend.append('garages', formData.garages);
      formDataToSend.append('ownerName', formData.ownerName);
      formDataToSend.append('ownerPhone', formData.ownerPhone);
      formDataToSend.append('ownerEmail', formData.ownerEmail);
      if (formData.martillerId !== null) {
        formDataToSend.append('martillerId', formData.martillerId);
      }
      if (formData.sellerId !== null) {
        formDataToSend.append('sellerId', formData.sellerId);
      }
      formDataToSend.append('userId', formData.userId);
    
           // Guardar la ubicación como un array de coordenadas (latitud, longitud)
           if (mapLocation) {
            formDataToSend.append('location[]', mapLocation.lat);  // Latitud
            formDataToSend.append('location[]', mapLocation.lng);  // Longitud
          }
      // Agregar los campos complejos (amenities, environmentsOptions, services, characteristics)
      Object.keys(formData.amenities).forEach((key) => {
        formDataToSend.append(`amenities[${key}]`, formData.amenities[key]);
      });
      Object.keys(formData.environmentsOptions).forEach((key) => {
        formDataToSend.append(`environmentsOptions[${key}]`, formData.environmentsOptions[key]);
      });
      Object.keys(formData.services).forEach((key) => {
        formDataToSend.append(`services[${key}]`, formData.services[key]);
      });
      Object.keys(formData.characteristics).forEach((key) => {
        formDataToSend.append(`characteristics[${key}]`, formData.characteristics[key]);
      });
      Object.keys(formData.detailsProperty).forEach((key) => {
        formDataToSend.append(`detailsProperty[${key}]`, formData.detailsProperty[key]);
      });
   
  // Añadir archivos si existen
  if (Array.isArray(photo) && photo.length > 0) {
    photo.forEach((fileObj) => {
      formDataToSend.append('photo', fileObj.file);
    });
  }
  if (Array.isArray(documentation) && documentation.length > 0) {
    documentation.forEach((fileObj) => {
      formDataToSend.append('documentation', fileObj.file);
    });
  }
      try {
        // Si estás usando Redux, puedes disparar una acción:
        dispatch(createProperty(formDataToSend));
        // Si no usas Redux, puedes hacer la solicitud directamente con axios:
        /*
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        await axios.post('http://localhost:3000/property', formDataToSend, config);
        alert('Propiedad creada exitosamente');
        */
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al crear la propiedad');
      }  finally {
       
        setIsLoading(false); // Desactiva el indicador de carga
      }
    }, 3000); // Retraso de 1 segundo
    };
    

// console.log(formData);

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

  return (
    <div className={style.formContainer}>
   {isLoading && console.log('Mostrando indicador de carga')}
{isLoading && (
  <div className={style.loadingOverlay}>
    <img src={loadingGif} alt="Cargando..." className={style.loadingGif} />
  </div>
)}
    <form className={style.form} onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
         <div className={style.formGroup}>

       
   {/* <h2 className={style.title}>Clientes</h2>
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
        </div>
      ))}
    </div>
  </div>
</div>  */}

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
  <option value="">Selecciona un tipo</option>
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
        type="text"
        name="price"
        value={displayPrice}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${style.inputNumber} ${!isValid && style.errorBorder}`}
      />
      {!isValid && <div style={{ color: 'red' }}>El precio no es válido</div>}
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

 <div className={style.formGroup}>
  <h2 className={style.title}>Nombre del Dueño</h2>
  <input
    type="text"
    name="ownerName"
    value={formData.ownerName}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Numero Telefonico del Dueño</h2>
  <input
    type="text"
    name="ownerPhone"
    value={formData.ownerPhone}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

<div className={style.formGroup}>
  <h2 className={style.title}>Email del Dueño</h2>
  <input
    type="text"
    name="ownerEmail"
    value={formData.ownerEmail}
    onChange={handleChange}
    className={style.inputText}
  />
</div>

 <div className={style.formUbication}>
      <h2 className={style.title}>Ubicación</h2>
      <p className={style.subtitleText}>Rellene todos los campos y despues busque por google maps la ubicacion de su propiedad de forma directa o clickeando sobre el mapa. En caso de que su propiedad no posea los campos "Barrio" o "Barrio privado" dejar estos vacios. </p>
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
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={style.inputText}
            >
              <option value="">Selecciona un país</option>
              <option value="Argentina">Argentina</option>
              {/* Añade más países según sea necesario */}
            </select>
      </div>
      <div className={style.inputGroup}>
      <h3 className={style.subtitle}>Provincia</h3>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className={style.inputText}
              disabled={formData.country !== 'Argentina'} // Deshabilitar si no es Argentina
            >
              <option value="">Selecciona una provincia</option>
              {provincesArgentina.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
      </div>
    </div>
  </div>
  <div className={style.formRow}>
    <div className={style.formColumn}>
      <div className={style.inputGroup}>
      <h3 className={style.subtitle}>Departamento</h3>
            <select
              name="departments"
              value={formData.departments}
              onChange={handleChange}
              className={style.inputText}
              disabled={!formData.province || availableDepartments.length === 0}
            >
              <option value="">Seleccione un departamento</option>
              {availableDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
      </div>
      <div className={style.inputGroup}>
      <h3 className={style.subtitle}>Localidad</h3>
<select
  name="locality"
  value={formData.locality}
  onChange={handleChange}
  className={style.inputText}
  disabled={!formData.departments || availableLocalities.length === 0}
>
  <option value="">Seleccione una localidad</option>
  {availableLocalities.map((locality) => (
    <option key={locality} value={locality}>
      {locality}
    </option>
  ))}
</select>
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
<p className={style.subtitleText}>En caso de no tener el dato colocar "0". </p>
  <h2 className={style.title}>Ambientes</h2>
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
    <p className={style.subtitleText}>Completar todos los datos con su respectivo metraje y en caso de no poseer colocar "0" y en caso de ser terreno rellenar el metraje en "Descubierto y "Terreno".</p>
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
      <h2 className={style.title}>Antiguedad</h2>
      <p className={style.subtitleText}>En caso de anotar 0 la propiedad a figurar en "A estrenar". Puede colocar la  fecha de construccion de la propiedad o los años de antiguedad que posea.</p>
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
      <input className={style.inputText} type="text" name="title" placeholder='Ej: Venta casa ciudad' value={formData.title} onChange={handleChange} />
    </label>
 </div>
 <div className={style.formGroup}>

    <label>
     <h2 className={style.title}>Descripcion</h2>
      <textarea className={style.inputDescription} type="text" name="description" placeholder='Ingrese una descripcion' cols="30" rows="5" value={formData.description} onChange={handleChange} />
    </label>
 </div>

 <h2 className={style.title}>Fotos</h2>
 <p className={style.subtitleText}>Se puede subir hasta un maximo de de 30 imagenes.</p>
<FileUploader name="photo" handleFileChange={handleFileChange} accept="image/*" multiple={true} files={photo} onFileDelete={(id) => handleFileDelete(id, 'photo')} />

<ul>
  {photo.map((photo, index) => (
    <li key={photo.id}>
      <img
        src={photo.previewUrl}
        alt="Vista previa"
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />
      <button onClick={() => handleFileDelete(photo.id, 'photo')}>Eliminar</button>
      <button
        disabled={index === 0}
        onClick={(e) => {
          e.preventDefault();
          handleFileReorder('photo', index, index - 1);
        }}
      >
        Subir
      </button>
      <button
        disabled={index === photo.length - 1}
        onClick={(e) => {
          e.preventDefault();
          handleFileReorder('photo', index, index + 1);
        }}
      >
        Bajar
      </button>
    </li>
  ))}
</ul>
    <div className={style.formGroup}>

  <h2 className={style.title}>
  Video Link
  </h2>
     
      <input className={style.inputText} type="text" name="videoLink" placeholder='Link de YouTube' value={formData.videoLink} onChange={handleChange} />
   
    </div>
    <h2 className={style.title}>Documentacion</h2>
    <p className={style.subtitleText}>Se puede subir hasta un maximo de de 10 imagenes o pdf de bajo tamaño.</p>
    <FileUploader
  name="documentation"
  handleFileChange={handleFileChange}
  accept="image/*,application/pdf" // Acepta imágenes y PDFs
  multiple={true}
/>
    <button 
  type="submit" 
  disabled={isLoading} 
className={style.submit}
>
  {isLoading ? 'Enviando...' : 'Crear Propiedad'}
</button>
  </form>
  </div>
  );
};

export default CreateProperty;

