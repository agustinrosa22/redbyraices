import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container, Button } from "reactstrap";
import style from './Documentacion.module.css'
import axios from "axios";

const Documentacion = () => {
    // const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDrop = async (files) => {
        setLoading(true);
        try {
            const uploaders = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('tags', `codeinfuse, medium, gist`);
                formData.append('upload_preset', "ByraicesDocument");
                formData.append("api_key", "459789382519731");
                formData.append("timestamp", (Date.now() / 1000) | 0);
                const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                    headers: {"X-Requested-With": "XMLHttpRequest"},
                });
                return response.data.secure_url;
            });
            const uploadedDocuments = await Promise.all(uploaders);
            setDocuments(prevDocuments => [...prevDocuments, ...uploadedDocuments]);
            
        } catch (error) {
            console.error("Error al subir documentos:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteDocuments = (index) => {
        const newDocuments = [...documents];
        newDocuments.splice(index, 1);
        setDocuments(newDocuments);
    }

    const handleDeleteAllDocuments = () => {
        setDocuments([]);
    }

    useEffect(() => {
        const storedDocuments = JSON.parse(localStorage.getItem('uploadedDocuments'));
        if (storedDocuments) {
            setDocuments(storedDocuments);
        }
    }, []);

    useEffect(() => {
        if (documents.length > 0) {
            localStorage.setItem('uploadedDocuments', JSON.stringify(documents));
        }
    }, [documents]);
    console.log(documents)
    function documentsPreview() {
        if (loading) {
            return <h3>Cargando imágenes...</h3>;
        }
        return (
            <div>
                <Button color="danger" onClick={handleDeleteAllDocuments}>Eliminar todas las imágenes</Button>
                {documents.length <= 0
                    ? <h3>No hay imágenes</h3>
                    : (
                        <div className={style.imageContainer}>
                            {documents.map((item, index) => (
                                <div key={index} className={style.imageItem}>
                                    <img
                                        alt='Imagen'
                                        className={style.image}
                                        src={item}
                                    />
                                    <Button color="danger" onClick={() => handleDeleteDocuments(index)}>Eliminar</Button>
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
                <h1 className={style.textCenter}>Sube tus documentos aquí</h1>
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
                {documentsPreview()}
            </Container>
        </div>
    );
}

export default Documentacion;
