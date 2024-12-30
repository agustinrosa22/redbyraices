import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import styles from "./ImageGenerator.module.css";

const ImageGenerator = () => {
  const [image, setImage] = useState(null); // Estado para almacenar la imagen seleccionada
  const contentRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Crea una URL temporal para la vista previa
    }
  };

  const downloadImage = () => {
    const element = contentRef.current;

    html2canvas(element, {
      useCORS: true,
      backgroundColor: null, // Fondo transparente
      scale: 2, // Mejor calidad
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.fileInput}
      />
      <div ref={contentRef} className={styles.content}>
        {image ? (
          <img src={image} alt="Seleccionada" className={styles.image} />
        ) : (
          <h1 className={styles.text}>¡Selecciona una Imagen!</h1>
        )}
      </div>
      <button className={styles.downloadButton} onClick={downloadImage}>
        Descargar Imagen
      </button>
    </div>
  );
};

export default ImageGenerator;
