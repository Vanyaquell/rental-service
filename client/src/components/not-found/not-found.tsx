import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found.css';

function NotFound() {
    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to={AppRoute.Main} className="not-found__link">
                Перейти на главную страницу
            </Link>
        </div>
    );
}

export { NotFound };