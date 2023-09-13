import './boton-favorito.css';
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
interface Character {
    id: number;
    name: string;
    image: string;
    isFav: boolean;
}

interface BotonFavoritoProps {

    esFavorito: boolean;
    onClick?: () => void;
    character?: Character;
}

const BotonFavorito = ({esFavorito, onClick, character}:BotonFavoritoProps) => {

const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

return <div className="boton-favorito">
    <img onClick={onClick} src={src} alt={"favorito"} />
</div>
}

export default BotonFavorito;