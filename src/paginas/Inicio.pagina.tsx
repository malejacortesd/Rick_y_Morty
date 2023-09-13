//import { useEffect, useState } from 'react';
import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { changeName, resetPage, resetText } from "../redux/dataSlice";
import { useAppDispatch } from "../hooks/hook";
// import { useAppDispatch, useAppSelector } from '../hooks/hook';
// import { getData } from '../redux/dataSlice';

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(resetText())
        dispatch(changeName(""))
        dispatch(resetPage())
    }

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button onClick={handleClick} className="danger">X</button>
        </div>
        <Filtros />
        <Paginacion />
        <GrillaPersonajes />
        <Paginacion />
    </div>
}

export default PaginaInicio