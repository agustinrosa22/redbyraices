import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import style from './List.module.css';
import CardActiveContainer from '../../Components/CardActiveContainer/CardActiveContainer';

const List = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    if (phoneNumber) {
      setShowQR(true);
    }
  };

  const handleDownloadQR = () => {
    const qrCanvas = document.getElementById('qrCode');
    const dataUrl = qrCanvas.toDataURL('image/png'); // Cambiar a 'image/jpeg' si prefieres JPG
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `whatsapp_qr_${phoneNumber}.png`; // Nombre del archivo de descarga
    link.click();
  };

  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <div className={style.container}>
      <h1>Generador de QR para WhatsApp</h1>
      <input
        type="text"
        placeholder="Ingresa el número de teléfono con código (+5412616808087)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={style.input}
      />
      <button onClick={handleGenerateQR} className={style.generateButton}>
        Generar QR
      </button>

      {showQR && (
        <div className={style.qrContainer}>
          <QRCodeCanvas
            id="qrCode"
            value={whatsappLink}
            size={200}
            includeMargin={true}
          />
          <button onClick={handleDownloadQR} className={style.downloadButton}>
            Descargar QR
          </button>
        </div>
      )}
      <CardActiveContainer />
    </div>
  );
};

export default List;
