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
  Snackbar,
  Alert,
} from '@mui/material';
// import nenaInicio from "../assets/nenaInicio.jpg"
import nenaInicio from "../assets/inicioForm.jpg"
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"
import luchaCanta from "../assets/luchaCanta.jpg"
import cantora from "../assets/cantoraRec.jpg"
import pibeOk from "../assets/pibeOk.jpg"
import "./FormularioInicial.css"
import { axios } from '../config/axios';
const FormularioInicial = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    numCel: '',
    nombrePadre: '',
    telefonoPadre: '',
    apellidoPadre: '',
    emailPadre: '',
    nivel: '',
    clases: [],
    dias:[],
    participaMuestra: false,
    estiloMusica: '',
    comentario: '',
    otroInstrumento: ''
  });

  const [errors, setErrors] = useState({});
const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    validate();
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

    if (!formValues.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formValues.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!formValues.edad || isNaN(formValues.edad) || !Number(formValues.edad) > 0 || Number(formValues.edad) < 7 || formValues.edad < 7)
      newErrors.edad = 'Debe tener como mínimo 7 años';

    // if (!formValues.numCel || isNaN(formValues.numCel))
    //   newErrors.numCel = 'Debe ingresar un número de celular válido';

    if (!formValues.nombrePadre) newErrors.nombrePadre = 'El nombre del padre es obligatorio';
    if (!formValues.apellidoPadre) newErrors.apellidoPadre = 'El apellido del padre es obligatorio';
    if (!formValues.telefonoPadre) newErrors.telefonoPadre = 'Debe ingresar un teléfono de contacto';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.emailPadre || !emailRegex.test(formValues.emailPadre)) newErrors.emailPadre = 'Debe ingresar un email válido'
    if (!formValues.nivel) newErrors.nivel = 'Seleccione un nivel de aprendizaje';
    if (formValues.clases.length == 0) newErrors.clases = 'Seleccione al menos una clase';
    if (formValues.dias.length == 0) newErrors.dias = 'Seleccione al menos un día';

    if (formValues.clases.includes("Otro") && !formValues.otroInstrumento) newErrors.otroInstrumento = 'Debe ingresar un instrumento';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [botonState, setBotonState] = useState(false)
  const handleSubmit = async (e) => {
    setBotonState(true);
    e.preventDefault();
    try {
      if (validate()) {
        console.log('Formulario válido:', formValues);
        // alert('Formulario enviado correctamente');
        const {data} = await axios.post("formularios/preInscripcion",formValues)
        // console.log(data);
        handleOpenNotify()
      } else {
        console.log('Errores en el formulario:', errors);
      }
    } catch (error) {
      alert("intente nuevamente mas tarde..")
      console.log(error)
      setBotonState(false);
    }
    setBotonState(false);
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
    maxWidth: '100vw',
    maxHeight: '55vh', // Ajusta la altura máxima si es necesario
    borderRadius: '8px', // Borde opcional para estilizar
  };

  const imageStylePibeOK = {
    maxWidth: '90vw',
    maxHeight: '50vh', // Ajusta la altura máxima si es necesario
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

  const [open, setOpen] = useState(false);

  // Función para manejar la apertura y cierre de la alerta
  const handleOpenNotify = () => {
    setOpen(true); // Mostrar la alerta
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Ignorar el cierre al hacer clic fuera
    }
    setOpen(false); // Cerrar la alerta
  };


  return (
    <div style={containerStyle}>
      <Box
        sx={{
          maxWidth: 800,
          padding: "10px",
          boxShadow: 3,
          borderRadius: 2,
          // backgroundColor: "#f9f9f9",
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
              Datos del alumno/a
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
              Datos de padre/madre
            </p>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre"
                  name="nombrePadre"
                  value={formValues.nombrePadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
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
                  label="Apellido"
                  name="apellidoPadre"
                  value={formValues.apellidoPadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo letras y acentos
                    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("apellidoPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.apellidoPadre}
                  helperText={errors.apellidoPadre}
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
                  name="telefonoPadre"
                  value={formValues.telefonoPadre}
                  onChange={(e) => {
                    // Verificar si el input contiene solo números
                    if (/^\d*$/.test(e.target.value)) {
                      handleChange(e);
                    }
                  }}
                  inputProps={{ maxLength: 12 }}
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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  name="emailPadre"
                  value={formValues.emailPadre}
                  onChange={handleChange}
                  inputProps={{ maxLength: 40 }}
                  onFocus={() => handleFocus("emailPadre")}
                  margin="normal"
                  fullWidth
                  error={!!errors.emailPadre}
                  helperText={errors.emailPadre}
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
                <img src={luchaCanta} alt="Centrada" style={imageStylePibeOK} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                margin="normal"
                fullWidth
                value={formValues.clases}
                onFocus={() => handleFocus("clases")}
                error={!!errors.clases}
                // helperText={errors.clases}
                name="clases"
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
                  ¿Qué te gustaría aprender?
                </FormLabel>
                <Grid container style={containerStyle}>
                  <Grid>
                    {/* <Grid item xs={6}> */}
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
                          checked={formValues.clases.includes("Guitarra")}
                          onChange={handleCheckboxChangeClases}
                          value="Guitarra"
                        />
                      }
                      label="Guitarra"
                    />
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
                          checked={formValues.clases.includes("Otro")}
                          onChange={handleCheckboxChangeClases}
                          value="Otro"
                        />
                      }
                      label="Otros"
                    />
                    {/* </Grid> */}
                  </Grid>
                  {errors.clases && formValues.clases.length == 0 && <FormHelperText>{errors.clases}</FormHelperText>}
                </Grid>
                {/* <FormLabel className="preguntarSobreClases">¿Cuál?</FormLabel> */}

                {formValues.clases.includes("Otro") && (
                  <Grid item xs={12}>
                    <TextField
                      label="¿Cuál?"
                      name="otroInstrumento"
                      value={formValues.otroInstrumento}
                      onChange={(e) => {
                        // Verificar si el input contiene solo letras y acentos
                        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                      inputProps={{ maxLength: 80 }}
                      onFocus={() => handleFocus("otroInstrumento")}
                      margin="normal"
                      error={!!errors.otroInstrumento}
                      fullWidth
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
                {errors.otroInstrumento && (
                    <FormHelperText style={{ color: "#d32f2f" }}>{errors.otroInstrumento}</FormHelperText>
                  )}
                  </Grid>
                )}

              </FormControl>

              <FormLabel
                className="preguntarSobreClases colorDatosClases"
                component="legend"
              >
                *Las clases serán de 18.30hs a 20hs una vez por semana.
              </FormLabel>
              <FormLabel
                className="preguntarSobreClases colorDatosClases"
                component="legend"
              >
                Selecciona los días en los que SI podrías asistir
              </FormLabel>

              <FormControl
                component="fieldset"
                margin="normal"
                fullWidth
                value={formValues.dias}
                onFocus={() => handleFocus("dias")}
                error={!!errors.dias}
                name="dias"
                sx={{
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "dias" ? "#9AB1BC" : undefined,
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      borderColor: "#DFA57C", // Color que toma el campo en foco
                    },
                  },
                  "& .MuiCheckbox-root.Mui-checked": {
                    color: "#DFA57C", // Cambia el color cuando está marcado
                  },
                  "& .MuiFormLabel-root:not(.Mui-focused)": {
                    color: "#DFA57C", // Color que se mantiene cuando pierde el foco
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
                  {errors.dias && formValues.dias.length == 0 && (
                    <FormHelperText>{errors.dias}</FormHelperText>
                  )}
                  <img
                    src={rubitoConGuitarra}
                    alt="Centrada"
                    style={imageStyleRubitoConGuitarra}
                  />
                </Grid>
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
                {errors.nivel && !formValues.nivel && (
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
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={cantora} alt="Centrada" style={imageStylePibeOK} />
            <Button
              className="botonEnviarFormPreInscripcion"
              type="submit"
              variant="contained"
              disabled={botonState}
              sx={{ marginTop: 1 }}
            >
              Enviar
            </Button>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000} // La alerta se cierra automáticamente después de 6 segundos
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Posición de la alerta
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ¡Preinscripción exitosa!
        </Alert>
      </Snackbar>

    </div>
  );
};

export default FormularioInicial;

