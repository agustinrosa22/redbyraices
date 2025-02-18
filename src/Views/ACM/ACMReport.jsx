import React, { useRef, useState } from "react";
import style from "./ACMReport.module.css";
import portada from "../../Assets/Boceto ACM.png";
import fondoACM from "../../Assets/fondoACM.png";
import html2pdf from 'html2pdf.js';
import mapa from '../../Assets/IlustracionDeMapaGoogleMaps.png'
import logoByraices from '../../Assets/LogoByraicesACM.png'
import logoInmoup from '../../Assets/LogoInmoupACM.png'
import logoZopaprop from '../../Assets/LogoZonapropACM.png'

const ACMReport = () => {
  const reportRef = useRef();
  const [images, setImages] = useState([null, null, null]); // Imágenes de la primera página
  const [imagesII, setImagesII] = useState([null, null, null]); // Imágenes de la segunda página

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


   // Manejo de cambio de imagen para la primera página
   const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejo de cambio de imagen para la segunda página
  const handleImageChangeII = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImagesII = [...imagesII];
        newImagesII[index] = e.target.result;
        setImagesII(newImagesII);
      };
      reader.readAsDataURL(file);
    }
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
        <div className={style.pagePortada}>

          {/* <img className={style.imgPortada} src={portada} alt="" /> */}
        </div>

    {/* Página 2 - Datos Generales */}
<div className={style.page}>
  <h1 className={style.title}>DATOS GENERALES</h1>
  <div className={style.ContainerDateGeneral}>
    <p className={style.text}>Propietario: {formData.propietario}</p>
    <p className={style.text}>Ubicación: {formData.ubicacion}</p>
    <p className={style.text}>Tipo de Inmueble: {formData.tipoInmueble}</p>
    <p className={style.text}>Zona:{formData.zona}</p>
  </div>
</div>


        {/* Página 3 - Detalle de la Construcción */}
        <div className={style.page}>
          <h2 className={style.title}>Detalle de la Construcción</h2>
          <div className={style.ContainerDateGeneral}>
          <p className={style.text}>Dimensiones: {formData.dimensiones}</p>
          <p className={style.text}>Antigüedad: {formData.antiguedad}</p>
          <p className={style.text}>Estado de Conservación: {formData.estadoConservacion}</p>
          <p className={style.text}>Servicios: {formData.servicios}</p>
          </div>

        </div>

        {/* Página 4 - Comparación de Mercado */}
        <div className={style.page}>
        <h2 className={style.title}>Método</h2>
        <div className={style.ContainerDateGeneral}>
          <p className={style.text}>Método comparativo</p>
          <p className={style.text}>Mapa de ubicación de Inmuebles</p>
          <p className={style.text}>Planilla de Comparables</p>
          <p className={style.text}>Fotografías de Inmuebles Comparables</p>
          <p className={style.text}>Apreciaciones de interés: 
-Se busco inmuebles en similares condiciones de construcción 
-Se dio especial valor a la ubicación, servicios, construcción y su antigüedad</p>
          <p className={style.text}>ANALISIS FODA (Fortalezas, Oportunidades, Debilidades, Amenazas)
          </p>
          </div>
          
        </div>

        
        {/* Página 5 - Comparación de Mercado */}
        <div className={style.page}>
        <h2 className={style.title}>Método Comparativo</h2>
        <div className={style.ContainerTextMetodoComparativo}>
        <p className={style.textMetodoComparativo}>Para establecer el valor adecuado de tu
propiedad, realizaremos un Análisis Comparativo del Mercado (ACM).
Esta herramienta nos permite evaluar y comparar propiedades
similares en el mercado. Analizaremos diversos factores, incluyendo la
ubicación, el tamaño, las comodidades, el estado de la propiedad y
otros elementos importantes, con el fin de determinar el valor más
preciso para tu propiedad.</p>

