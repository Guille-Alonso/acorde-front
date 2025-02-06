// import React from "react";
// import { Grid, FormControlLabel, Checkbox, Typography, Box } from "@mui/material";

// const ProgramacionSemanal = ({
//   edad,
//   formValues,
//   handleCheckboxChangeDisciplinas6a9,
//   handleCheckboxChangeDisciplinas10a15,
// }) => {
//   const horarios = [
//     {
//       rangoEdad: [6, 9],
//       titulo: "6 a 9 años",
//       dias: [
//         { dia: "Lunes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
//         { dia: "Martes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
//         { dia: "Miércoles", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Canto", "Violín"] },
//         { dia: "Jueves", horario: "18.30hs a 19.30hs", disciplinas: ["Piano", "Canto"] },
//         { dia: "Viernes", horario: "18.30hs a 19.30hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
//       ],
//     },
//     {
//       rangoEdad: [10, 15],
//       titulo: "10 a 15 años",
//       dias: [
//         { dia: "Lunes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
//         { dia: "Martes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
//         { dia: "Miércoles", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Violín"] },
//         { dia: "Jueves", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Piano", "Canto"] },
//         { dia: "Viernes", horario: "20hs a 21hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
//       ],
//     },
//   ];

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         PROGRAMACIÓN SEMANAL
//       </Typography>
//       <Typography variant="body2" align="center" gutterBottom>
//         (Se puede elegir una disciplina por día y hasta dos disciplinas semanales)
//       </Typography>
//       <Grid container spacing={4}>
//         {horarios.map((grupo, index) => {
//           const isHabilitado = edad >= grupo.rangoEdad[0] && edad <= grupo.rangoEdad[1];

//           return (
//             <Grid item xs={12} md={6} key={index}>
//               <Typography variant="h6" align="center" color={isHabilitado ? "textPrimary" : "textSecondary"}>
//                 (Edad {grupo.titulo})
//               </Typography>
//               {grupo.dias.map((dia, idx) => (
//                 <Box key={idx} sx={{ marginBottom: 2 }}>
//                   <Typography variant="subtitle1">
//                     {dia.dia} {dia.horario}
//                   </Typography>
//                   {dia.disciplinas.map((disciplina, i) => (
//                     <FormControlLabel
//                       key={i}
//                       control={
//                         <Checkbox
//                         checked={index === 0 ? formValues.disciplinas6a9.includes(`${dia.dia}-${disciplina}`) :formValues.disciplinas10a15.includes(`${dia.dia}-${disciplina}`) }
//                           onChange={(e) =>
//                             index === 0
//                               ? handleCheckboxChangeDisciplinas6a9(e, dia.dia, disciplina)
//                               : handleCheckboxChangeDisciplinas10a15(e, dia.dia, disciplina)
//                           }
//                           value={`${dia.dia}-${disciplina}`}
//                           disabled={!isHabilitado} // Deshabilita si no corresponde a la edad
//                         />
//                       }
//                       label={disciplina}
//                     />
//                   ))}
//                 </Box>
//               ))}
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default ProgramacionSemanal;

import React from "react";
import { Grid, FormControlLabel, Checkbox, Typography, Box } from "@mui/material";

