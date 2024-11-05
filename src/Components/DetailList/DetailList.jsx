import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Col, Row } from 'react-bootstrap';
import MapContainer from '../Maps/MapContainer';
import style from './DetailList.module.css';

// Helper function to convert string to boolean if necessary
const isTruthy = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'; // Convierte "true"/"false" strings a booleano
  }
  return Boolean(value); // Si ya es booleano, lo deja igual
};



const renderDetails = (details) => {
  // Mapea las características verdaderas a su representación en texto
  const characteristicText = {
    placard: "Placard",
    parilla: "Parilla",
    desayunador: "Desayunador",
    orientacionSur: "Orientación Sur",
    orientacionOeste: "Orientación Oeste",
    orientacionNorte: "Orientación Norte",
    orientacionEste: "Orientación Este",
    accesoDeCocheraRampaFija: "Acceso de Cochera con Rampa Fija",
    accesoDeCocheraRampaMovil: "Acceso de Cochera con Rampa Móvil",
    accesoDeCocheraAscensor: "Acceso de Cochera con Ascensor",
    accesoDeCocheraHorizontal: "Acceso de Cochera Horizontal",
    disposicionContrafrente: "Disposición Contrafrente",
    disposicionFrente: "Disposición Frente",
    disposicionInterno: "Disposición Interno",
    disposicionLateral: "Disposición Lateral",
    amoblado: "Amoblado",
    orientacionNoroeste: "Orientación Noroeste",
    orientacionNoreste: "Orientación Noreste",
    orientacionSuroeste: "Orientación Suroeste",
    orientacionSureste: "Orientación Sureste",
    deck: "Deck",
    tipoDeCampoOtro: "Tipo de Campo Otro",
    tipoDeCampoFruticula: "Tipo de Campo Frutícola",
    tipoDeCampoAgricola: "Tipo de Campo Agrícola",
    tipoDeCampoChara: "Tipo de Campo Chacra",
    tipoDeCampoCriadero: "Tipo de Campo Criadero",
    tipoDeCampoTambero: "Tipo de Campo Tambo",
    tipoDeCampoFloricultura: "Tipo de Campo Floricultura",
    tipoDeCampoForestal: "Tipo de Campo Forestal",
    tipoDeCampoGanadero: "Tipo de Campo Ganadero",
    tipoDeCampoHaras: "Tipo de Campo Haras",
    bodegas: "Bodegas",
    tipoDeBodegaComercial: "Tipo de Bodega Comercial",
    tipoDeBodegaNaveIndustrial: "Tipo de Bodega Nave Industrial",
    tipoDeBodegaAlmacen: "Tipo de Bodega Almacén",
    biblioteca: "Biblioteca",
    galpon: "Galpón",
    sotano: "Sótano",
    baulera: "Baulera",
    permiteMascota: "Permite Mascota",
    aptoTuristico: "Apto Turístico"
  };

  const trueCharacteristics = Object.entries(details)
    .filter(([key, value]) => isTruthy(value)) // Aquí convertimos string "true"/"false" a booleano si es necesario
    .map(([key]) => characteristicText[key]);

  if (trueCharacteristics.length === 0) {
    return null;
  }

return (
  <div className={style.dataContainer}>
    <h2>Características</h2>
    <div className={style.data}>
      <ul>
        {trueCharacteristics.map((characteristic, index) => (
          <li key={index}>{characteristic}</li>
        ))}
      </ul>
    </div>
  </div>
);

};

