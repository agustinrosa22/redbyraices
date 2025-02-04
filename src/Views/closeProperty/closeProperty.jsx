import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProperty } from "../../Redux/Actions/actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from './closeProperty.module.css';

const CloseProperty = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const [propertyData, setPropertyData] = useState({
    cerrado: {
      cierre: true,
      precioCierre: "",
      currencyCierre: "",
      fecha: "",
      soldByAgent: true,  
      soldByAgency: "",
      buyingTip: false,
      selleringTip: false,
      sellerCommision: "",
      officeComission: "",
      totalComission: "0.00",
      franquiciaComission: "",
      martillerComission: "",
    },
    statusProperty: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        const data = response.data.data;

        setPropertyData((prevData) => ({
          ...prevData,
          ...data,
          cerrado: {
            ...prevData.cerrado,
            precioCierre: prevData.cerrado.precioCierre || data.price || "",
            currencyCierre: prevData.cerrado.currencyCierre || data.currency || "",
            soldByAgent: data.soldByAgent || prevData.cerrado.soldByAgent,
            soldByAgency: data.soldByAgency || prevData.cerrado.soldByAgency,
            buyingTip: data.buyingTip || false,
            selleringTip: data.sellingTip || false,
            sellerCommision: data.sellerCommission || "",
            officeComission: data.officeComission || "",
            franquiciaComission: data.franquiciaComission || "",
            martillerComission: data.martillerComission || "",
          },
        }));

        setLoading(false);
      } catch (err) {
        console.error("Error al obtener la propiedad:", err);
        setError("No se pudieron cargar los datos de la propiedad.");
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedData = { ...propertyData };
      const keys = name.split(".");
      updatedData[keys[0]][keys[1]] = checked;
      updatedData.cerrado.totalComission = calculateTotalComission(updatedData);
      setPropertyData(updatedData);
    } else {
      if (name.includes("cerrado.")) {
        const field = name.split(".")[1];
        setPropertyData((prevData) => {
          const updatedData = {
            ...prevData,
            cerrado: {
              ...prevData.cerrado,
              [field]: value,
            },
          };
          updatedData.cerrado.totalComission = calculateTotalComission(updatedData);
          return updatedData;
        });
      } else {
        setPropertyData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const calculateTotalComission = (data) => {
    const { precioCierre, buyingTip, selleringTip } = data.cerrado;
  
    if (isNaN(precioCierre) || precioCierre === "") return "0.00";
  
    const price = parseFloat(precioCierre);
  
    if (data.isForRent) {
      // Si es para alquiler, asignamos las comisiones de la nueva forma
      data.cerrado.sellerCommision = price.toFixed(2); // 100% del precio de cierre
      data.cerrado.officeComission = (price * 0.92).toFixed(2); // 92% del precio de cierre
      data.cerrado.franquiciaComission = (price * 0.08).toFixed(2); // 8% del precio de cierre
      data.cerrado.martillerComission = (data.cerrado.officeComission * 0.03).toFixed(2); // 3% de officeComission
  
      // Activamos los checkboxes automáticamente
      data.cerrado.buyingTip = true;
      data.cerrado.selleringTip = true;

    
      // console.log(data.cerrado.sellerCommision);
      // console.log(data.cerrado.officeComission);
      // console.log(data.cerrado.franquiciaComission);
      // console.log(data.cerrado.martillerComission);
      
      return price.toFixed(2);
    }
  
    // Si es una venta normal, se mantiene el cálculo anterior
    let totalComission = 0;
    const sellerComm = parseFloat(data.sellerCommission) / 100 || 0;
    const buyerComm = parseFloat(data.buyerCommission) / 100 || 0;
  
    if (buyingTip) totalComission += price * buyerComm;
    if (selleringTip) totalComission += price * sellerComm;
  
    const sellerCommission = (totalComission * 0.57).toFixed(2);
    const officeCommission = (totalComission * 0.35).toFixed(2);
    const franquiciaComission = (totalComission * 0.08).toFixed(2);
    const martillerComission = (officeCommission * 0.03).toFixed(2);
  
    data.cerrado.sellerCommision = sellerCommission;
    data.cerrado.officeComission = officeCommission;
    data.cerrado.franquiciaComission = franquiciaComission;
    data.cerrado.martillerComission = martillerComission;

    console.log(totalComission);
    console.log(data.cerrado.sellerCommision);
    console.log(data.cerrado.officeComission);
    console.log(data.cerrado.franquiciaComission);
    console.log(data.cerrado.martillerComission);
  
    return totalComission.toFixed(2);
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...propertyData,
      cerrado: {
        ...propertyData.cerrado,
        cierre: true, 
      },
    };

    dispatch(editProperty(id, updatedData));
  };

  if (loading) return <p>Cargando datos de la propiedad...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.container}>
      <h2 className={style.title}>Cerrar la Propiedad</h2>
      <p className={style.subtitle}>
        Una vez cerrada la propiedad dejará de figurar en las plataformas de comercialización y dejará de estar en su pantalla principal.
      </p>
      <form onSubmit={handleSubmit} className={style.form}>
        <fieldset className={style.fieldset}>
          <div className={style.formGroup}>
            <h2 className={style.title}>Precio</h2>
            <select
              name="cerrado.currencyCierre"
              className={style.selectInput}
              value={propertyData.cerrado.currencyCierre || ""}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="ARG">ARG</option>
            </select>
            <input
              type="text"
              name="cerrado.precioCierre"
              className={style.inputNumber}
              value={propertyData.cerrado.precioCierre || ""}
              onChange={handleChange}
            />
          </div>

          <h2 className={style.title}>Fecha de Cierre:</h2>
          <input
            type="date"
            name="cerrado.fecha"
            className={style.fecha}
            value={propertyData.cerrado.fecha || ""}
            onChange={handleChange}
          />
        </fieldset>

        <label>
          <input
            type="checkbox"
            name="cerrado.soldByAgent"
            checked={propertyData.cerrado.soldByAgent}
            onChange={handleChange}
          />
          Cerrado por el agente
        </label>

        {propertyData.cerrado.soldByAgent ? (
          <>
            <h2 className={style.title}>Comisiones</h2>
            <label>
              <input
                type="checkbox"
                name="cerrado.buyingTip"
                checked={propertyData.cerrado.buyingTip}
                onChange={handleChange}
              />
              Comisión del comprador
            </label>

            <label>
              <input
                type="checkbox"
                name="cerrado.selleringTip"
                checked={propertyData.cerrado.selleringTip}
                onChange={handleChange}
              />
              Comisión del vendedor
            </label>

           
        
          </>
        ) : (
          <div className={style.formGroup}>
            <label>
              <h2 className={style.title}>Agencia que vendió</h2>
              <input
                type="text"
                name="cerrado.soldByAgency"
                className={style.inputText}
                value={propertyData.cerrado.soldByAgency || ""}
                onChange={handleChange}
              />
            </label>
          </div>
        )}

        <button type="submit" className={style.button}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default CloseProperty;

