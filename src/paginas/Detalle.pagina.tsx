import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { useEffect, useMemo, useState } from "react";
import { getData, toggleFavorite } from "../redux/dataSlice";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 * @returns la pagina de detalle
 */
interface CharacterApiResponse {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface CharacterStorage {
id: number;
isFav: boolean;
name: string;
status: string;
species: string;
type: string;
gender: string;
origin: {
    name: string;
    url: string;
};
location: {
    name: string;
    url: string;
};
image: string;
episode: string[];
url: string;
created: string;
}

interface EpsiodesProps {
id: number;
name: string;
air_date: string;
episode: string;
url: string;
created: string;
characters: string[];
}

interface Character {
id: number;
name: string;
image: string;
isFav: boolean;
}

const PaginaDetalle = () => {

const dispatch = useAppDispatch()
const images = useAppSelector(state => state.images)
const charactersStorage : CharacterStorage[] = JSON.parse(localStorage.getItem("characters") || "[]");
const apiCharacter: CharacterApiResponse  = images.character;
const episodes: EpsiodesProps[] = images.episodes;
const [isFavorite, setIsFavorite] = useState(false)


console.log("estos son todos los episodios",episodes);
useEffect(
    () => {
    dispatch(getData({
        page: images.GetDataArgs.page,
        name: images.GetDataArgs.name,
        id: images.GetDataArgs.id
    }))
    
    },
    [dispatch, images.GetDataArgs]
)

const handleClickFav = () => {
    dispatch(toggleFavorite(apiCharacter.id))
    const newCharacter:Character = {
        id: apiCharacter.id,
        name: apiCharacter.name,
        image: apiCharacter.image,
        isFav: !isFavorite
    };

    const charactersStorage = JSON.parse(localStorage.getItem("characters") || "[]");
    const indexToDelete = charactersStorage.findIndex((character: {id: number}) => character.id === apiCharacter.id);

    if (indexToDelete !== -1) {
        charactersStorage.splice(indexToDelete, 1);
        localStorage.setItem("characters", JSON.stringify(charactersStorage));
    } else {
        const updatedCharacters = [...charactersStorage, newCharacter];
        localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    }
    
    setIsFavorite(!isFavorite)
}

const charactersWithIsFav = useMemo(() => {

    if(apiCharacter !== undefined && charactersStorage.length > 0) {
        console.log(apiCharacter);
        
        const newCharacters: CharacterStorage = {
        ...apiCharacter,
        isFav: false,
        };

        const index = charactersStorage.findIndex((obj: CharacterStorage) => obj.id === apiCharacter.id);

        if (index !== -1) {
            newCharacters.isFav = charactersStorage[index].isFav;
        }

        return newCharacters;
    }
    else return null;
    
    
}, [apiCharacter, charactersStorage]);


return <div className="container">
    {
        charactersWithIsFav?
        <>
            <h3>{charactersWithIsFav.name}</h3>
                <div className={"detalle"}>
                    <div className={"detalle-header"}>
                        <img src={charactersWithIsFav.image} alt={charactersWithIsFav.name}/>
                        <div className={"detalle-header-texto"}>
                        
                            <p>{charactersWithIsFav.name}</p>
                            <p>Planeta: {charactersWithIsFav.location.name}</p>
                            <p>Genero: {charactersWithIsFav.gender}</p>
                        </div>
                        <BotonFavorito esFavorito={charactersWithIsFav.isFav} />
                    </div>
                </div>
                <h4>Lista de episodios donde apareció el personaje</h4>
                <div className={"episodios-grilla"}>
                    {
                        episodes.map((episode) => {
                            return <TarjetaEpisodio key={episode.id} name={episode.name} air_date={episode.air_date} episode={episode.episode}  />
                        })
                    }
                    
                </div>
        </>
        :
        <>
            <h3>{apiCharacter.name}</h3>
                <div className={"detalle"}>
                    <div className={"detalle-header"}>
                        <img src={apiCharacter.image} alt={apiCharacter.name}/>
                        <div className={"detalle-header-texto"}>
                        
                            <p>{apiCharacter.name}</p>
                            <p>Planeta: {apiCharacter.location.name}</p>
                            <p>Genero: {apiCharacter.gender}</p>
                        </div>
                        <BotonFavorito onClick={handleClickFav} esFavorito={false} />
                    </div>
                </div>
                <h4>Lista de episodios donde apareció el personaje</h4>
                <div className={"episodios-grilla"}>
                    {
                        episodes.map((episode) => {
                            return <TarjetaEpisodio key={episode.id} name={episode.name} air_date={episode.air_date} episode={episode.episode}  />
                        })
                    }
                </div>
        </>
    }
</div>
}

export default PaginaDetalle