import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container, Button } from "reactstrap";
import style from './ImageSeller.module.css'
import axios from "axios";

const ImageSeller = ({ onImageSelected }) => {
    const [image, setImage] = useState(null);

    const handleDrop = async (files) => {
        try {
            const file = files[0]; // Obtener solo el primer archivo
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', "Byraices");
            formData.append("api_key", "459789382519731");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            });

            const imageUrl = response.data.secure_url;
            setImage(imageUrl); // Establecer la URL de la imagen subida
            onImageSelected(imageUrl); // Enviar la URL al componente padre
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            alert("Hubo un problema al subir la imagen. Inténtalo de nuevo.");
        }
    };

    const handleDeleteImage = () => {
        setImage(null); // Eliminar la imagen del estado
        onImageSelected(null); // Enviar null al componente padre para indicar que no hay imagen seleccionada
    };

    function imagePreview() {
        return (
            <div>
                {image ? (
                    <div className={style.imageContainer}>
                        <div className={style.imageItem}>
                            <img
                                alt='Imagen'
                                className={style.image}
                                src={image}
                            />
                            <Button color="danger" onClick={handleDeleteImage}>
                                Eliminar imagen
                            </Button>
                        </div>
                    </div>
                ) : (
                    <h3>No hay imagen</h3>
                )}
            </div>
        );
    }

    return (
        <Container>
            <h1 className={style.textCenter}>Sube tu imagen aquí</h1>
            <Dropzone onDrop={handleDrop} maxFiles={1}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: style.dropzone })}>
                        <input {...getInputProps()} />
                        📂
                        <p>Coloca tu imagen aquí</p>
                    </div>
                )}
            </Dropzone>
            {imagePreview()}
        </Container>
    );
};

export default ImageSeller;