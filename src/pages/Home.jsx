import React from 'react';
import logoAcorde from "../assets/logoAcorde.jpeg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center',
    height: '98vh',
    gap: '16px', // Espaciado entre elementos
  };

  const imageStyle = {
    maxWidth: '100vw',
    maxHeight: '100vh', // Ajusta la altura máxima si es necesario
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
      <p>¿Querés mas info?</p>
      <Button size="large" className='botonInicialAcorde' onClick={()=>navigate("/formInicial")} variant="outlined">PRE-INSCRIBITE</Button>
      <p>y te contamos mas!</p>
    </div>
  );
};

export default Home;
