import React from 'react';
import { Link } from 'react-router-dom';

const CardSellerProperties = ({ property }) => {
  return (
    <div className="card">
      <img src={property.photo[0]} className="card-img-top" alt={property.title} />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.description}</p>
        <Link to={`/detalles/${property.id}`}>
        <button  className="btn btn-primary">Ver detalles</button>
        </Link>
      </div>
    </div>
  );
};

export default CardSellerProperties;
