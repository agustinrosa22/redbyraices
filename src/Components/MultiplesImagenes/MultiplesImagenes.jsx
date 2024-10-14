import React from 'react';

const FileUploader = ({ name, handleFileChange, accept, multiple = false }) => {
  return (
    <div>
      <input
        type="file"
        name={name}
        multiple={multiple}
        onChange={handleFileChange}
        accept={accept}
      />
    </div>
  );
};

export default FileUploader;


// import React, { useState, useRef } from "react";
// import Dropzone from "react-dropzone";
// import { Container, Button } from "reactstrap";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import axios from "axios";
// import style from './MultiplesImagenes.module.css';

// const ItemType = "image";

// const MultiplesImagenes = ({ initialImages, onImagesChange }) => {
//   const [images, setImages] = useState(initialImages || []);
//   const [loading, setLoading] = useState(false);

//   const handleDrop = async (files) => {
//     setLoading(true);
//     try {
//       const uploaders = files.map(async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', "Byraices");
//         formData.append("api_key", "459789382519731");
//         formData.append("timestamp", (Date.now() / 1000) | 0);
//         const response = await axios.post("https://api.cloudinary.com/v1_1/dt0tsuyeu/image/upload", formData, {
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//         });
//         return response.data.secure_url;
//       });
//       const uploadedImages = await Promise.all(uploaders);
//       const newImages = [...images, ...uploadedImages];
//       setImages(newImages);
//       onImagesChange(newImages);
//     } catch (error) {
//       console.error("Error al subir imágenes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages);
//     onImagesChange(newImages);
//   };

//   const handleDeleteAllImages = () => {
//     setImages([]);
//     onImagesChange([]);
//   };

  // const moveImage = (dragIndex, hoverIndex) => {
  //   const draggedImage = images[dragIndex];
  //   const newImages = [...images];
  //   newImages.splice(dragIndex, 1);
  //   newImages.splice(hoverIndex, 0, draggedImage);
  //   setImages(newImages);
  //   onImagesChange(newImages);
  // };

//   const ImageItem = ({ item, index }) => {
//     const ref = useRef(null);
//     const [, drop] = useDrop({
//       accept: ItemType,
//       drop: (draggedItem) => {
//         if (draggedItem.index !== index) {
//           moveImage(draggedItem.index, index);
//           draggedItem.index = index;
//         }
//       },
//     });
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemType,
//       item: { index },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });

//     drag(drop(ref));
//     return (
//       <div
//         ref={ref}
//         className={style.imageItem}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//       >
//         <img alt="Imagen" className={style.image} src={item} />
//         <Button color="danger" onClick={() => handleDeleteImage(index)}>Eliminar</Button>
//       </div>
//     );
//   };

//   const imagePreview = () => {
//     if (loading) {
//       return <h3>Cargando imágenes...</h3>;
//     }
//     return (
//       <div>
//         <Button color="danger" onClick={handleDeleteAllImages}>Eliminar todas las imágenes</Button>
//         {images.length <= 0 ? (
//           <h3>No hay imágenes</h3>
//         ) : (
//           <div className={style.imageContainer}>
//             {images.map((item, index) => (
//               <ImageItem key={index} index={index} item={item} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Container>
//         <h1 className={style.textCenter}>Sube tus imágenes aquí</h1>
//         <Dropzone className={style.dropzone} onDrop={handleDrop}>
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div className={style.dropzone} {...getRootProps({ className: "dropzone" })}>
//                 <input {...getInputProps()} />
//                 <span>📂</span>
//                 <p>Coloca tus imágenes aquí</p>
//               </div>
//             </section>
//           )}
//         </Dropzone>
//         {imagePreview()}
//       </Container>
//     </DndProvider>
//   );
// };

// export default MultiplesImagenes;
