import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getListProperties } from '../../Redux/Actions/actions';
import CardBalanceAdmin from '../CardBalanceAdmin/CardBalanceAdmin';
import style from './CardBalanceAdminContainer.module.css';

const CardBalanceAdminContainer = ({ activeProperties, getListProperties }) => {
  const [balances, setBalances] = useState({
    totalCerradas: 0,
    cerradasPorAgente: 0,
    cerradasPorOtras: 0,
    puntaCompradora: 0,
    puntaVendedora: 0,
    puntaAmbas: 0,
    comisiones: {},
  });

  useEffect(() => {
    getListProperties('/properties/active?cerrado=true');
  }, [getListProperties]);

  useEffect(() => {
    if (!activeProperties || activeProperties.length === 0) return;

    let cerradasPorAgente = 0;
    let cerradasPorOtras = 0;
    let puntaCompradora = 0;
    let puntaVendedora = 0;
    let puntaAmbas = 0;

    let comisiones = {}; // Objeto para almacenar comisiones por moneda

    activeProperties.forEach((property) => {
      const cerrado = property?.cerrado;
      if (!cerrado) return;

      // Contadores de cierres
      if (cerrado.soldByAgent) cerradasPorAgente++;
      if (cerrado.soldByAgent === false) cerradasPorOtras++;
      if (cerrado.buyingTip && cerrado.selleringTip) {
        puntaAmbas++;
      } else {
        if (cerrado.buyingTip) puntaCompradora++;
        if (cerrado.selleringTip) puntaVendedora++;
      }

      // Manejo de comisiones por moneda
      const currency = cerrado.currencyCierre || "USD"; // Si no tiene currencyCierre, asumimos USD
      if (!comisiones[currency]) {
        comisiones[currency] = {
          sellerCommision: 0,
          officeComission: 0,
          totalComission: 0,
          franquiciaComission: 0,
          martillerComission: 0,
        };
      }

      // Sumar comisiones si existen
      comisiones[currency].sellerCommision += parseFloat(cerrado.sellerCommision) || 0;
      comisiones[currency].officeComission += parseFloat(cerrado.officeComission) || 0;
      comisiones[currency].totalComission += parseFloat(cerrado.totalComission) || 0;
      comisiones[currency].franquiciaComission += parseFloat(cerrado.franquiciaComission) || 0;
      comisiones[currency].martillerComission += parseFloat(cerrado.martillerComission) || 0;
    });

    setBalances({
      totalCerradas: activeProperties.length,
      cerradasPorAgente,
      cerradasPorOtras,
      puntaCompradora,
      puntaVendedora,
      puntaAmbas,
      comisiones,
    });

  }, [activeProperties]);

  if (!activeProperties) {
    return <div>Cargando propiedades...</div>;
  }

  if (activeProperties.length === 0) {
    return <div>No hay propiedades cerradas.</div>;
  }

  return (
    <div>
      <h3 className={style.title}>Cantidad: {balances.totalCerradas} Publicaciones Cerradas</h3>

      {/* Sección de balances */}
      <div className={style.balancesContainer}>
        <h4>Balances Generales</h4>
        <p><strong>Cerradas por Agente:</strong> {balances.cerradasPorAgente}</p>
        <p><strong>Cerradas por Otra Inmobiliaria:</strong> {balances.cerradasPorOtras}</p>
        <p><strong>Punta Compradora:</strong> {balances.puntaCompradora}</p>
        <p><strong>Punta Vendedora:</strong> {balances.puntaVendedora}</p>
        <p><strong>Punta Compradora y Vendedora:</strong> {balances.puntaAmbas}</p>

        {/* Comisiones separadas por moneda */}
        <h4>Comisiones Generadas</h4>
        {Object.entries(balances.comisiones).map(([currency, comision]) => (
          <div key={currency} className={style.comisionContainer}>
            <h5>Moneda: {currency}</h5>
            <p><strong>Comisión Vendedor:</strong> {currency} {comision.sellerCommision.toLocaleString('es-AR')}</p>
            <p><strong>Comisión Oficina:</strong> {currency} {comision.officeComission.toLocaleString('es-AR')}</p>
            <p><strong>Comisión Total:</strong> {currency} {comision.totalComission.toLocaleString('es-AR')}</p>
            <p><strong>Comisión Franquicia:</strong> {currency} {comision.franquiciaComission.toLocaleString('es-AR')}</p>
            <p><strong>Comisión Martillero:</strong> {currency} {comision.martillerComission.toLocaleString('es-AR')}</p>
          </div>
        ))}
      </div>

      {/* Listado de propiedades cerradas */}
      <div className="card-deck">
        {activeProperties.map((property) => (
          <CardBalanceAdmin key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeProperties: state.activeProperties,
});

export default connect(mapStateToProps, { getListProperties })(CardBalanceAdminContainer);

