import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import style from "./PlacaCompleta.module.css";
import logo from '../../../Assets/tituloConFondo.png';
import ubicacion from '../../../Assets/ubicacion.png';
import grifo from '../../../Assets/agua-del-grifo.png';
import zona from '../../../Assets/zona.png';

const PlacaCompleta = () => {
  const [images, setImages] = useState({
    mainImage: null,
    secondaryImage1: null,
    secondaryImage2: null,
    secondaryImage3: null, // Nueva imagen secundaria
  });
  const [title, setTitle] = useState("LOTE EN VENTA");
  const [price, setPrice] = useState("U$D 230.000");
  const [metros, setMetros] = useState("100 M2");
  const [location, setLocation] = useState("General Paz, Godoy Cruz");
  const [services, setServices] = useState("💡 💧 🔥");
  const [bathrooms, setBathrooms] = useState("2 Baños");
  const [rooms, setRooms] = useState("3 Habitaciones");
  const [kitchen, setKitchen] = useState("Cocina equipada");
  const [financing, setFinancing] = useState("Sí, apta financiación");

  const placaRef = useRef(null);

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => ({ ...prev, [imageType]: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPlaca = () => {
    const element = placaRef.current;
    html2canvas(element, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "placa_publicitaria.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className={style.container}>
      <div className={style.editControls}>
        {/* Controles de edición */}
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Precio:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Ubicación:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Metraje:
          <input
            type="text"
            value={metros}
            onChange={(e) => setMetros(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Servicios:
          <input
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Baños:
          <input
            type="text"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Habitaciones:
          <input
            type="text"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Cocina:
          <input
            type="text"
            value={kitchen}
            onChange={(e) => setKitchen(e.target.value)}
            className={style.input}
          />
        </label>
        <label>
          Apta Financiación:
          <input
            type="text"
            value={financing}
            onChange={(e) => setFinancing(e.target.value)}
            className={style.input}
          />
        </label>
      </div>

      <div ref={placaRef} className={style.placa}>
        <div className={style.secondPlaca}>
          <h1 className={style.title}>{title}</h1>
          <div className={style.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={style.content}>
            <div className={style.mainImage}>
              {images.mainImage ? (
                <img src={images.mainImage} alt="Principal" />
              ) : (
                <label>
                  Cargar Imagen Principal
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "mainImage")}
                    hidden
                  />
                </label>
              )}
            </div>

            <div className={style.secondaryImages}>
              {/* Primera imagen secundaria */}
              <div className={style.secondaryImage}>
                {images.secondaryImage1 ? (
                  <img src={images.secondaryImage1} alt="Secundaria 1" />
                ) : (
                  <label>
                    Cargar Imagen 1
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "secondaryImage1")}
                      hidden
                    />
                  </label>
                )}
              </div>

              {/* Segunda imagen secundaria */}
              <div className={style.secondaryImage2}>
                {images.secondaryImage2 ? (
                  <img src={images.secondaryImage2} alt="Secundaria 2" />
                ) : (
                  <label>
                    Cargar Imagen 2
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "secondaryImage2")}
                      hidden
                    />
                  </label>
                )}
              </div>

              {/* Nueva tercera imagen secundaria */}
              <div className={style.secondaryImage3}>
                {images.secondaryImage3 ? (
                  <img src={images.secondaryImage3} alt="Secundaria 3" />
                ) : (
                  <label>
                    Cargar Imagen 3
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "secondaryImage3")}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className={style.price}>{price}</div>
          <div className={style.info}>
            <div className={style.infoLeft}>
              <div className={`${style.containerUbicacion} left`}>
                <img src={zona} alt="" />
                <p className={style.location}>{metros}</p>
              </div>

              <div className={`${style.containerUbicacion} left`}>
                <img src={ubicacion} alt="" />
                <p className={style.location}>{location}</p>
              </div>

              <div className={style.additionalInfo}>
                <p>Baños: {bathrooms}</p>
                <p>Habitaciones: {rooms}</p>
                <p>Cocina: {kitchen}</p>
              </div>
            </div>
            <div className={`${style.containerServicios} right`}>
              <img src={grifo} alt="" />
              <p className={style.location}>Servicios: {services}</p>
              <p>Apta Financiación: {financing}</p>
            </div>
          </div>

          <div className={style.footer}>
            <p>www.byraices.com</p>
            <p>Julieta Garcia C.C.P.I.M Mat 2009</p>
          </div>
        </div>
      </div>

      <button onClick={downloadPlaca} className={style.downloadButton}>
        Descargar Placa
      </button>
    </div>
  );
};

export default PlacaCompleta;

