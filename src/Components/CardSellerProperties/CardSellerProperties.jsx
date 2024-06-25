import React from 'react';

const CardSellerProperties = ({ property }) => {
  return (
    <div className="card">
      <img src={property.photo[0]} className="card-img-top" alt={property.title} />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.description}</p>
        <a href="#" className="btn btn-primary">Ver detalles</a>
      </div>
    </div>
  );
};

export default CardSellerProperties;
