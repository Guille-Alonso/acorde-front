import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { axios } from "../config/axios";
import { AcordeContext } from "../context/AcordeContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {login, botonState, authenticated } = useContext(AcordeContext);

  const [formData, setFormData] = useState({
    nombreUsuario: "",
    contraseña: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/admin");
    }
  }, [authenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.nombreUsuario || !formData.contraseña) {
      setError("Debe completar los campos");
      setSuccess("");
      return;
    }
  
    try {
        login(formData);
    } catch (error) {
      console.log(error);
      // setError(error.response ? error.response.data.message : error.message);
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="Usuario"
        type="text"
        name="nombreUsuario"
        value={formData.nombreUsuario}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Contraseña"
        type="password"
        name="contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button disabled={botonState} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Ingresar
      </Button>
    </Box>
  );
};

export default Login;
