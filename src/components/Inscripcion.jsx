import React, { useRef, useState } from 'react';
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
  useMediaQuery,
} from '@mui/material';
import nenaInicio from "../assets/inicioForm.jpg"
import niñopianocortado from "../assets/niñopianocortado.jpg"
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"
import luchaCanta from "../assets/luchaCanta.jpg"
import cantora from "../assets/cantoraRec.jpg"
import pibeOk from "../assets/pibeOk.jpg"
import "./FormularioInicial.css"
import { axios } from '../config/axios';
import { PREINSCRIPCION_VALUES } from '../helpers';
import { useNavigate } from 'react-router-dom';
import ProgramacionSemanal from './ProgramacionSemanal';

const Inscripcion = () => {
  const [formValues, setFormValues] = useState(PREINSCRIPCION_VALUES);

const [errors, setErrors] = useState({});
const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // validate();
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const handleFocus = (name) => {
  setFocusedField(name);
};

const otroRef = useRef(null);

const nombreAlumnoRef = useRef(null);
const apellidoAlumnoRef = useRef(null);
const edadAlumnoRef = useRef(null);

const nombrePadreRef = useRef(null);
const apellidoPadreRef = useRef(null);
const telefonoPadreRef = useRef(null);
const emailPadreRef = useRef(null);

const clasesRef = useRef(null);
const diasRef = useRef(null);
const nivelRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!formValues.nombre){
      newErrors.nombre = 'El nombre es obligatorio';
      if (nombreAlumnoRef.current) nombreAlumnoRef.current.focus();
    } 

    if (!formValues.apellido) {
      newErrors.apellido = 'El apellido es obligatorio';
      if (apellidoAlumnoRef.current) apellidoAlumnoRef.current.focus();
    }

    if (!formValues.edad || isNaN(formValues.edad) || !Number(formValues.edad) > 0 || Number(formValues.edad) < 6 || formValues.edad < 6){
      newErrors.edad = 'Debe tener como mínimo 6 años';
      if (edadAlumnoRef.current) edadAlumnoRef.current.focus();
    }

    if (!formValues.nombrePadre){
      newErrors.nombrePadre = 'El nombre del padre es obligatorio';
      if (nombrePadreRef.current) nombrePadreRef.current.focus();
    } 

    if (!formValues.apellidoPadre){
      newErrors.apellidoPadre = 'El apellido del padre es obligatorio';
      if (apellidoPadreRef.current) apellidoPadreRef.current.focus();
    } 

    if (!formValues.telefonoPadre){
      newErrors.telefonoPadre = 'Debe ingresar un teléfono de contacto';
      if (telefonoPadreRef.current) telefonoPadreRef.current.focus();
    } 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.emailPadre || !emailRegex.test(formValues.emailPadre)){
      newErrors.emailPadre = 'Debe ingresar un email válido'
      if (emailPadreRef.current) emailPadreRef.current.focus();
    } 

    if (!formValues.nivel){
      newErrors.nivel = 'Seleccione un nivel de aprendizaje';
      if (nivelRef.current) nivelRef.current.focus();
    }

    if (formValues.clases.length == 0){
      newErrors.clases = 'Seleccione al menos una clase';
      if (clasesRef.current) clasesRef.current.focus();
    } 

    if (formValues.dias.length == 0){
      newErrors.dias = 'Seleccione al menos un día';
      if (diasRef.current) diasRef.current.focus();
    } 

    if (formValues.clases.includes("Otro") && !formValues.otroInstrumento) {
      newErrors.otroInstrumento = 'Debe ingresar un instrumento';
      if (otroRef.current) otroRef.current.focus();
    }
      

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [botonState, setBotonState] = useState(false);
  const [notificacion, setNotificacion] = useState({mensaje:"",tipo:""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setBotonState(true);
    e.preventDefault();
    try {
      if (validate()) {
        console.log('Formulario válido:', formValues);
        // alert('Formulario enviado correctamente');
        const {data} = await axios.post("formularios/preInscripcion",formValues)
        // console.log(data);
        setNotificacion({mensaje:"¡Preinscripción exitosa!", tipo:"success"})
        handleOpenNotify();
        setFormValues(PREINSCRIPCION_VALUES);
        
        setTimeout(() => {
           navigate("/preinscripcionExitosa")
        }, 3000);
       
      } else {
        console.log('Errores en el formulario:', errors);
      }
    } catch (error) {
      handleOpenNotify();
      setNotificacion({mensaje: error?.response?.data.message || error.message, tipo:"error"})
      console.log(error)
      setBotonState(false);
    }
    setBotonState(false);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Cambia la dirección a columna
    justifyContent: 'center',
    alignItems: 'center'
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Estilos condicionales
  const imageStyleInicioForm = {
    borderRadius: '8px',
    maxWidth: isSmallScreen ? '100%' : '40vw', // Ancho 100% en pantallas pequeñas, auto en otras
    maxHeight: isSmallScreen ? 'auto' : '60vh', // Ajusta la altura en pantallas pequeñas
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
          otroInstrumento: value === "Otro" ? "" : prevState.otroInstrumento,
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

//   const [formValues2, setFormValues2] = React.useState({
//     disciplinas: [],
//   });

  const handleCheckboxChangeDisciplinas6a9 = (event, dia, disciplina) => {
    const value = `${dia}-${disciplina}`;
    setFormValues((prevValues) => {
      const { disciplinas6a9 } = prevValues;
      if (event.target.checked) {
        // Si está seleccionado, agregar la disciplina
        return { ...prevValues, disciplinas6a9: [...disciplinas6a9, value] };
      } else {
        // Si está deseleccionado, quitar la disciplina
        return {
          ...prevValues,
          disciplinas6a9: disciplinas6a9.filter((item) => item !== value),
        };
      }
    });
  };

  const handleCheckboxChangeDisciplinas10a15 = (event, dia, disciplina) => {
    const value = `${dia}-${disciplina}`;
    setFormValues((prevValues) => {
      const { disciplinas10a15 } = prevValues;
      if (event.target.checked) {
        // Si está seleccionado, agregar la disciplina
        return { ...prevValues, disciplinas10a15: [...disciplinas10a15, value] };
      } else {
        // Si está deseleccionado, quitar la disciplina
        return {
          ...prevValues,
          disciplinas10a15: disciplinas10a15.filter((item) => item !== value),
        };
      }
    });
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
          <img src={niñopianocortado} alt="Centrada" style={imageStyleInicioForm}/>
          <StepLabel sx={{ textAlign: "justify", marginTop: 1 }}>
            Hola! Les compartimos la programación de las clases para la academia de ACORDE 2025. Los datos que nos brindes, ayudarán a diagramar las clases y grupos de una mejor manera. Desde ya, muchas gracias!. <br/> <br/>
            -Las Clases se dictarán en Juan XXII 79 - Yerba Buena (Centro Markay).<br/>
            -Las Clases serán de 1 hs. de duración: <br/>
            (De 6 a 9 años serán de 18:30hs a 19:30hs)<br/>
            (De 10 a 15 años serán de 20hs a 21hs)<br/><br/>
            -El valor de la cuota es de $35.000 asistiendo una vez por semana. <br/>
            (En caso de elegir dos disciplinas (por ejemplo canto y piano) la cuota <br/>
            es de $55.000 asistiendo 2 veces por semana).<br/><br/>
            -Los grupos serán con cupo de hasta 8 alumnos. Los lugares se irán completando según el orden de confirmación y de pago de la cuota.
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
                 inputRef={nombreAlumnoRef}
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
                  inputRef={apellidoAlumnoRef}
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
                 inputRef={edadAlumnoRef}
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
                  inputRef={nombrePadreRef}
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
                  inputRef={apellidoPadreRef}
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
                  inputRef={telefonoPadreRef}
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
                  inputRef={emailPadreRef}
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

                      <ProgramacionSemanal
                          formValues={formValues}
                          handleCheckboxChangeDisciplinas6a9={handleCheckboxChangeDisciplinas6a9}
                          handleCheckboxChangeDisciplinas10a15={handleCheckboxChangeDisciplinas10a15}
                          edad={formValues.edad}
                      />

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
                   inputRef={nivelRef}
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
              Inscribir
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
        <Alert onClose={handleClose} severity={notificacion.tipo} sx={{ width: "100%" }}>
          {notificacion.mensaje}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Inscripcion;

