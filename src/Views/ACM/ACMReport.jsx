import React, { useRef, useState } from "react";
import style from "./ACMReport.module.css";
import portada from "../../Assets/Boceto ACM.png";
import fondoACM from "../../Assets/fondoACM.png";
import html2pdf from 'html2pdf.js';

const ACMReport = () => {
  const reportRef = useRef();

  const handleDownloadPDF = () => {
    const options = {
      margin:       0,
      filename:     'ACM_Report.pdf',
      image:        { type: 'png', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true, scale: 1 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait', putOnlyUsedFonts: true }
    };
    html2pdf()
      .from(reportRef.current)
      .set(options)
      .save();
  };

  const [formData, setFormData] = useState({
    propietario: "",
    ubicacion: "",
    tipoInmueble: "",
    zona: "",
    dimensiones: "",
    antiguedad: "",
    estadoConservacion: "",
    servicios: "",
    comparacion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.container}>
      {/* Controles de Entrada */}
      <div className={style.inputContainer}>
        <h2>Información del Inmueble</h2>
        <label>Propietario:</label>
        <input type="text" name="propietario" onChange={handleChange} placeholder="Nombre del propietario" />
        <label>Ubicación:</label>
        <input type="text" name="ubicacion" onChange={handleChange} placeholder="Dirección completa" />
        <label>Tipo de Inmueble:</label>
        <input type="text" name="tipoInmueble" onChange={handleChange} placeholder="Ejemplo: Casa, Departamento" />
        <label>Zona:</label>
        <input type="text" name="zona" onChange={handleChange} placeholder="Ejemplo: Urbana, Residencial" />
        <label>Dimensiones:</label>
        <input type="text" name="dimensiones" onChange={handleChange} placeholder="Metros cuadrados" />
        <label>Antigüedad:</label>
        <input type="text" name="antiguedad" onChange={handleChange} placeholder="Años" />
        <label>Estado de Conservación:</label>
        <input type="text" name="estadoConservacion" onChange={handleChange} placeholder="Ejemplo: Bueno, Excelente" />
        <label>Servicios:</label>
        <input type="text" name="servicios" onChange={handleChange} placeholder="Ejemplo: Luz, Agua, Gas" />
        <label>Comparación de Mercado:</label>
        <textarea name="comparacion" onChange={handleChange} placeholder="Añadir detalles comparativos"></textarea>

        <button onClick={handleDownloadPDF} className={style.printButton}>
          Descargar PDF
        </button>
      </div>

      {/* Contenido del Reporte */}
      <div className={style.report} ref={reportRef}>
        {/* Página 1 - En blanco */}
        <div className={style.page}>

          <img className={style.imgPortada} src={portada} alt="" />
        </div>

        {/* Página 2 - Datos Generales */}
        <div className={style.page}>
          <h1 className={style.title}>DATOS GENERALES</h1>
          <h2 className={style.sectionTitle}>Datos Generales</h2>
          <p><strong>Propietario:</strong> {formData.propietario}</p>
          <p><strong>Ubicación:</strong> {formData.ubicacion}</p>
          <p><strong>Tipo de Inmueble:</strong> {formData.tipoInmueble}</p>
          <p><strong>Zona:</strong> {formData.zona}</p>
          

        </div>

        {/* Página 3 - Detalle de la Construcción */}
        <div className={style.page}>
          <h2 className={style.sectionTitle}>Detalle de la Construcción</h2>
          <p><strong>Dimensiones:</strong> {formData.dimensiones}</p>
          <p><strong>Antigüedad:</strong> {formData.antiguedad}</p>
          <p><strong>Estado de Conservación:</strong> {formData.estadoConservacion}</p>
          <p><strong>Servicios:</strong> {formData.servicios}</p>
          

        </div>

        {/* Página 4 - Comparación de Mercado */}
        <div className={style.page}>
          <h2 className={style.sectionTitle}>Comparación de Mercado</h2>
          <p>{formData.comparacion}</p>
        </div>

        
        {/* Página 5 - Comparación de Mercado */}
        <div className={style.page}>

</div>


        {/* Página 6 - Comparación de Mercado */}
<div className={style.page}>

</div>

        {/* Página 7 - Comparación de Mercado */}
<div className={style.page}>


</div>
 
 
        {/* Página 8 - Comparación de Mercado */}
<div className={style.page}>

</div>


        {/* Página 9 - Comparación de Mercado */}
<div className={style.page}>

</div>


        {/* Página 10 - Comparación de Mercado */}
<div className={style.page}>


</div>


        {/* Página 11 - Comparación de Mercado */}
<div className={style.page}>


</div>


        {/* Página 12 - Comparación de Mercado */}
<div className={style.page}>


</div>


        {/* Página 13 - Comparación de Mercado */}
<div className={style.page}>


</div>


        {/* Página 14 - Comparación de Mercado */}
<div className={style.page}>


</div>


        {/* Página 15 - Comparación de Mercado */}
<div className={style.page}>

</div>


        {/* Página 16 - Comparación de Mercado */}
<div className={style.page}>


</div>



      </div>
    </div>
  );
};

export default ACMReport;
