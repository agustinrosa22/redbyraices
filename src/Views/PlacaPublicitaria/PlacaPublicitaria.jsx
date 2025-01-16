import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import style from "./PlacaPublicitaria.module.css";
import logo from '../../Assets/tituloConFondo.png'
import ubicacion from '../../Assets/ubicacion.png'
import grifo from '../../Assets/agua-del-grifo.png'
import zona from '../../Assets/zona.png'
import PlacaCompleta from "./PlacaCompleta/PlacaCompleta";

const PlacaPublicitaria = () => {
  const [images, setImages] = useState({
    mainImage: null,
    secondaryImage1: null,
    secondaryImage2: null,
  });
  const [title, setTitle] = useState("LOTE EN VENTA");
  const [price, setPrice] = useState("U$D 230.000");
  const [metros, setMetros] = useState("100 M2");
  const [location, setLocation] = useState("General Paz, Godoy Cruz");
  const [services, setServices] = useState("💡 💧 🔥");

  const placaRef = useRef(null); // Referencia al contenedor

  // Manejar carga de imágenes
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
  
    html2canvas(element, {
      useCORS: true,
      scale: 2,
      onclone: (clonedDoc) => {
        const clonedSecondaryImages = clonedDoc.querySelectorAll(
          `.${style.secondaryImage}, .${style.secondaryImage2}`
        );
  
        clonedSecondaryImages.forEach((img) => {
          const computedStyle = window.getComputedStyle(img);
          img.style.position = "absolute";
  
          // Copiar y ajustar la posición exacta
          img.style.top = computedStyle.top;
  
          // Ajustar el desplazamiento horizontal causado por `translateX(-50%)`
          const originalLeft = parseFloat(computedStyle.left);
          const originalWidth = parseFloat(computedStyle.width);
  
          // En lugar de sumar, resta parte del ancho para corregir el desplazamiento
          img.style.left = `${originalLeft - originalWidth / 2}px`;
  
          img.style.transform = "none"; // Eliminar transformaciones
        });
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "placa_publicitaria.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };
  
  return (
    <div className={style.container}>
      {/* Inputs para editar título, precio, ubicación y servicios */}
      <div className={style.editControls}>
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
      </div>

      {/* Contenedor de la placa que se exportará */}
      <div ref={placaRef} className={style.placa}>
        <div className={style.secondPlaca}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.logo}>
    <img src={logo} alt="Logo" />
  </div>
        <div className={style.content}>
        <div
  className={style.mainImage}
  onClick={() => document.getElementById('fileInputMain').click()} // Simula clic en input principal
>
  {images.mainImage ? (
    <img src={images.mainImage} alt="Principal" />
  ) : (
    <p>Cargar Imagen Principal</p> // Texto de indicación
  )}
  <input
    type="file"
    id="fileInputMain" // Asociado al div mediante ID
    accept="image/*"
    onChange={(e) => handleImageChange(e, "mainImage")}
    hidden
  />
</div>


          <div className={style.secondaryImages}>
            {/* Primera imagen secundaria */}
            <div
  className={style.secondaryImage}
  onClick={() => document.getElementById('fileInputSecondary1').click()} // Simula clic en input secundario
>
  {images.secondaryImage1 ? (
    <img src={images.secondaryImage1} alt="Secundaria 1" />
  ) : (
    <p>Cargar Imagen 1</p> // Texto de indicación
  )}
  <input
    type="file"
    id="fileInputSecondary1" // Asociado al div mediante ID
    accept="image/*"
    onChange={(e) => handleImageChange(e, "secondaryImage1")}
    hidden
  />
</div>


            {/* Segunda imagen secundaria */}
            <div
  className={style.secondaryImage2}
  onClick={() => document.getElementById('fileInputSecondary2').click()} // Simula clic en input secundario 2
>
  {images.secondaryImage2 ? (
    <img src={images.secondaryImage2} alt="Secundaria 2" />
  ) : (
    <p>Cargar Imagen 2</p> // Texto de indicación
  )}
  <input
    type="file"
    id="fileInputSecondary2" // Asociado al div mediante ID
    accept="image/*"
    onChange={(e) => handleImageChange(e, "secondaryImage2")}
    hidden
  />
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
  </div>
  <div className={`${style.containerServicios}`}>
    <img src={grifo} alt="" />
    <p className={style.location}>Servicios: {services}</p>
  </div>
</div>



        <div className={style.footer}>
          <p>www.byraices.com</p>
          <p>Julieta Garcia C.C.P.I.M Mat 2009</p>
        </div>
        </div>
      </div>

      {/* Botón para descargar */}
      <button onClick={downloadPlaca} className={style.downloadButton}>
        Descargar Placa
      </button>
      <PlacaCompleta/>
    </div>
  );
};

export default PlacaPublicitaria; /* Contenedor principal */
