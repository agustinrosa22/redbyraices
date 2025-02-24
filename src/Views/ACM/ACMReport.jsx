import React, { useRef, useState, useEffect } from "react";
import { useSelector} from 'react-redux';
import style from "./ACMReport.module.css";
import portada from "../../Assets/Boceto ACM.png";
import fondoACM from "../../Assets/fondoACM.png";
import html2pdf from 'html2pdf.js';
import mapa from '../../Assets/IlustracionDeMapaGoogleMaps.png'
import logoByraices from '../../Assets/LogoByraicesACM.png'
import logoInmoup from '../../Assets/LogoInmoupACM.png'
import logoZopaprop from '../../Assets/LogoZonapropACM.png'
import telefonoLogo from '../../Assets/logoTelefonoACM.png'
import mailLogo from '../../Assets/LogoMailACM.png'
import ubicacionLogo from '../../Assets/LogoUbicacionACM.png'
import comercializacion from '../../Assets/Comercializacion.png'
import { QRCodeSVG } from "qrcode.react";
import logoByRaices from "../../Assets/logoByraices.png";
import QRCodeStyling from "qr-code-styling";


const QRCustom = ({ value, color1, color2, size = 150 }) => {
  return (
    <div className={style.qrBox}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="#ffffff"
        fgColor={color1}
        level="H" // Alto nivel de corrección de errores para que se vea el logo
        includeMargin={true}
        imageSettings={{
          src: logoByRaices, // Logo en el centro del QR
          x: undefined,
          y: undefined,
          height: 40, // Tamaño del logo
          width: 30,
          excavate: true, // Hace que el logo no bloquee el código QR
        }}
      />
    </div>
  );
};


