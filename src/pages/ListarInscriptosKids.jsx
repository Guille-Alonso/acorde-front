import React, { useState } from "react";
import useGet from "../hooks/useGet";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Container,
  Button,
} from "@mui/material";
import { exportToExcel } from "../utils/exportarExcel";
import { obtenerHoraArgentina } from "../utils/obtenerFechaYHoraActual";
import FiltroInscriptos from "../components/FiltrarInscripciones";
import axios from "../config/axios";
import FiltroPorDiaKids from "../components/FiltrarPorDiaKids";

const ListarInscriptosKids = () => {
  const columnas = [
    "Alumno",
    "Edad",
    "Padre/Madre",
    "Teléfono",
    "Email",
    "Día",
    "Comentario",
    "Fecha de Inscripción"
  ];

  const [
    { inscriptos },
    loadingInscriptos,
    getInscriptos,
    setInscriptos,
  ] = useGet("/formularios/listarInscriptosKids", axios);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  // Manejar cambios de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Manejar cambio en filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Determinar los datos que se mostrarán en la página actual
  const displayedData =
    !loadingInscriptos &&
    inscriptos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const clearArray = (data) => {
      return data.map(({ _id, __v, ...rest }) => rest);
    };
    

    const handleExport = () => {
      exportToExcel(clearArray(inscriptos), `Inscripción al ${obtenerHoraArgentina()}`);
    };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "#9AB1BC", padding: "16px" }}
      >
        {!loadingInscriptos ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnas.map((columna, index) => (
                    <TableCell key={index}>{columna}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((inscripto, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${inscripto.nombre} ${inscripto.apellido}`}
                    </TableCell>

                    <TableCell>{inscripto.edad}</TableCell>
                    <TableCell>
                      {`${inscripto.nombrePadre} ${inscripto.apellidoPadre}`}
                    </TableCell>
                    <TableCell>{inscripto.telefonoPadre}</TableCell>

                    <TableCell>{inscripto.emailPadre}</TableCell>

                    <TableCell>{inscripto.dia}</TableCell>

                    <TableCell>{inscripto.comentario || "-"}</TableCell>

                    <TableCell>{inscripto.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Componente de paginación */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={inscriptos.length} // Total de filas
              rowsPerPage={rowsPerPage} // Filas por página
              page={page} // Página actual
              onPageChange={handleChangePage} // Cambio de página
              onRowsPerPageChange={handleChangeRowsPerPage} // Cambio de filas por página
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              height: "96vh", // Ocupa todo el alto de la ventana
            }}
          >
            <CircularProgress sx={{ color: "#DFA57C" }} />
          </Box>
        )}
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loadingInscriptos && (
          <FiltroPorDiaKids datos={inscriptos} />
        )}
      </div>
    </>
  );
};

export default ListarInscriptosKids;
