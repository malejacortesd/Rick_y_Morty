import './tarjeta-episodio.css';
/**
 * Tarjeta para cada episodio dentro de la vista de personaje.
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los episodios
 * 
 * 
 * @returns un JSX element 
 */
interface TarjetaEpisodioProps {
    //id: number;
    name: string;
    air_date: string;
    episode: string;
    // Esfavorito: boolean;
}

const TarjetaEpisodio = ({name, air_date, episode}:TarjetaEpisodioProps) => {

    return <div className="tarjeta-episodio">
            <h4>{name}</h4>
            <div>
                <span>{episode}</span>
                <span>{air_date}</span>
            </div>
    </div>
}

export default TarjetaEpisodio;
