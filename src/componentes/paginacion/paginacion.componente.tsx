import { useAppDispatch } from '../../hooks/hook';
import { incrementPage, decrementPage } from '../../redux/dataSlice';
import './paginacion.css';
import {useState} from 'react';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {

    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    //const data = useAppSelector(state => state.images)

    const handleClickIncrement = () => {
        setPage(page + 1)
        dispatch(incrementPage())
        console.log('aumentando la pagina',page);
    }

    const handleClickDecrement = () => {
        
        if (page > 1) {
            setPage(page - 1)
            dispatch(decrementPage())
            console.log('decrementando la pagina',page);
        } else setPage(1)
        
    }

    return <div className="paginacion">
        <button disabled={false} onClick={handleClickDecrement} className={"primary"}>Anterior</button>
        <button disabled={false} onClick={handleClickIncrement} className={"primary"}>Siguiente</button>
    </div>
}

export default Paginacion;