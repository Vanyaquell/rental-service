import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Logo } from "../../components/logo/logo.tsx";
import { ReviewForm } from "../../components/review-form/review-form.tsx";
import { ReviewsList } from "../../components/review-list/review-list.tsx";
import Map from "../../components/map/map.tsx";
import { CitiesCardList } from "../../components/CitiesCardList/CitiesCardList.tsx";
import { NotFound } from "../../components/not-found/not-found.tsx";
import { LoadingPage } from "../../components/loading-page/loading-page.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOfferAction, logoutAction } from "../../store/api-action";
import { AuthorizationStatus, AppRoute } from "../../const";
import type { City, Point } from "../../types/city.ts";
import type { OffersList } from "../../types/offers.ts";
import { useFavorite } from "../../hooks/use-favorite";
import { useNavigate } from 'react-router-dom';

function OfferPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const offerId = params.id;

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const userEmail = useAppSelector((state) => state.userEmail);
    const currentOffer = useAppSelector((state) => state.currentOffer);
    const currentOfferReviews = useAppSelector((state) => state.currentOfferReviews);
    const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOfferLoading);
    const currentOfferError = useAppSelector((state) => state.currentOfferError);
    const offers = useAppSelector((state) => state.offers);


    const [nearbyOffers, setNearbyOffers] = useState<OffersList[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const { toggleFavorite } = useFavorite();

    useEffect(() => {
        if (offerId) {
            dispatch(fetchOfferAction(offerId));
        }
    }, [offerId, dispatch]);

    useEffect(() => {
        if (currentOffer && offers.length > 0) {
            const nearby = offers
                .filter((item) => {
                    return item.id !== currentOffer.id && item.city.name === currentOffer.city.name;
                })
                .slice(0, 3)
                .map(item => ({
                    id: item.id,
                    title: item.title,
                    type: item.type,
                    price: item.price,
                    previewImage: item.previewImage,
                    isPremium: item.isPremium,
                    rating: item.rating,
                    city: item.city,
                    location: item.location,
                    isFavorite: item.isFavorite
                }));
            setNearbyOffers(nearby);
        }
    }, [currentOffer, offers]);

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    if (isCurrentOfferLoading) {
        return <LoadingPage />;
    }

    if (currentOfferError || !currentOffer) {
        return <NotFound />;
    }

    const photos = currentOffer.photos || [];
    const goods = currentOffer.goods || [];

    const city: City = {
        title: currentOffer.city?.name || '',
        lat: currentOffer.city?.location?.latitude || 0,
        lng: currentOffer.city?.location?.longitude || 0,
        zoom: currentOffer.city?.location?.zoom || 13,
    };

    const cityPoints: Point[] = [
        {
            title: currentOffer.title || '',
            lat: currentOffer.location?.latitude || 0,
            lng: currentOffer.location?.longitude || 0,
        },
        ...nearbyOffers.map(item => ({
            title: item.title,
            lat: item.location.latitude,
            lng: item.location.longitude,
        }))
    ];

    const selectedPoint: Point = {
        title: currentOffer.title || '',
        lat: currentOffer.location?.latitude || 0,
        lng: currentOffer.location?.longitude || 0,
    };


    const handleFavoriteClick = async () => {
        if (!isAuth) {
            navigate(AppRoute.Login);
            return;
        }

        setIsToggling(true);
        const success = await toggleFavorite(currentOffer.id, isFavorite);

        if (success) {
            setIsFavorite(!isFavorite);
        }

        setIsToggling(false);
    };

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
                                                <span className="header__favorite-count">
                                                    {offers.filter(o => o.isFavorite).length}
                                                </span>
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

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {photos.map((photo, index) => (
                                <div key={index} className="offer__image-wrapper">
                                    <img
                                        className="offer__image"
                                        src={photo}
                                        alt={currentOffer.title || 'Photo'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {currentOffer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    {currentOffer.title}
                                </h1>
                                <button
                                    className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                                    type="button"
                                    onClick={handleFavoriteClick}
                                    disabled={isToggling}
                                >
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">
                                        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                                    </span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: `${(currentOffer.rating || 0) * 20}%` }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{currentOffer.rating || 0}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {currentOffer.type || 'Apartment'}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {currentOffer.bedrooms || 0} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {currentOffer.maxAdults || 0} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{currentOffer.price || 0}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {goods.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img
                                            className="offer__avatar user__avatar"
                                            src={currentOffer.host?.avatarUrl || ''}
                                            width="74"
                                            height="74"
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">
                                        {currentOffer.host?.name || 'Unknown'}
                                    </span>
                                    {currentOffer.host?.isPro && (
                                        <span className="offer__user-status">
                                            Pro
                                        </span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">
                                        {currentOffer.description || ''}
                                    </p>
                                </div>
                            </div>

                            <ReviewsList reviews={currentOfferReviews || []} />

                            {isAuth && offerId && <ReviewForm offerId={offerId} />}
                        </div>
                    </div>

                    <section className="offer__map map" style={{ width: '1144px', margin: '0 auto', display: 'block' }}>
                        {city && cityPoints.length > 0 && (
                            <Map
                                city={city}
                                points={cityPoints}
                                selectedPoint={selectedPoint}
                            />
                        )}
                    </section>
                </section>

                {nearbyOffers.length > 0 && (
                    <div className="container">
                        <section className="near-places places">
                            <h2 className="near-places__title">Other places in the neighbourhood</h2>
                            <CitiesCardList
                                offersList={nearbyOffers}
                                isNearby={true}
                            />
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}

export { OfferPage };