<img className={style.mapa}  src={mapa} alt="" />
</div>
</div>


        {/* Página 6 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>Portales de Referencias</h2>
<div className={style.AllReferencias}>

<div className={style.containerRefencia}>
<img src={logoByraices} alt="" />
<h3>Byraices.com</h3>
</div>

<div className={style.containerRefencia}>
<img src={logoInmoup} alt="" />
<h3>Inmoup.com</h3>
</div>

<div className={style.containerRefencia}>
<img src={logoZopaprop} alt="" />
<h3>Zonaprop.com</h3>
</div>
</div>
</div>

        {/* Página 7 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>F.O.D.A</h2>

<div className={style.itemFodaF}>

<h3 className={style.titleFodaF}>FORTALEZAS</h3>
<p className={style.textFoda}>Muy buena ubicacion de la propiedad. Cercanias a distintos tipos de comercios. Como calle principal se destaca la calle housay de facil salida a accesos rapidos. </p>

</div>

<div className={style.itemFodaO}>

<h3 className={style.titleFodaO}>OPORTUNIDADES</h3>
<p className={style.textFoda}>  Posibles inversores pueden comprar la propiedad, y haciendos sus distintos arreglos pueden obtener una rentabilidad futura; eso hara que la mirada sea distinta hacia la propiedad.  </p>

</div>


<div className={style.itemFodaD}>

<h3 className={style.titleFodaD}>DEBILIDADES</h3>
<p className={style.textFoda}>Debido a su antiguedad puede que presente algunas falencias, que a simple vista no se pueden apreciar.</p>

</div>

<div className={style.itemFodaA}>

<h3 className={style.titleFodaA}>AMENAZAS</h3>
<p className={style.textFoda}>no presenta</p>

</div>



</div>
 
 
        {/* Página 8 - Comparación de Mercado */}
        <div className={style.page}>
  <h2 className={style.title}>Planilla Comparables</h2>

  <div className={style.containerTable}>

  <table className={style.table}>
    <thead>
      <tr>
        <th>FICHA ESTUDIO</th>
        <th>PROPIEDAD ESTUDIADA</th>
        <th>COMP I</th>
        <th>COMP II</th>
      </tr>
    </thead>
    <tbody>
      {[
        "DIRECCIÓN",
        "METROS CUBIERTOS",
        "METROS CON ESPACIOS COMUNES",
        "DORMITORIOS",
        "ANTIGÜEDAD",
        "ESTADO DE CONSERVACIÓN",
        "VALOR DE PUBLICACIÓN"

      ].map((rowTitle, rowIndex) => (
        <tr key={rowIndex}>
          <td className={style.rowTitle}>{rowTitle}</td>
          {[...Array(3)].map((_, colIndex) => (
            <td key={colIndex} contentEditable={true} className={style.cell}></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

  </div>
</div>



  {/* Página 9 - Comparación de Mercado */}
  <div className={style.page}>
        <h2 className={style.title}>FOTOGRAFIA COMPARABLE I</h2>
        <div className={style.containerImagenes}>
          {images.map((image, index) => (
            <div
              key={index}
              className={style.imageBox}
              onClick={() => document.getElementById(`fileInputI${index}`).click()} // ID único para cada imagen
            >
              {image ? (
                <img src={image} alt={`Foto ${index + 1}`} className={style.image} />
              ) : (
                <p>Seleccionar Imagen</p>
              )}
              <input
                type="file"
                id={`fileInputI${index}`} // ID único para cada input
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                hidden
              />
            </div>
          ))}
        </div>
      </div>


 {/* Página 10 - Comparación de Mercado */}
      <div className={style.page}>
        <h2 className={style.title}>FOTOGRAFIA COMPARABLE II</h2>
        <div className={style.containerImagenes}>
          {imagesII.map((image, index) => (
            <div
              key={index}
              className={style.imageBox}
              onClick={() => document.getElementById(`fileInputII${index}`).click()} // ID único para cada imagen
            >
              {image ? (
                <img src={image} alt={`Foto ${index + 1}`} className={style.image} />
              ) : (
                <p>Seleccionar Imagen</p>
              )}
              <input
                type="file"
                id={`fileInputII${index}`} // ID único para cada input
                accept="image/*"
                onChange={(e) => handleImageChangeII(e, index)}
                hidden
              />
            </div>
          ))}
        </div>
      </div>


        {/* Página 11 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>RESULTADO  DEL ANALISIS DE MERCADO</h2>

</div>


        {/* Página 12 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>¿COMO AYUDARTE CON LA COMERCIALIZACIÓN DE TU PROPIEDAD?</h2>

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
