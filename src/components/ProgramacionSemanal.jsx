import React from "react";
import { Grid, FormControlLabel, Checkbox, Typography, Box, FormHelperText, useMediaQuery } from "@mui/material";
import "./FormularioInicial.css"
import rubitoConGuitarra from "../assets/rubitoConGuitarra.jpg"

const ProgramacionSemanal = ({
  edad,
  formValues,
  handleCheckboxChangeDisciplinas6a9,
  handleCheckboxChangeDisciplinas10a15,
  errors,
  disciplinasRef,
  focusedField,
  handleFocus,
  handleCheckboxChangeDisciplinas4a5
}) => {
  const gruposEdad = [
    {
      rangoEdad: [4, 5],
      titulo: "4 y 5 años",
      disciplinas: ["Canto"],
      formKey: "disciplinas4a5",
      handler: "handleCheckboxChangeDisciplinas4a5"
    },
    {
      rangoEdad: [6, 9],
      titulo: "6 a 9 años",
      disciplinas: ["Canto", "Piano", "Guitarra", "Ukelele", "Violín"],
      formKey: "disciplinas6a9",
      handler: "handleCheckboxChangeDisciplinas6a9"
    },
    {
      rangoEdad: [10, 15],
      titulo: "10 a 15 años",
      disciplinas: ["Canto", "Piano", "Guitarra", "Ukelele", "Violín"],
      formKey: "disciplinas10a15",
      handler: "handleCheckboxChangeDisciplinas10a15"
    }
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyleRubitoConGuitarra = {
    maxWidth: '100vw',
    maxHeight: '55vh',
    borderRadius: '8px',
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const getHandlerForGrupo = (grupo) => {
    if (grupo.formKey === "disciplinas4a5") {
      return handleCheckboxChangeDisciplinas4a5;
    } else if (grupo.formKey === "disciplinas6a9") {
      return handleCheckboxChangeDisciplinas6a9;
    } else if (grupo.formKey === "disciplinas10a15") {
      return handleCheckboxChangeDisciplinas10a15;
    }
  };

  const isHabilitado = (grupo) => {
    return edad >= grupo.rangoEdad[0] && edad <= grupo.rangoEdad[1];
  };

  return (
    <>
    
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#DFA57C',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2
        }}
      >
        OPCIONES DE DISCIPLINAS
      </Typography>
    <Box sx={{ padding: 2 }}>

      <Grid container spacing={{ xs: 4, sm: 4, md: 0, lg: 0 }}>
        {gruposEdad.map((grupo, grupoIndex) => {
          const habilitado = isHabilitado(grupo);
          const handler = getHandlerForGrupo(grupo);
          const disciplinasDelGrupo = formValues[grupo.formKey] || [];

          return (
            <React.Fragment key={grupoIndex}>
              {/* {grupoIndex === 1 && isSmallScreen && (
                <Grid container style={containerStyle}>
                  <img
                    src={rubitoConGuitarra}
                    alt="Centrada"
                    style={imageStyleRubitoConGuitarra}
                  />
                </Grid>
              )} */}
              <Grid item xs={12} md={grupo.rangoEdad[0] === 4 ? 12 : 6}>
                <Typography
                  sx={{
                    marginBottom: { md: 2 },
                    marginTop: {
                      md: grupo.titulo === "4 y 5 años" ? 0 : 3,
                    },
                    color: "#9AB1BC",
                  }}
                  variant="h6"
                  // align="center"
                  color={habilitado ? "textPrimary" : "textSecondary"}
                >
                  (Edad {grupo.titulo})
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {grupo.disciplinas.map((disciplina, i) => (
                    <FormControlLabel
                      key={i}
                      onFocus={() => handleFocus(grupo.formKey)}
                      sx={{
                        "& .MuiCheckbox-root.Mui-checked": {
                          color: "#DFA57C",
                        },
                      }}
                      control={
                        <Checkbox
                          inputRef={disciplinasRef}
                          checked={disciplinasDelGrupo.includes(disciplina)}
                          onChange={(e) =>
                            handler(e, disciplina, disciplina, { disciplina })
                          }
                          value={disciplina}
                          disabled={!habilitado}
                        />
                      }
                      label={disciplina}
                    />
                  ))}
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>

      {errors.disciplinas &&
        formValues.disciplinas6a9?.length === 0 &&
        formValues.disciplinas10a15?.length === 0 &&
        (!formValues.disciplinas4a5 || formValues.disciplinas4a5.length === 0) && (
          <FormHelperText>{errors.disciplinas}</FormHelperText>
        )}
    </Box>
    </>
  );
};

export default ProgramacionSemanal;