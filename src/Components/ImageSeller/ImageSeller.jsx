import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styles from './ImageSeller.module.css';

const ImageSeller = ({ onImageSelected, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || '/default-profile.png');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Solo manejamos un archivo
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Crear una URL para la vista previa
      onImageSelected(file); // Pasar el archivo al componente padre
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      onImageSelected(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={styles.imageDropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img src={preview} alt="Preview" className={styles.previewImage} />
        <p>Arrastra una imagen aquí o haz clic para seleccionar una imagen</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
      </div>
      <Button color="primary" onClick={() => document.getElementById('fileInput').click()}>
        Seleccionar Imagen
      </Button>
    </div>
  );
};

export default ImageSeller;
