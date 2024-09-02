import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailList from '../../Components/DetailList/DetailList';
import style from './DetailListView.module.css'

const DetailListView = ({ match }) => {
    const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        setProperty(response.data.data);
      
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchProperty();
  }, [id]);

  return (
    <div>
      {property && <DetailList property={property} />}
      <p className={style.declaracion}>
            By Raices (bajo la sociedad Ditova SAS) NO ejerce el corretaje inmobiliario. Cada oficina es de propiedad y gestión independiente. En cumplimiento de las leyes vigentes que regulan el corretaje inmobiliario, Ley Nacional 25.028, Ley 22.802 de Lealtad Comercial, Ley 24.240 de Defensa al Consumidor, las normas del Código Civil y Comercial de la Nación y Constitucionales, los agentes/gestores de By Raices NO ejercen el corretaje inmobiliario. Todas las operaciones inmobiliarias son objeto de intermediación y conclusión por parte de los corredores públicos inmobiliarios colegiados, cuyos datos se exhiben en cada publicación de propiedad objeto de comercialización.
        </p>
    </div>
  );
};

export default DetailListView;