import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './CardAprobar.module.css';
import { useDispatch } from 'react-redux';
import { editProperty, deleteProperty } from '../../Redux/Actions/actions';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const CardAprobar = ({ property }) => {
  const dispatch = useDispatch();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleEdit = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas cambiar el estado de esta propiedad?');
    if (confirmed) {
      dispatch(editProperty(property.id, { ...property, statusProperty: true }));
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.');
    if (confirmed) {
      dispatch(deleteProperty(property.id))
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error al eliminar la propiedad:', error);
        });
    }
  };

  const handleDownloadClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDownloadDocuments = async () => {
    if (password !== "byraices123") {
      alert("Contraseña incorrecta. Inténtalo de nuevo.");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder(`Documentos_${property.id}`);

    if (!folder) {
      alert("Error al crear la carpeta ZIP.");
      return;
    }

    const fetchPromises = property.documentation.map(async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const fileName = fileUrl.split('/').pop();
        folder.file(fileName, blob);
      } catch (error) {
        console.error(`Error descargando ${fileUrl}:`, error);
      }
    });

    await Promise.all(fetchPromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `Documentos_${property.id}.zip`);
    });

    alert("Descarga completada.");
    setPassword("");
    setShowPasswordInput(false);
  };

  const hasDocumentation = property.documentation?.length > 0;


  
    // Calcular días publicados
    const getDaysPublished = () => {
      if (!property.createdAt) return "Fecha desconocida";
  
      const createdAtDate = new Date(property.createdAt);
      const currentDate = new Date();
      const differenceInTime = currentDate.getTime() - createdAtDate.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convertir ms a días
  
      return differenceInDays === 1 ? "1 día publicado" : `${differenceInDays} días publicados`;
    };
  
    const getFormattedDate = (dateString) => {
      if (!dateString) return "Fecha desconocida";
    
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    };
  
    

  return (
    <div className={`${style.card} ${!hasDocumentation ? style.borderOrange : ''}`}>
      <div className={style.imageContainer}>
        {property?.photo?.length > 0 && (
          <img src={property.photo[0]} className={style.image} alt={property.title} />
        )}
      </div>
      <div className={style.cardContent}>
        <h5 className={style.cardTitle}>{property.title}</h5>
        <h5 className={style.cardTitle}>{property.id}</h5>
        <h5 className={style.cardTitle}>$ {property.currency} {property.price}</h5>
        <p className={style.cardText}>{property.description}</p>
                 {/* Fecha de creación y días publicados */}
<p className={style.dateInfo}>
  Creado el <strong>{getFormattedDate(property.createdAt)}</strong> - {getDaysPublished()}
</p>

        <p>
  {property.ownerName && <span>{property.ownerName}</span>}
  {property.ownerName && property.ownerPhone && " / "}
  {property.ownerPhone && <span>{property.ownerPhone}</span>}
  {property.ownerPhone && property.ownerEmail && " / "}
  {property.ownerEmail && <span>{property.ownerEmail}</span>}
</p>

        {hasDocumentation && (
          <div className={style.downloadSection}>
            <button onClick={handleDownloadClick} className={style.downloadButton}>
              Descargar Documentación
            </button>
            {showPasswordInput && (
              <div className={style.passwordContainer}>
                <input
                  type="password"
                  placeholder="Ingrese contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  className={style.passwordInput}
                />
                <button onClick={handleDownloadDocuments} className={style.confirmButton}>
                  Confirmar
                </button>
              </div>
            )}
          </div>
        )}

        <div className={style.buttonContainer}>
          <Link to={`https://byraices.com/detail/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Ver detalles</button>
          </Link>
          <Link to={`/detalles/${property.id}`} className={style.detailsLink}>
            <button className={style.detailsButton}>Editar</button>
          </Link>
          <button onClick={handleEdit} className={style.editButton}>
            Aprobar Propiedad
          </button>
          <button onClick={handleDelete} className={style.deleteButton}>
            Eliminar Propiedad
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardAprobar;
