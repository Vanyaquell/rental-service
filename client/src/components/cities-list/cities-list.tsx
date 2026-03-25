import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeCity } from "../../store/action.ts";
import type { City } from "../../types/city.ts";
import { AppRoute, CITIES_LOCATION } from "../../const.ts";

type CitiesListProps = {
    selectedCity: City | undefined;
};

function CitiesList({ selectedCity }: CitiesListProps) {
    const dispatch = useAppDispatch();

    return (
        <ul className="locations__list tabs__list">
            {CITIES_LOCATION.map((city) => {
                const isActive = selectedCity?.title === city.title;
                return (
                    <li key={city.title} className="locations__item" onClick={() => dispatch(changeCity(city))}>
                        <Link
                            className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
                            to={AppRoute.Main}
                        >
                            <span>{city.title}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export { CitiesList };