const renderDetailsAmenities = (details) => {
  // Mapea las amenidades verdaderas a su representación en texto
  const amenityText = {
    aireAcondicionado: "Aire Acondicionado",
    portonAutomatico: "Portón Automático",
    gimnasio: "Gimnasio",
    losaRadiante: "Losa Radiante",
    chimenea: "Chimenea",
    hidromasaje: "Hidromasaje",
    seguridad: "Seguridad",
    pileta: "Pileta",
    caldera: "Caldera",
    businessCenter: "Business Center",
    areaCine: "Área de Cine",
    cisterna: "Cisterna",
    laundry: "Laundry",
    estacionamientoVisitas: "Estacionamiento para Visitas",
    ascensor: "Ascensor",
    salonUsosMultiples: "Salón de Usos Múltiples",
    areaDeJuegosInfantiles: "Área de Juegos Infantiles",
    canchaTenis: "Cancha de Tenis",
    recepcion: "Recepción",
    areasVerdes: "Áreas Verdes",
    valetParking: "Valet Parking",
    canchaBasquetbol: "Cancha de Básquetbol",
    canchaFutbol: "Cancha de Fútbol",
    canchaPaddle: "Cancha de Paddle",
    solarium: "Solarium",
    jardinDeInvierno: "Jardín de Invierno",
    piletaCubierta: "Pileta Cubierta",
    piletaClimatizada: "Pileta Climatizada",
    sauna: "Sauna",
    bar: "Bar",
    calefaccion: "Calefacción"
  };

  const trueAmenities = Object.entries(details)
    .filter(([key, value]) => isTruthy(value)) // Convertir string a boolean si es necesario
    .map(([key]) => amenityText[key]);

  if (trueAmenities.length === 0) {
    return null;
  }

  return (
    <div>
    <div className={style.dataContainer}>
      <h2>Amenities</h2>
      </div>
      <div className={style.data}>
      <ul>
        {trueAmenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

const renderDetailsAmbientes = (details) => {
  // Mapea las opciones de entornos verdaderas a su representación en texto
  const environmentOptionText = {
    dormitorio: "Dormitorio",
    comedor: "Comedor",
    vestidor: "Vestidor",
    jardin: "Jardín",
    baño: "Baño",
    patio: "Patio",
    terraza: "Terraza",
    estudio: "Estudio",
    lavadero: "Lavadero",
    altillo: "Altillo",
    playroom: "Playroom",
    lobby: "Lobby",
    quincho: "Quincho",
    salaDeReuniones: "Sala de Reuniones",
    balcon: "Balcón",
    pileta: "Pileta",
    cocina: "Cocina",
    toilette: "Toilette",
    habitacion: "Habitación",
    living: "Living",
    otro: "Otro"
  };

  const trueEnvironmentOptions = Object.entries(details)
  .filter(([key, value]) => isTruthy(value)) // Convertir string a boolean si es necesario
  .map(([key]) => environmentOptionText[key]);

if (trueEnvironmentOptions.length === 0) {
  return null;
}

  return (
    <div>
      <div className={style.dataContainer}>
      <h2>Ambientes</h2>
      </div>
      <div className={style.data}>
      <ul>
        {trueEnvironmentOptions.map((environmentOption, index) => (
          <li key={index}>{environmentOption}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

const renderDetailsServicios = (details) => {
 
  // Mapea las opciones de servicios verdaderas a su representación en texto
  const serviceText = {
    electricidad: "Electricidad",
    agua: "Agua",
    gas: "Gas",
    internet: "Internet",
    telefono: "Teléfono",
    desagueCloacal: "Desagüe Cloacal",
    televisionPorCable: "Televisión por Cable",
    alarma: "Alarma",
    televisionSatelital: "Televisión Satelital",
    aguaCorriente: "Agua Corriente"
  };

  const trueServices = Object.entries(details)
  .filter(([key, value]) => isTruthy(value)) // Convertir string a boolean si es necesario
  .map(([key]) => serviceText[key]);

if (trueServices.length === 0) {
  return null;
}

  return (
    <div>
       <div className={style.dataContainer}>
      <h2>Servicios</h2>
      </div>
      <div className={style.data}>
      <ul>
        {trueServices.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};



const DetailList = ({ property }) => {
  let title;

  if (property.isForSale) {
    title = "Venta";
  } else if (property.isForRent) {
    title = "Alquiler";
  } else if (property.isUnderDevelopment) {
    title = "Desarrollo";
  }
    const [selectedPreview, setSelectedPreview] = useState(0);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
      const fetchContact = async () => {
        try {
          let response;
          if (property.martillerId !== null) {
            // Obtener los datos del martillero si martillerId no es null
            response = await axios.get(`/martiller/${property.martillerId}`);
          } else if (property.sellerId !== null) {
            // Obtener los datos del vendedor si sellerId no es null
            response = await axios.get(`/seller/${property.sellerId}`);
          }
          if (response && response.data) {
            setSeller(response.data.data);
          }
        } catch (error) {
          console.error('Error al obtener los datos de contacto:', error);
        }
      };

      fetchContact();
    }, [property.martillerId, property.sellerId]);

  useEffect(() => {
    const adjustImages = () => {
      const imageContainers = document.querySelectorAll(`.${style.imageContainer}`);
      imageContainers.forEach(container => {
        const image = container.querySelector('img');
        const containerAspectRatio = container.clientWidth / container.clientHeight;
        const imageAspectRatio = image.naturalWidth / image.naturalHeight;
        
        if (imageAspectRatio > containerAspectRatio) {
          image.style.width = 'auto';
          image.style.height = '100%';
        } else {
          image.style.width = '100%';
          image.style.height = 'auto';
        }

        if (image.clientWidth < container.clientWidth || image.clientHeight < container.clientHeight) {
          image.style.backgroundColor = '#ccc';
        }
      });


        const images = document.querySelectorAll(`.${style.imageContainer} img`);
    images.forEach(image => {
      image.addEventListener('click', () => {
        if (image.requestFullscreen) {
          image.requestFullscreen();
        } else if (image.mozRequestFullScreen) {
          image.mozRequestFullScreen();
        } else if (image.webkitRequestFullscreen) {
          image.webkitRequestFullscreen();
        } else if (image.msRequestFullscreen) {
          image.msRequestFullscreen();
        }
      });
    });
  };
    window.addEventListener('load', adjustImages);

    return () => {
      window.removeEventListener('load', adjustImages);
    };
  }, [selectedPreview])

   // Calcula la antigüedad en años si el campo age tiene 4 dígitos
   const calculateAntiquity = (age) => {
    const currentYear = new Date().getFullYear();
    return currentYear - age;
  };

  // Verifica si la edad es un año de 4 dígitos o un valor directo
  const displayAge = (age) => {
    return age.toString().length === 4 ? calculateAntiquity(age) : age;
  };

  const descargarImagen = async (url, nombreArchivo) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const descargarTodasLasImagenes = async (fotos) => {
    for (let index = 0; index < fotos.length; index++) {
      const url = fotos[index];
      const nombreArchivo = `imagen-${index + 1}.jpg`; // Cambia la extensión si es necesario
      await descargarImagen(url, nombreArchivo);
    }
  };
  
  return (
    <div>
      <div>
      <Row>
      <Col sm={9} className="mx-auto">
      <div className={style.carouselContainer}>
  {Array.isArray(property.photo) && property.photo.length > 0 ? (
    <Carousel className={style.carousel} activeIndex={selectedPreview} onSelect={(index) => setSelectedPreview(index)}>
      {property.photo.map((image, index) => (
        <Carousel.Item key={index} className={style['carousel-item']}>
          <div className={style.imageContainer}>
            <img
              src={image}
              className={`d-block ${style['carousel-img']}`}
              alt={`Slide ${index}`}
            />
          </div>
          <Carousel.Caption>
            <p>{index + 1} de {property.photo.length}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <p>No hay imágenes disponibles.</p>
  )}
</div>
      </Col>
    </Row>
      {/* Agrega el botón de descarga debajo del carrusel */}
      <Row>
          <Col sm={9} className="mx-auto">
            {Array.isArray(property.photo) && property.photo.length > 0 && (
              <button onClick={() => descargarTodasLasImagenes(property.photo)} className={style.downloadButton}>
                Descargar todas las imágenes
              </button>
            )}
          </Col>
        </Row>
      </div>
      <h3>Vendedor</h3>
      <p className={style.vendedorName}> {seller?.name} {seller?.last_name}</p>
      <div className={style.container}>
      <div className={style.leftContent}>
        <div className={style.ContainerIntro}>
          <div className={style.ContainerSell}>
            <div className={style.SellTitle}>
            <h3>{title}</h3>
            </div>
            <h1>{property.title}</h1>
            <p> {property.price} {property.currency}</p>
          </div>
          <div className={style.ContainerPrincipalData}>
            <p>{property.totalSquareMeters} m² totales</p>
            <p>{property.coveredSquareMeters} m² cubiertos </p>
            <p>{property.environments} ambientes</p>
            <p>{property.rooms} dormitorios</p>
            <p>{property.bathrooms} baños</p>
            <p>{property.garages} cochera</p>
            <p>{displayAge(property.age)} Años de antiguedad</p>
          </div>
        </div>
        <div className={style.descriptionContainer}>
          <h2>Descripción</h2>
          <div className={style.description}>
            <p>{property.description}</p>
          </div>

          <div className={style.otherDataContainer}>
  <div className={style.otherData}>
    <div className={style.pairContainer}>
      {property.propertyType && <p>Tipo de propiedad: {property.propertyType}</p>}
      {property.totalSquareMeters && <p>Superficie total: {property.totalSquareMeters} m²</p>}
    </div>
    <div className={style.pairContainer}>
      {property.land && <p>Superficie terreno: {property.land} m²</p>}
      {property.semiCoveredSquareMeters && <p>Superficie semicubierta: {property.semiCoveredSquareMeters} m²</p>}
    </div>
    <div className={style.pairContainer}>
      {property.age && <p>Años de antiguedad: {displayAge(property.age)}</p>}
      {property.rooms && <p>Dormitorios: {property.rooms}</p>}
    </div>
    <div className={style.pairContainer}>
      {property.bathrooms && <p>Baños: {property.bathrooms}</p>}
      {property.toilettes && <p>Toilets: {property.toilettes}</p>}
    </div>
    <div className={style.pairContainer}>
      {property.garages && <p>Cocheras: {property.garages}</p>}
      {property.floorPlans && <p>Pisos de la propiedad: {property.floorPlans}</p>}
    </div>
  </div>
</div>


            {/* Renderiza las características */}
            {renderDetails(property.characteristics)}
            {renderDetailsAmenities(property.amenities)}
            {renderDetailsAmbientes(property.environmentsOptions)}
            {renderDetailsServicios(property.services)}
        </div>
        <div className={style.ubicationContainer}>
          <h2>Ubicación</h2>
          <div className={style.dataUbication}>
          {property.street && property.number && <p>{property.street} {property.number}, </p>}
          {property.departments && <p>{property.departments},</p>}
          {property.locality && <p>{property.locality},</p>}
          {property.province && <p>{property.province},</p>}
          {property.country && <p> {property.country}</p>}
          </div>
          <MapContainer location={property.location} />

        </div>
        </div>
        <div className={style.rightContent}>
        
        </div>
        </div>
    </div>
  );
};

export default DetailList;
