import React, { useState, useMemo } from "react";
import { Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { exportToExcel } from "../utils/exportarExcel";
import { obtenerHoraArgentina } from "../utils/obtenerFechaYHoraActual";

const FiltroPorDiaKids = ({ datos }) => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // Extraer los días únicos
  const diasUnicos = useMemo(() => {
    const dias = datos.map((item) => item.dia.split(" de")[0].toUpperCase());
    return [...new Set(dias)]; // eliminar duplicados
  }, [datos]);

  // Filtrar los datos según el día
  const datosFiltrados = useMemo(() => {
    if (!diaSeleccionado) return datos;
    return datos.filter((item) =>
      item.dia.toUpperCase().startsWith(diaSeleccionado)
    );
  }, [diaSeleccionado, datos]);

   const clearArray = (data) => {
      return data.map(({ _id, __v, ...rest }) => rest);
    };

   const handleExport = () => {
        exportToExcel(clearArray(datosFiltrados), `Inscripción al ${obtenerHoraArgentina()}`);
      };

  return (
    <>
      <FormControl sx={{ width: "300px"}} margin="normal">
        <InputLabel>Filtro por Día</InputLabel>
        <Select
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
          label="Día"
        >
          <MenuItem value="">Todos</MenuItem>
          {diasUnicos.map((dia) => (
            <MenuItem key={dia} value={dia}>
              {dia}
            </MenuItem>
          ))}
        </Select>

        <Button
          sx={{ marginTop: "5px" }}
          variant="outlined"
          color="success"
          onClick={handleExport}
        >
          Aplicar Filtro
        </Button>
      </FormControl>
    </>
  );
};

export default FiltroPorDiaKids;