const ProgramacionSemanal = ({
  edad,
  formValues,
  handleCheckboxChangeDisciplinas6a9,
  handleCheckboxChangeDisciplinas10a15,
}) => {
  const horarios = [
    {
      rangoEdad: [6, 9],
      titulo: "6 a 9 años",
      dias: [
        { dia: "Lunes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
        { dia: "Martes", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
        { dia: "Miércoles", horario: "18.30hs a 19.30hs", disciplinas: ["Guitarra", "Ukelele", "Canto", "Violín"] },
        { dia: "Jueves", horario: "18.30hs a 19.30hs", disciplinas: ["Piano", "Canto"] },
        { dia: "Viernes", horario: "18.30hs a 19.30hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
      ],
    },
    {
      rangoEdad: [10, 15],
      titulo: "10 a 15 años",
      dias: [
        { dia: "Lunes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
        { dia: "Martes", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Piano", "Canto"] },
        { dia: "Miércoles", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Ukelele", "Violín"] },
        { dia: "Jueves", horario: "20hs a 21hs", disciplinas: ["Guitarra", "Piano", "Canto"] },
        { dia: "Viernes", horario: "20hs a 21hs", disciplinas: ["Canto", "Guitarra", "Percusión"] },
      ],
    },
  ];

  // Función para validar si se permite seleccionar más disciplinas
  const canSelectDiscipline6a9 = (grupoIndex, dia, disciplina) => {
    const disciplinasSeleccionadas = formValues.disciplinas6a9.filter((d) => d.startsWith(`${dia}-`));
    const totalSemanal = formValues.disciplinas6a9.filter((d) =>
      horarios[grupoIndex].dias.some((diaObj) => d.startsWith(diaObj.dia))
    ).length;

    // Una disciplina por día y hasta dos disciplinas semanales
    if (disciplinasSeleccionadas.length > 0 && !formValues.disciplinas6a9.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    if (totalSemanal >= 2 && !formValues.disciplinas6a9.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    return true;
  };

  const canSelectDiscipline10a15 = (grupoIndex, dia, disciplina) => {
    const disciplinasSeleccionadas = formValues.disciplinas10a15.filter((d) => d.startsWith(`${dia}-`));
    const totalSemanal = formValues.disciplinas10a15.filter((d) =>
      horarios[grupoIndex].dias.some((diaObj) => d.startsWith(diaObj.dia))
    ).length;

    // Una disciplina por día y hasta dos disciplinas semanales
    if (disciplinasSeleccionadas.length > 0 && !formValues.disciplinas10a15.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    if (totalSemanal >= 2 && !formValues.disciplinas10a15.includes(`${dia}-${disciplina}`)) {
      return false;
    }
    return true;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        PROGRAMACIÓN SEMANAL
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        (Se puede elegir una disciplina por día y hasta dos disciplinas semanales)
      </Typography>
      <Grid container spacing={4}>
        {horarios.map((grupo, grupoIndex) => {
          const isHabilitado = edad >= grupo.rangoEdad[0] && edad <= grupo.rangoEdad[1];
 
          return (
            <Grid item xs={12} md={6} key={grupoIndex}>
              <Typography variant="h6" align="center" color={isHabilitado ? "textPrimary" : "textSecondary"}>
                (Edad {grupo.titulo})
              </Typography>
              {grupo.dias.map((dia, idx) => (
                <Box key={idx} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">
                    {dia.dia} {dia.horario}
                  </Typography>
                  {dia.disciplinas.map((disciplina, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                        checked={grupoIndex === 0 ? formValues.disciplinas6a9.includes(`${dia.dia}-${disciplina}`) :formValues.disciplinas10a15.includes(`${dia.dia}-${disciplina}`) }
                          onChange={(e) =>
                            grupoIndex === 0
                              ? handleCheckboxChangeDisciplinas6a9(e, dia.dia, disciplina)
                              : handleCheckboxChangeDisciplinas10a15(e, dia.dia, disciplina)
                          }
                          value={`${dia.dia}-${disciplina}`}
                          disabled={
                            !isHabilitado || (grupoIndex === 0 ? !canSelectDiscipline6a9(grupoIndex, dia.dia, disciplina) : !canSelectDiscipline10a15(grupoIndex, dia.dia, disciplina))
                          } // Deshabilita según las reglas
                        />
                      }
                      label={disciplina}
                    />
                  ))}
                </Box>
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProgramacionSemanal;




// checked={index === 0 ? formValues.disciplinas6a9.includes(`${dia.dia}-${disciplina}`) :formValues.disciplinas10a15.includes(`${dia.dia}-${disciplina}`) }