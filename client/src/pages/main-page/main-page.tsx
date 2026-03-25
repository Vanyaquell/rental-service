// client/src/pages/main-page/main-page.tsx
import { Logo } from "../../components/logo/logo.tsx";
import { CitiesCardList } from "../../components/CitiesCardList/CitiesCardList.tsx";
import type { OffersList } from "../../types/offers.ts";
import { cities } from "../../mocks/city.ts";
import { useEffect, useState } from "react";
import Map from "../../components/map/map.tsx"
import type { City, Point } from "../../types/city.ts";
import { CitiesList } from "../../components/cities-list/cities-list.tsx";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getOffersByCity, sortOffersByType } from "../../util.ts";
import type { SortOffer } from "../../types/sort.ts";
import { SortOptions } from "../../components/sort-options/sort-options.tsx";
import { AppRoute, AuthorizationStatus } from "../../const.ts";
import { Link } from "react-router-dom";
import { logoutAction } from "../../store/api-action";

type MainPageProps = {
    rentalOffersCount: number;
    offersList: OffersList[];
}

function MainPage({ offersList }: MainPageProps) {
    const dispatch = useAppDispatch();
    const favoritesCount = offersList.filter(offer => offer.isFavorite).length;

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const userEmail = useAppSelector((state) => state.userEmail);
    const selectedCity = useAppSelector((state) => state.city);
    const offersListSelector = useAppSelector((state) => state.offers);

    const selectedCityOffers = selectedCity?.title
        ? getOffersByCity(selectedCity.title, offersListSelector)
        : [];

    const rentalOffersCount = selectedCityOffers.length;

    const [activeSort, setActiveSort] = useState<SortOffer>('Popular')
    const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
    const [city, setCity] = useState<City | null>(null);
    const [cityPoints, setCityPoints] = useState<Point[]>([]);

    useEffect(() => {
        if (selectedCity?.title) {
            const foundCity = cities.find((c: City) => c.title === selectedCity.title);
            if (foundCity) {
                setCity(foundCity);
            }

            const cityOffers = getOffersByCity(selectedCity.title, offersListSelector);
            const points = cityOffers.map((offer) => ({
                id: offer.id,
                title: offer.title,
                lat: offer.location.latitude,
                lng: offer.location.longitude,
            }));
            setCityPoints(points);
        } else {
            setCity(null);
            setCityPoints([]);
        }
    }, [selectedCity, offersListSelector]);

    const handleOfferHover = (offerId: string) => {
        const offer = selectedCityOffers.find((o) => o.id === offerId);
        if (offer) {
            const point = cityPoints.find((p) => p.title === offer.title);
            setSelectedPoint(point);
        }
    };

    const handleOfferLeave = () => {
        setSelectedPoint(undefined);
    };

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const hasOffers = selectedCityOffers.length > 0;

    return (
        <div className="page page--gray page--main">
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

            <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <CitiesList selectedCity={selectedCity} />
                    </section>
                </div>
                <div className="cities">
                    {hasOffers ? (
                        <div className="cities__places-container container">
                            <section className="cities__places places">
                                <h2 className="visually-hidden">Places</h2>
                                <b className="places__found">{rentalOffersCount} places to stay in {selectedCity?.title}</b>
                                <SortOptions activeSorting={activeSort} onChange={(newSorting) => setActiveSort(newSorting)} />
                                <CitiesCardList
                                    offersList={sortOffersByType(selectedCityOffers, activeSort)}
                                    isNearby={false}
                                    onOfferHover={handleOfferHover}
                                    onOfferLeave={handleOfferLeave}
                                />
                            </section>
                            <div className="cities__right-section">
                                <section className="cities__map map">
                                    {city && cityPoints.length > 0 && (
                                        <Map
                                            city={city}
                                            points={cityPoints}
                                            selectedPoint={selectedPoint}
                                        />
                                    )}
                                </section>
                            </div>
                        </div>
                    ) : (
                        <div className="cities__places-container cities__places-container--empty container">
                            <section className="cities__no-places">
                                <div className="cities__status-wrapper tabs__content">
                                    <b className="cities__status">No places to stay available</b>
                                    <p className="cities__status-description">
                                        We could not find any property available at the moment in {selectedCity?.title}
                                    </p>
                                </div>
                            </section>
                            <div className="cities__right-section"></div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export { MainPage };