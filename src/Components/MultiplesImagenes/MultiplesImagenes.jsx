import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container, Button } from "reactstrap";
import style from './MultiplesImagenes.module.css'
import axios from "axios";

const MultiplesImagenes = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDrop = async (files) => {
        setLoading(true);
        try {
            const uploaders = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('tags', `codeinfuse, medium, gist`);
                formData.append('upload_preset', "Byraices");
                formData.append("api_key", "459789382519731");
                formData.append("timestamp", (Date.now() / 1000) | 0);
                const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                });
                return response.data.secure_url;
            });
            const uploadedImages = await Promise.all(uploaders);
            setImages(prevImages => [...prevImages, ...uploadedImages]);
            
        } catch (error) {
            console.error("Error al subir imágenes:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const handleDeleteAllImages = () => {
        setImages([]);
    }

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('uploadedImages'));
        if (storedImages) {
            setImages(storedImages);
        }
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            localStorage.setItem('uploadedImages', JSON.stringify(images));
        }
    }, [images]);
    console.log(images)
    function imagePreview() {
        if (loading) {
            return <h3>Cargando imágenes...</h3>;
        }
        return (
            <div>
                <Button color="danger" onClick={handleDeleteAllImages}>Eliminar todas las imágenes</Button>
                {images.length <= 0
                    ? <h3>No hay imágenes</h3>
                    : (
                        <div className={style.imageContainer}>
                            {images.map((item, index) => (
                                <div key={index} className={style.imageItem}>
                                    <img
                                        alt='Imagen'
                                        className={style.image}
                                        src={item}
                                    />
                                    <Button color="danger" onClick={() => handleDeleteImage(index)}>Eliminar</Button>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div>
            <Container>
                <h1 className={style.textCenter}>Sube tus imágenes aquí</h1>
                <Dropzone
                    className={style.dropzone}
                    onDrop={handleDrop}
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className={style.dropzone} {...getRootProps({className: "dropzone"})}>
                                <input {...getInputProps()} />
                                <span>📂</span>
                                <p>Coloca tus imágenes aquí</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {imagePreview()}
            </Container>
        </div>
    );
}

export default MultiplesImagenes;
