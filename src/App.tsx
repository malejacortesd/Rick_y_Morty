import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import PaginaInicio from "./paginas/Inicio.pagina";
import PaginaFavoritos from "./paginas/Favoritos.pagina";
import PaginaDetalle from "./paginas/Detalle.pagina";
import Encabezado from "./componentes/layout/encabezado.componente";
//import { useAppDispatch, useAppSelector } from './hooks/hook';
//import { getData } from './redux/dataSlice';

function App() {

    // const PaginaInicio = () => {
  //   const dispatch = useAppDispatch()
  //   const images = useAppSelector(state => state)

  //   useEffect(
  //       () => {
  //       dispatch(getData(1))
  //       },
  //       [dispatch]
  //   )

  //   console.log(images.images);
  
  return (
    <div className="App">
      <Encabezado />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="favoritos" element={<PaginaFavoritos />} />
        <Route path="detalle" element={<PaginaDetalle />} />
      </Routes>
    </div>
  );
}

export default App;