const ACMReport = () => {
   const user = useSelector(state => state.user);
  const reportRef = useRef();
  const [images, setImages] = useState([null, null, null]); // Imágenes de la primera página
  const [imagesII, setImagesII] = useState([null, null, null]); // Imágenes de la segunda página
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [agentPhotoBase64, setAgentPhotoBase64] = useState(null);

    // Colores de la empresa (rojo y azul)
    const colors = ["#a83e52", "#3D2F87"];

    // Función para obtener un color aleatorio
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const [valorPretendido, setValorPretendido] = useState(0);
   const [isUserEditing, setIsUserEditing] = useState(false);
  const [fodaText, setFodaText] = useState({
    fortalezas: "Muy buena ubicación de la propiedad...",
    oportunidades: "Posibles inversores pueden comprar la propiedad...",
    debilidades: "Debido a su antigüedad puede que presente algunas falencias...",
    amenazas: "No presenta",
  });

  

  const handleDownloadPDF = () => {
    const options = {
      margin:       0,
      filename:     'ACM_Report.pdf',
      image:        { type: 'png', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true, scale: 2 },
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
    cubierta: "",
    antiguedad: "",
    estadoConservacion: "",
    servicios: "",
    m2: "",
    valorACM: ""
  });


  useEffect(() => {
    const convertImageToBase64 = async () => {
      if (user?.user?.photo) {
        try {
          const response = await fetch(user.user.photo);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => setAgentPhotoBase64(reader.result);
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error al convertir la imagen a Base64:", error);
        }
      }
    };
  
    convertImageToBase64();
  }, [user?.user?.photo]);

  useEffect(() => {
    if (!isUserEditing) {
      const m2Value = parseFloat(formData.m2) || 0;
      const cubiertaValue = parseFloat(formData.cubierta) || 0;
      setFormData((prev) => ({ ...prev, valorACM: m2Value * cubiertaValue }));
    }
  }, [formData.m2, formData.cubierta, isUserEditing]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el usuario está escribiendo en valorACM, evitar que se sobrescriba
    if (name === "valorACM") {
      setIsUserEditing(true);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Si el usuario borra el input de valorACM, volver a calcularlo automáticamente
  const handleBlur = () => {
    if (formData.valorACM === "") {
      setIsUserEditing(false); // Permitir que vuelva a calcularse
    }
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

  const formatPhoneNumber = (phone) => {
    if (!phone) return ""; // Si no hay número, devolver vacío
  
    // Eliminar caracteres no numéricos, pero conservar el "+"
    let cleanNumber = phone.replace(/[^\d+]/g, "");
  
    // Verificar si comienza con "+54"
    if (cleanNumber.startsWith("+54")) {
      // Extraer partes del número
      let restOfNumber = cleanNumber.slice(3); // Eliminar el "+54"
      
      // Verificar si ya tiene el "9"
      if (!restOfNumber.startsWith("9")) {
        restOfNumber = "9" + restOfNumber; // Agregar el "9" si no está
      }
  
      // Aplicar formato +54 9 XXX XXX XXXX
      return `+54 9 ${restOfNumber.slice(1, 4)} ${restOfNumber.slice(4, 7)} ${restOfNumber.slice(7)}`;
    }
  
    // Si el número no tiene "+54", devolverlo sin formato
    return phone;
  };


  const textRefs = {
    fortalezas: useRef(null),
    oportunidades: useRef(null),
    debilidades: useRef(null),
    amenazas: useRef(null),
  };

  const maxCharacters = 250;
  

// FUNCION PARA MANEJAR CAMBIOS EN LOS TEXTOS Y MANTENER EL CURSOR
const handleTextChange = (e, key) => {
  const selection = window.getSelection(); // Guardar selección actual
  const range = selection.getRangeAt(0); // Obtener la posición del cursor
  const cursorPosition = range.startOffset; // Guardar la posición exacta del cursor

  const newText = e.target.innerText;
  if (newText.length <= maxCharacters) {
    setFodaText((prev) => ({ ...prev, [key]: newText }));

    // Restaurar la posición del cursor
    setTimeout(() => {
      const newRange = document.createRange();
      newRange.setStart(e.target.childNodes[0] || e.target, cursorPosition);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }, 0);
  } else {
    e.target.innerText = fodaText[key]; // Evita que se pase del límite
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
        Superficie de terreno:
        <input type="text" name="dimensiones" onChange={handleChange} placeholder="Metros cuadrados" />
        Superficie construida:
        <input type="text" name="cubierta" onChange={handleChange} placeholder="Metros cuadrados" />
        <label>Antigüedad:</label>
        <input type="text" name="antiguedad" onChange={handleChange} placeholder="Años" />
        <label>Estado de Conservación:</label>
        <input type="text" name="estadoConservacion" onChange={handleChange} placeholder="Ejemplo: Bueno, Excelente" />
        <label>Servicios:</label>
        <input type="text" name="servicios" onChange={handleChange} placeholder="Ejemplo: Luz, Agua, Gas" />
        <label>Valor del m2</label>
        <input name="m2" onChange={handleChange} placeholder="Añadir valor del metro cuadrado"></input>
        <label>Valor del inmueble</label>

        <div className={style.inputContainer}>
        <label>Ingrese primer link:</label>
        <input type="text" value={link1} onChange={(e) => setLink1(e.target.value)} placeholder="https://ejemplo.com" />

        <label>Ingrese segundo link:</label>
        <input type="text" value={link2} onChange={(e) => setLink2(e.target.value)} placeholder="https://ejemplo.com" />
      </div>

      <input
        name="valorACM"
        value={formData.valorACM}
        onChange={handleChange}
        onBlur={handleBlur} // Si se vacía, recalcula
        placeholder="Añadir valor del metro cuadrado"
      />

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
          <p className={style.text}>Dimensiones: Superficie de terreno: {formData.dimensiones} m2 / Superficie Construida: {formData.cubierta} m2</p>
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

      {/* Fortalezas */}
      <div className={style.itemFodaF}>
        <h3 className={style.titleFodaF}>FORTALEZAS</h3>
        <div
          className={style.textFoda}
          contentEditable
          suppressContentEditableWarning
          ref={textRefs.fortalezas}
          onInput={(e) => handleTextChange(e, "fortalezas")}
        >
          {fodaText.fortalezas}
        </div>
      </div>

      {/* Oportunidades */}
      <div className={style.itemFodaO}>
        <h3 className={style.titleFodaO}>OPORTUNIDADES</h3>
        <div
          className={style.textFoda}
          contentEditable
          suppressContentEditableWarning
          ref={textRefs.oportunidades}
          onInput={(e) => handleTextChange(e, "oportunidades")}
        >
          {fodaText.oportunidades}
        </div>
      </div>

      {/* Debilidades */}
      <div className={style.itemFodaD}>
        <h3 className={style.titleFodaD}>DEBILIDADES</h3>
        <div
          className={style.textFoda}
          contentEditable
          suppressContentEditableWarning
          ref={textRefs.debilidades}
          onInput={(e) => handleTextChange(e, "debilidades")}
        >
          {fodaText.debilidades}
        </div>
      </div>

      {/* Amenazas */}
      <div className={style.itemFodaA}>
        <h3 className={style.titleFodaA}>AMENAZAS</h3>
        <div
          className={style.textFoda}
          contentEditable
          suppressContentEditableWarning
          ref={textRefs.amenazas}
          onInput={(e) => handleTextChange(e, "amenazas")}
        >
          {fodaText.amenazas}
        </div>
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
<div className={style.containerAnalisis}>

<h3>TIPO DE PRECIO ESTIMADO</h3>

<h3>VALOR M2: U$D {formData.m2}</h3>

<h3>VALOR PRETENDIDO</h3>

<h2 className={style.priceACM}>U$D {formData.valorACM}</h2>
</div>

</div>


        {/* Página 12 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>¿COMO AYUDARTE CON LA COMERCIALIZACIÓN DE TU PROPIEDAD?</h2>
<img className={style.comercializacion} src={comercializacion} alt="" />

</div>


        {/* Página 13 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>¿CUALES SON NUESTRAS CONDICIONES DE TRABAJO?</h2>


<div className={style.containerCondiciones}>
  <h3>Requerimos fotocopias de:</h3>

  <div className={style.itemCondiciones}>
  <h4>Escritura, boleto compra-venta o cesión de derecho</h4>
  <h4>DNI de todos los propietarios</h4>
  <h4>Planos de mensura</h4>

  </div>

  <h3>Honorarios Profesionales</h3>

  <div className={style.itemCondiciones}>
  <h4>En caso de venta: 3% IVA sobre el precio de cierre.
  En caso de no venderse la propiedad, toda la inversión publicitaria corre a cuenta y riesgo de la inmobiliaria</h4>
  </div>
</div>


</div>


        {/* Página 14 - Comparación de Mercado */}
<div className={style.page}>
<h2 className={style.title}>CONTACTO</h2>
<div className={style.containerContacto}>

<div className={style.infoContacto}>
<img src={agentPhotoBase64 || user?.user?.photo} alt="Agente" /> <h3>{user?.user?.name}  {user?.user?.last_name}</h3>
</div>


<div className={style.infoContacto}>
<img src={telefonoLogo} alt="a" /> <h3>{formatPhoneNumber(user?.user?.phone_number)}</h3>

</div>


<div className={style.infoContacto}>
<img src={mailLogo} alt="a" /> <h3>{user?.user?.mail}</h3>
</div>



<div className={style.infoContacto}>
<img src={ubicacionLogo} alt="a" /> <h3>Peltier 50 Piso 1 Oficina 11,
Ciudad Mendoza.</h3>
</div>



</div>


</div>


      {/* Página 15 - Comparación de Mercado */}
<div className={style.page}>
      <h2 className={style.title}>REFERENCIAS</h2>

     {/* Contenedor de QR */}
     <div className={style.qrContainer}>
        {link1 && (
          <div className={style.qrBox}>
            <QRCustom value={link1} color1="#3D2F87" color2="#3D2F87" size={200} />
            <p>Primer comparable</p>
          </div>
        )}

        {link2 && (
          <div className={style.qrBox}>
            <QRCustom value={link2} color1="#3D2F87" color2="#3D2F87" size={200} />
            <p>Segundo comparable</p>
          </div>
        )}

        {/* QR estático de ByRaices */}
        <div className={style.qrBox}>
          <QRCustom value="https://byraices.com" color1="#a83e52" color2="#a83e52" size={200} />
          <p>By Raices</p>

        </div>
          <div className={style.containerInfoMartillero}>
            <h3 className={style.tituloMartiller}>CORREDOR PÚBLICO INMOBILIARO</h3>
            <h3 className={style.nombreMartiller}>JULIETA GARCIA C.C.P.I.M. Mat.2009</h3>

            <p className={style.leyes}>En cumplimiento de las leyes vigentes que regulan el corretaje inmobiliario, Ley Nacional 25.028, Ley 22.802 de Lealtad Comercial, Ley 24.240 de Defensa al Consumidor, las normas del Código Civil y Comercial de la Nación y Constitucionales, los agentes/gestores NO ejercen el corretaje inmobiliario. Todas las operaciones inmobiliarias son objeto de intermediación y conclusión por parte del corredor público inmobiliario colegiado a cargo de la publicación, cuyos datos se exhiben en la presente.</p>

          </div>
      </div>
    </div>

      </div>
    </div>
  );
};

export default ACMReport;
