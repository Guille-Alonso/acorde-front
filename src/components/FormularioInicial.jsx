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
  StepLabel,
} from '@mui/material';
import nenaInicio from "../assets/nenaInicio.jpg"
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"
import luchaCanta from "../assets/luchaCanta.jpg"
import pibeOk from "../assets/pibeOk.jpg"
import "./FormularioInicial.css"
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
    dias:[],
    participaMuestra: false,
    estiloMusica: '',
    comentario: ''
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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyleInicioForm = {
    maxWidth: '90vw',
    maxHeight: '90vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const imageStyleRubitoConGuitarra = {
    maxWidth: '90vw',
    maxHeight: '40vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const imageStylePibeOK = {
    maxWidth: '90vw',
    maxHeight: '40vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };


  const handleCheckboxChangeClases = (event) => {
    const { value, checked } = event.target;
    setFormValues((prevState) => {
      if (checked) {
        // Agregar al array
        return { ...prevState, clases: [...prevState.clases, value] };
      } else {
        // Quitar del array
        return {
          ...prevState,
          clases: prevState.clases.filter((clase) => clase !== value),
        };
      }
    });
  };
  

  const handleCheckboxChangeDias = (event) => {
    const { value, checked } = event.target;
    setFormValues((prevState) => {
      if (checked) {
        // Agregar al array
        return { ...prevState, dias: [...prevState.dias, value] };
      } else {
        // Quitar del array
        return {
          ...prevState,
          dias: prevState.dias.filter((dia) => dia !== value),
        };
      }
    });
  };

  return (
    <div style={containerStyle}>
      <Box
        sx={{
          maxWidth: 800,
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          marginTop: 1,
        }}
      >
        <Grid container style={containerStyle}>
          <img src={nenaInicio} alt="Centrada" style={imageStyleInicioForm} />
          <StepLabel sx={{ textAlign: "justify", marginTop: 1 }}>
            Hola! Te ofrecemos este formulario de Pre-Inscripción para la
            academia de ACORDE 2025. Los datos que nos brindes, ayudarán a
            diagramar las clases y grupos de una mejor manera. Desde ya, muchas
            gracias!
          </StepLabel>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ marginTop: 2 }}>
            <p className="colorDatosAlumno" component="legend">
              DATOS DEL ALUMNO/A
            </p>
            <Grid container columnSpacing={2}>
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
                  label="Número de celular (opcional)"
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
            </Grid>

            <p className="colorDatosAlumno" component="legend">
              DATOS DE PADRE/MADRE
            </p>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre"
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
                <TextField
                  label="Teléfono de contacto"
                  name="telefonoPadre"
                  value={formValues.telefonoPadre}
                  onChange={handleChange}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("telefonoPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.telefonoPadre}
                  helperText={errors.telefonoPadre}
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
              <Grid container style={containerStyle}>
                <img
                  src={rubitoConGuitarra}
                  alt="Centrada"
                  style={imageStyleRubitoConGuitarra}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
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
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: "#9AB1BC", // Cambia el color cuando está marcado
                  },
                  "& .MuiFormLabel-root:not(.Mui-focused)": {
                    color: "#9AB1BC", // Color que se mantiene cuando pierde el foco
                  },
                }}
              >
                <FormLabel className="preguntarSobreClases" component="legend">
                  ¿Te gustaría aprender algún instrumento o canto?
                </FormLabel>
                <Grid container style={containerStyle}>
                  <Grid>
                    {/* <Grid item xs={6}> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Piano")}
                          onChange={handleCheckboxChangeClases}
                          value="Piano"
                        />
                      }
                      label="Piano"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Violín")}
                          onChange={handleCheckboxChangeClases}
                          value="Violín"
                        />
                      }
                      label="Violín"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Guitarra")}
                          onChange={handleCheckboxChangeClases}
                          value="Guitarra"
                        />
                      }
                      label="Guitarra"
                    />
                    {/* </Grid> */}
                    {/* <Grid item xs={6}> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Percusión")}
                          onChange={handleCheckboxChangeClases}
                          value="Percusión"
                        />
                      }
                      label="Percusión"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Canto")}
                          onChange={handleCheckboxChangeClases}
                          value="Canto"
                        />
                      }
                      label="Canto"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.clases.includes("Otro")}
                          onChange={handleCheckboxChangeClases}
                          value="Otro"
                        />
                      }
                      label="Otro Instrumento"
                    />
                    {/* </Grid> */}
                  </Grid>
                </Grid>
                <FormLabel className="preguntarSobreClases">¿Cuál?</FormLabel>

                {errors.clases && (
                  <FormHelperText>{errors.clases}</FormHelperText>
                )}
              </FormControl>

              <FormLabel
                className="preguntarSobreClases colorDatosAlumno"
                component="legend"
              >
                *Las clases serán de 18.30hs a 20hs una vez por semana.
              </FormLabel>
              <FormLabel
                className="preguntarSobreClases colorDatosAlumno"
                component="legend"
              >
                Selecciona los días en los que SI podrías asistir
              </FormLabel>

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
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: "#9AB1BC", // Cambia el color cuando está marcado
                  },
                  "& .MuiFormLabel-root:not(.Mui-focused)": {
                    color: "#9AB1BC", // Color que se mantiene cuando pierde el foco
                  },
                }}
              >
                <Grid container style={containerStyle}>
                  <Grid>
                    {/* <Grid item xs={6}> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.dias.includes("Lunes")}
                          onChange={handleCheckboxChangeDias}
                          value="Lunes"
                        />
                      }
                      label="Lunes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.dias.includes("Martes")}
                          onChange={handleCheckboxChangeDias}
                          value="Martes"
                        />
                      }
                      label="Martes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.dias.includes("Miércoles")}
                          onChange={handleCheckboxChangeDias}
                          value="Miércoles"
                        />
                      }
                      label="Miércoles"
                    />
                    {/* </Grid> */}
                    {/* <Grid item xs={6}> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.dias.includes("Jueves")}
                          onChange={handleCheckboxChangeDias}
                          value="Jueves"
                        />
                      }
                      label="Jueves"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formValues.dias.includes("Viernes")}
                          onChange={handleCheckboxChangeDias}
                          value="Viernes"
                        />
                      }
                      label="Viernes"
                    />

                    {/* </Grid> */}
                  </Grid>
                    <img src={luchaCanta} alt="Centrada" style={imageStylePibeOK} />
                </Grid>
                {errors.dias && <FormHelperText>{errors.dias}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
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
                <FormLabel component="legend">
                  ¿En qué nivel de aprendizaje crees que te encuentras?
                </FormLabel>
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
                {errors.nivel && (
                  <FormHelperText>{errors.nivel}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} md={6}>
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
            </Grid> */}

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
                label="¿Te gustaría participar de las muestras
y shows abiertos al público?
"
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

              <TextField
                label="Alguna pregunta o comentario"
                name="comentario"
                value={formValues.comentario}
                onFocus={() => handleFocus("comentario")}
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
            flexDirection= 'column'
            justifyContent="center"
            alignItems="center"
          >
               <img src={pibeOk} alt="Centrada" style={imageStylePibeOK} />
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
    </div>
  );
};

export default FormularioInicial;

