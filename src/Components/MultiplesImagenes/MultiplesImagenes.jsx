import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container } from "reactstrap";
import style from './MultiplesImagenes.module.css'
import axios from "axios";

const MultiplesImagenes = ()=> {
    const [image, setImage] = useState({array : []})
    const [Loading, setLoading] = useState("");

    const handleDrop = (files) => {
        const upLoaders = files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', "Byraices");
            formData.append("api_key", "459789382519731");
            formData.append("timestamp", (Date.now() / 1000) | 0);
            setLoading("true");
            return axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            })
            
            .then((response) => {
                const data = response.data
                const fileURL = data.secure_url;
                let specificArrayInObject = Array.isArray(image.array) ? [...image.array] : []; // Convertir a array si no lo es
                specificArrayInObject.push(fileURL);
                const newobj = {...image, array: specificArrayInObject}; // Asegúrate de actualizar el array en la propiedad correcta
                setImage(newobj)
                console.log(newobj)
               
                // Almacenar en localStorage
             
            })
        })
        axios.all(upLoaders).then(() => {
            setLoading("false")
            
        })
    }

    useEffect(() => {
        if (image.array.length > 0) {
            localStorage.setItem('uploadedImages', JSON.stringify(image.array));
            // Almacenar en localStorage
        }
    }, [image.array]);
    

    function imagePreview(){
        if(Loading === "true"){
            return <h3>Cargando imagenes...</h3>
        }
        if(Loading === "false"){
            return <h3>
                {image.array.length <= 0
                ? "No hay imagenes"
                : image.array.map((item, index) =>(
                   <img 
                   alt='Imagen' 
                   style={{width: "125px", height: "70px", backgroundSize: "cover", paddingRight: "15px"
                   }}
                   src={item} />
                ))
            }
            </h3>
        }
    }
    return ( 
        <div>
           <Container>
            <h1 className={style.textCenter}>Sube tus imagenes aqui</h1>
            <Dropzone
            className={style.dropzone}
            classname="dropzone"
            onDrop={handleDrop}
            onChange={(e) => setImage(e.target.value)}
            value={image}
            >
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div className={style.dropzone} {...getRootProps({classname: "dropzone"}) }>
                            <input {...getInputProps()} />
                            <span>📂</span>
                            <p>Coloca tus Imagenes aqui</p>
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