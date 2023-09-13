import './filtros.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { changeName, changeText, resetPage } from '../../redux/dataSlice';

/**

    Componente de filtros para la búsqueda de personajes.
    @returns un JSX element
    */

const Filtros = () => {

    const [text, setText] = useState("");

    const dispatch = useAppDispatch()

    const texto = useAppSelector((state) => state.images.texto)

    /**
 * Manejador de cambio para la entrada de texto del filtro. Actualiza el estado local y 
 * despacha las acciones para actualizar el store.
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input
 */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(text);
        setText(e.target.value);
        dispatch(changeName(e.target.value))
        dispatch(changeText(e.target.value))
        dispatch(resetPage())

    }

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input onChange={handleChange} type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" value={texto} name="nombre" />
    </div>
}

export default Filtros;