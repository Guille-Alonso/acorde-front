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
  Box,
  Grid,
  FormHelperText,
  styled,
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
    clases: '',
    dia: '',
    participaMuestra: false,
    estiloMusica: '',
  });

  const [errors, setErrors] = useState({});
const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const handleFocus = (name) => {
  setFocusedField(name);
};


  const validate = () => {
    const newErrors = {};
console.log(-4 > 0);

    if (!formValues.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formValues.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!formValues.edad || isNaN(formValues.edad) || !Number(formValues.edad) > 0 || Number(formValues.edad) < 7)
      newErrors.edad = 'Debe tener como mínimo 7 años';
    if (!formValues.numCel || isNaN(formValues.numCel))
      newErrors.numCel = 'Debe ingresar un número de celular válido';

    if (!formValues.nombrePadre) newErrors.nombrePadre = 'El nombre del padre es obligatorio';
    if (!formValues.nombreMadre) newErrors.nombreMadre = 'El nombre de la madre es obligatorio';
    if (!formValues.nivel) newErrors.nivel = 'Seleccione un nivel de aprendizaje';
    if (!formValues.clases.length) newErrors.clases = 'Seleccione una clase';
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

  const CustomSelect = styled(Select)(({ theme }) => ({
    '&.MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#9AB1BC', // Cambia esto al color que quieras
        borderWidth: '2px', // Opcional: hacer el borde más grueso cuando está enfocado
      },
    },
  }));

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto", // Esto centrará horizontalmente
        padding: "20px",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column", // Para mantener el contenido vertical
        alignItems: "center", // Centrar contenido horizontalmente
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formValues.nombre}
              onChange={(e) => {
                // Verificar si el input contiene solo letras y acentos
                if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              inputProps={{ maxLength: 30 }}
              onFocus={() => handleFocus("nombre")}
              margin="normal"
              error={!!errors.nombre}
              helperText={errors.nombre}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Apellido"
              name="apellido"
              value={formValues.apellido}
              onChange={(e) => {
                // Verificar si el input contiene solo letras y acentos
                if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              inputProps={{ maxLength: 30 }}
              onFocus={() => handleFocus("apellido")}
              margin="normal"
              error={!!errors.apellido}
              helperText={errors.apellido}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Edad"
              name="edad"
              type="text"
              value={formValues.edad}
              onChange={(e) => {
                // Verificar si el input contiene solo números
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              inputProps={{ maxLength: 3 }}
              onFocus={() => handleFocus("edad")}
              margin="normal"
              error={!!errors.edad}
              helperText={errors.edad}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Número de celular"
              name="numCel"
              type="text"
              value={formValues.numCel}
              onChange={(e) => {
                // Verificar si el input contiene solo números
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              inputProps={{ maxLength: 12 }}
              onFocus={() => handleFocus("numCel")}
              margin="normal"
              error={!!errors.numCel}
              helperText={errors.numCel}
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre de la madre"
              name="nombreMadre"
              value={formValues.nombreMadre}
              onChange={handleChange}
              inputProps={{ maxLength: 40 }}
              onFocus={() => handleFocus("nombreMadre")}
              margin="normal"
              fullWidth
              error={!!errors.nombreMadre}
              helperText={errors.nombreMadre}
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del padre"
              name="nombrePadre"
              value={formValues.nombrePadre}
              onChange={handleChange}
              inputProps={{ maxLength: 40 }}
              onFocus={() => handleFocus("nombrePadre")}
              margin="normal"
              fullWidth
              error={!!errors.nombrePadre}
              helperText={errors.nombrePadre}
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#DFA57C",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#DFA57C",
                      },
                    },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              component="fieldset"
              margin="normal"
              fullWidth
              onFocus={() => handleFocus("nivel")}
              error={!!errors.nivel}
              sx={{
                "& .MuiFormLabel-root.Mui-focused": {
                  color: focusedField === "nivel" ? "#9AB1BC" : undefined,
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "#9AB1BC", // Color que toma el campo en foco
                  },
                },
                "& .MuiRadio-root.Mui-checked": {
                  color: "#9AB1BC", // Cambia el color cuando está marcado
                },
                "& .MuiFormLabel-root:not(.Mui-focused)": {
                  color: "#9AB1BC", // Color que se mantiene cuando pierde el foco
                },
              }}
            >
              <FormLabel component="legend">Nivel de aprendizaje</FormLabel>
              <RadioGroup
                name="nivel"
                value={formValues.nivel}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="iniciacion"
                  control={<Radio />}
                  label="Iniciación"
                />
                <FormControlLabel
                  value="medio"
                  control={<Radio />}
                  label="Medio"
                />
                <FormControlLabel
                  value="avanzado"
                  control={<Radio />}
                  label="Avanzado"
                />
              </RadioGroup>
              {/* Este componente mostrará el mensaje de error */}
              {errors.nivel && <FormHelperText>{errors.nivel}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              component="fieldset"
              margin="normal"
              fullWidth
              onFocus={() => handleFocus("clases")}
              error={!!errors.clases}
              sx={{
                "& .MuiFormLabel-root.Mui-focused": {
                  color: focusedField === "clases" ? "#9AB1BC" : undefined,
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& fieldset": {
                    borderColor: "#9AB1BC", // Color que toma el campo en foco
                  },
                },
                "& .MuiRadio-root.Mui-checked": {
                  color: "#9AB1BC", // Cambia el color cuando está marcado
                },
                "& .MuiFormLabel-root:not(.Mui-focused)": {
                  color: "#9AB1BC", // Color que se mantiene cuando pierde el foco
                },
              }}
            >
              <FormLabel component="legend">Clases</FormLabel>
              {/* <RadioGroup name="clases" value={formValues.clases} onChange={handleChange}>
                <FormControlLabel value="Piano" control={<Radio />} label="Piano" />
                <FormControlLabel value="Guitarra" control={<Radio />} label="Guitarra" />
                <FormControlLabel value="Percusión" control={<Radio />} label="Percusión" />
                <FormControlLabel value="Canto" control={<Radio />} label="Canto" />
                <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
              </RadioGroup> */}
              <RadioGroup
                name="clases"
                value={formValues.clases}
                onChange={handleChange}
              >
              
                <Grid container spacing={1}>
                  {/* Primera columna */}
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="Piano"
                      control={<Radio />}
                      label="Piano"
                    />
                    <FormControlLabel
                      value="Guitarra"
                      control={<Radio />}
                      label="Guitarra"
                    />
                     <FormControlLabel
                      value="Otros"
                      control={<Radio />}
                      label="Otros"
                    />
                  </Grid>

                  {/* Segunda columna */}
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="Percusión"
                      control={<Radio />}
                      label="Percusión"
                    />
                    <FormControlLabel
                      value="Canto"
                      control={<Radio />}
                      label="Canto"
                    />
                   
                    
                  </Grid>
                </Grid>
              </RadioGroup>
              {/* Este componente mostrará el mensaje de error */}
              {errors.clases && (
                <FormHelperText>{errors.clases}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" error={!!errors.dia}>
              <InputLabel
                // sx={{
                //   '&.Mui-focused': {
                //     color: '#9AB1BC', // Cambia esto al color que quieras
                //   }
                // }}
                sx={{
                  "&.Mui-focused": {
                    color: "#9AB1BC", // Color cuando está enfocado
                  },
                  "&.MuiInputLabel-shrink": {
                    marginTop: "-8px", // Ajusta este valor según necesites
                    // Otros ajustes de posicionamiento o espaciado
                  },
                }}
                id="dia-label"
              >
                Día
              </InputLabel>
              <CustomSelect
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
              </CustomSelect>
              {errors.dia && <FormHelperText>{errors.dia}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} marginTop={2.5}>
            <FormControlLabel
              control={
                <Checkbox
                  name="participaMuestra"
                  checked={formValues.participaMuestra}
                  onChange={handleChange}
                  sx={{
                    "&.Mui-checked": {
                      color: "#9AB1BC", // Cambia el color del checkbox cuando está marcado
                    },
                  }}
                />
              }
              label="¿Te interesaría participar en las muestras?"
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              label="Estilo de música preferido"
              name="estiloMusica"
              value={formValues.estiloMusica}
              onFocus={() => handleFocus("estiloMusica")}
              onChange={handleChange}
              margin="normal"
              fullWidth
              inputProps={{ maxLength: 80 }}
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    color: "#9AB1BC",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused, &.MuiInputBase-root:not(:placeholder-shown)":
                    {
                      "& fieldset": {
                        borderColor: "#9AB1BC",
                      },
                    },
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            className="botonEnviarFormPreInscripcion"
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default FormularioInicial;

