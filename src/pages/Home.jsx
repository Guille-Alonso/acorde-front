import React from 'react';
import logoAcorde from "../assets/logoColor.jpg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    gap: '16px', // Espaciado entre elementos
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const navigate = useNavigate()
  return (
    <div style={containerStyle}>
      <img 
        src={logoAcorde} 
        alt="Centrada" 
        style={imageStyle} 
      />
      <Button className='botonInicialAcorde' onClick={()=>navigate("/formInicial")} variant="outlined">pre inscripcion</Button>
    </div>
  );
};

export default Home;
