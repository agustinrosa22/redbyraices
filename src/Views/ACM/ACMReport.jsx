import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./ACMReport.module.css";

const ACMReport = () => {
  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <div className={style.acmContainer}>
      <button onClick={handlePrint} className={style.printButton}>
        Descargar PDF
      </button>
      <div className={style.acmReport} ref={reportRef}>
        {/* Página 1 - Datos Generales */}
        <div className={style.page}>
          <h1 className={style.title}>Análisis Comparativo de Mercado (ACM)</h1>
          <div className={style.section}>
            <h2 className={style.sectionTitle}>Datos Generales</h2>
            <label className={style.label}>Propietario:</label>
            <input type="text" className={style.input} placeholder="Nombre del propietario" />
            <label className={style.label}>Ubicación del Inmueble:</label>
            <input type="text" className={style.input} placeholder="Dirección completa" />
            <label className={style.label}>Tipo de Inmueble:</label>
            <input type="text" className={style.input} placeholder="Ejemplo: Casa, Departamento" />
            <label className={style.label}>Zona:</label>
            <input type="text" className={style.input} placeholder="Ejemplo: Urbana, Residencial" />
          </div>
        </div>

        {/* Página 2 - Detalle de la Construcción */}
        <div className={style.page}>
          <h2 className={style.sectionTitle}>Detalle de la Construcción</h2>
          <label className={style.label}>Dimensiones:</label>
          <input type="text" className={style.input} placeholder="Metros cuadrados" />
          <label className={style.label}>Antigüedad:</label>
          <input type="text" className={style.input} placeholder="Años" />
          <label className={style.label}>Estado de Conservación:</label>
          <input type="text" className={style.input} placeholder="Ejemplo: Bueno, Excelente" />
          <label className={style.label}>Servicios:</label>
          <input type="text" className={style.input} placeholder="Ejemplo: Luz, Agua, Gas" />
        </div>
      </div>
    </div>
  );
};

export default ACMReport;
