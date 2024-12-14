import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';

const FormularioInicial = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    numCel: '',
    nombreMadre: '',
    nombrePadre: '',
    nivel: '',
    clases: [],
    dia: '',
    participaMuestra: false,
    estiloMusica: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleClasesChange = (e) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      clases: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formValues.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!formValues.edad || isNaN(formValues.edad))
      newErrors.edad = 'La edad debe ser un número válido';
    if (!formValues.numCel && (!formValues.nombreMadre || !formValues.nombrePadre))
      newErrors.numCel = 'Debe ingresar un número de celular o el nombre de los padres';
    if (!formValues.nivel) newErrors.nivel = 'Seleccione un nivel de aprendizaje';
    if (!formValues.clases.length) newErrors.clases = 'Seleccione al menos una clase';
    if (!formValues.dia) newErrors.dia = 'Seleccione un día para las clases';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulario válido:', formValues);
      alert('Formulario enviado correctamente');
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <TextField
        label="Nombre"
        name="nombre"
        value={formValues.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.nombre}
        helperText={errors.nombre}
      />

      <TextField
        label="Apellido"
        name="apellido"
        value={formValues.apellido}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.apellido}
        helperText={errors.apellido}
      />

      <TextField
        label="Edad"
        name="edad"
        type="number"
        value={formValues.edad}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.edad}
        helperText={errors.edad}
      />

      <TextField
        label="Número de celular"
        name="numCel"
        value={formValues.numCel}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.numCel}
        helperText={errors.numCel}
      />

      <TextField
        label="Nombre de la madre"
        name="nombreMadre"
        value={formValues.nombreMadre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Nombre del padre"
        name="nombrePadre"
        value={formValues.nombrePadre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <FormLabel>Nivel de aprendizaje</FormLabel>
        <RadioGroup
          name="nivel"
          value={formValues.nivel}
          onChange={handleChange}
        >
          <FormControlLabel value="iniciacion" control={<Radio />} label="Iniciación" />
          <FormControlLabel value="medio" control={<Radio />} label="Medio" />
          <FormControlLabel value="avanzado" control={<Radio />} label="Avanzado" />
        </RadioGroup>
        {errors.nivel && <span style={{ color: 'red' }}>{errors.nivel}</span>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="clases-label">Clases</InputLabel>
        <Select
          labelId="clases-label"
          name="clases"
          multiple
          value={formValues.clases}
          onChange={handleClasesChange}
        >
          <MenuItem value="piano">Piano</MenuItem>
          <MenuItem value="guitarra">Guitarra</MenuItem>
          <MenuItem value="percusion">Percusión</MenuItem>
          <MenuItem value="canto">Canto</MenuItem>
          <MenuItem value="otros">Otros</MenuItem>
        </Select>
        {errors.clases && <span style={{ color: 'red' }}>{errors.clases}</span>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="dia-label">Día</InputLabel>
        <Select
          labelId="dia-label"
          name="dia"
          value={formValues.dia}
          onChange={handleChange}
        >
          <MenuItem value="lunes">Lunes</MenuItem>
          <MenuItem value="martes">Martes</MenuItem>
          <MenuItem value="miercoles">Miércoles</MenuItem>
          <MenuItem value="jueves">Jueves</MenuItem>
          <MenuItem value="viernes">Viernes</MenuItem>
        </Select>
        {errors.dia && <span style={{ color: 'red' }}>{errors.dia}</span>}
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            name="participaMuestra"
            checked={formValues.participaMuestra}
            onChange={handleChange}
          />
        }
        label="¿Te interesaría participar en las muestras?"
      />

      <TextField
        label="Estilo de música preferido"
        name="estiloMusica"
        value={formValues.estiloMusica}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Enviar
      </Button>
    </form>
  );
};

export default FormularioInicial;