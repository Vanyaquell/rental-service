import { Logo } from "../../components/logo/logo.tsx";
import { FavoritesCardList } from "../../components/favorite-card-list/favorite-card-list.tsx";
import type { OffersList } from "../../types/offers.ts";

type FavoritePageProps = { offersList: OffersList[] }

function FavoritesPages({ offersList }: FavoritePageProps) {
    const favoriteCount = offersList.filter((offer) => offer.isFavorite).length;
    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">{favoriteCount}</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    <section className="favorites">
                        <h1 className="favorites__title">Saved listing</h1>
                        <FavoritesCardList offersList={offersList} />
                    </section>
                </div>
            </main>
            <footer className="footer container">
                <a className="footer__logo-link" href="main.html">
                    <img className="footer__logo" src="img/logo.svg" alt="Rent service logo" width="64" height="33" />
                </a>
            </footer>
        </div>
    )
}

export { FavoritesPages };