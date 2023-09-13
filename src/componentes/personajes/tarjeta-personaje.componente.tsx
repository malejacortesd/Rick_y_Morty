import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { changeId, toggleFavorite } from '../../redux/dataSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';
import { useState } from 'react';

/**

    Componente que muestra una tarjeta de un personaje en la grilla de personajes.
    @component
    @param {Object} props - Propiedades para configurar el componente.
    @param {string} props.imagen - URL de la imagen del personaje.
    @param {string} props.name - Nombre del personaje.
    @param {number} props.id - Identificador único del personaje.
    @param {boolean} props.isFav - Indica si el personaje ha sido marcado como favorito.
    @returns {JSX.Element} - Retorna un elemento JSX que contiene la tarjeta del personaje.
    */

    interface TarjetaPersonajeProps {
        imagen: string;
        name: string;
        id: number;
        isFav: boolean;
        // Esfavorito: boolean;
    }

    interface Character {
        id: number;
        name: string;
        image: string;
        isFav: boolean;
    }

const TarjetaPersonaje = ({imagen, name, id, isFav}:TarjetaPersonajeProps) => {


    /**

    Permite navegar a la vista de detalle del personaje.
    @type {function}
    */
    const navigate = useNavigate();

    /**

    Disparador de acciones de Redux.
    @type {function}
    */

    const dispatch = useAppDispatch()

    /**
    Indica si el personaje actual ha sido marcado como favorito.
    @type {boolean}
    */

    const [isFavorite, setIsFavorite] = useState(isFav)

    const handleClickImg = () => {
        //console.log(newId);
        dispatch(changeId(id))
        navigate(`/detalle`);
    }




    const handleClickFav = () => {
        dispatch(toggleFavorite(id))
        const newCharacter:Character = {
            id: id,
            name: name,
            image: imagen,
            isFav: !isFav
        };
    
        const charactersStorage = JSON.parse(localStorage.getItem("characters") || "[]");
        const indexToDelete = charactersStorage.findIndex((character: {id: number}) => character.id === id);

        if (indexToDelete !== -1) {
            charactersStorage.splice(indexToDelete, 1);
            localStorage.setItem("characters", JSON.stringify(charactersStorage));
        } else {
            const updatedCharacters = [...charactersStorage, newCharacter];
            localStorage.setItem("characters", JSON.stringify(updatedCharacters));
        }
        
        setIsFavorite(!isFavorite)
    }

    return <div className="tarjeta-personaje">
        <img onClick={handleClickImg} src={imagen} alt={name}/>
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
            <BotonFavorito onClick={handleClickFav} esFavorito={isFavorite} />
            
        </div>
    </div>
}

export default TarjetaPersonaje;