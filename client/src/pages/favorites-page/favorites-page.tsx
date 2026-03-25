import { Logo } from "../../components/logo/logo.tsx";
import { FavoritesCardList } from "../../components/favorite-card-list/favorite-card-list.tsx";
import type { OffersList } from "../../types/offers.ts";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { logoutAction } from "../../store/api-action";
import { Link } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { fetchOffersAction } from "../../store/api-action";

type FavoritePageProps = { offersList: OffersList[] }

function FavoritesPages({ offersList }: FavoritePageProps) {
    const dispatch = useAppDispatch();
    const favoriteOffers = offersList.filter((offer) => offer.isFavorite);
    const favoriteCount = favoriteOffers.length;
    const userEmail = useAppSelector((state) => state.userEmail);
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    const handleRemoveFromFavorites = () => {
        dispatch(fetchOffersAction());
    };

    const pageClass = favoriteCount === 0
        ? "page page--favorites-empty"
        : "page";

    const mainClass = favoriteCount === 0
        ? "page__main page__main--favorites page__main--favorites-empty"
        : "page__main page__main--favorites";

    return (
        <div className={pageClass}>
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
                                                <span className="header__favorite-count">{favoriteCount}</span>
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

            <main className={mainClass}>
                <div className="page__favorites-container container">
                    {favoriteCount === 0 ? (
                        <section className="favorites favorites--empty">
                            <h1 className="visually-hidden">Favorites (empty)</h1>
                            <div className="favorites__status-wrapper">
                                <b className="favorites__status">Nothing yet saved.</b>
                                <p className="favorites__status-description">
                                    Save properties to narrow down search or plan your future trips.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <section className="favorites">
                            <h1 className="favorites__title">Saved listing</h1>
                            <FavoritesCardList
                                offersList={offersList}
                                onRemove={handleRemoveFromFavorites}
                            />
                        </section>
                    )}
                </div>
            </main>

            <footer className="footer">
                <Link to={AppRoute.Main} className="footer__logo-link">
                    <img
                        className="footer__logo"
                        src="/img/logo.svg"
                        alt="Rent service logo"
                        width="64"
                        height="33"
                    />
                </Link>
            </footer>
        </div>
    )
}

export { FavoritesPages };