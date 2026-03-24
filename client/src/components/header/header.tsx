import { Link } from "react-router-dom";
import { Logo } from "../logo/logo";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logoutAction } from "../../store/api-action";
import { AppRoute, AuthorizationStatus } from "../../const";

function Header() {
    const dispatch = useAppDispatch();
    const favoritesCount = useAppSelector((state) => state.offers.filter(offer => offer.isFavorite).length);
    const userEmail = useAppSelector((state) => state.userEmail);
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {isAuth ? (
                                <>
                                    <li className="header__nav-item user">
                                        <Link
                                            to={AppRoute.Favorites}
                                            className="header__nav-link header__nav-link--profile"
                                        >
                                            <div className="header__avatar-wrapper user__avatar-wrapper">
                                            </div>
                                            <span className="header__user-name user__name">
                                                {userEmail || 'user@example.com'}
                                            </span>
                                            <span className="header__favorite-count">{favoritesCount}</span>
                                        </Link>
                                    </li>
                                    <li className="header__nav-item">
                                        <a
                                            className="header__nav-link"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLogout();
                                            }}
                                        >
                                            <span className="header__signout">Sign out</span>
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <li className="header__nav-item user">
                                    <Link
                                        to={AppRoute.Login}
                                        className="header__nav-link header__nav-link--profile"
                                    >
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__login">Sign in</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export { Header };