import { Logo } from "../../components/logo/logo.tsx";
import type { FullOffer, OffersList } from "../../types/offers.ts";
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/not-found/not-found.tsx";
import { ReviewForm } from "../../components/review-form/review-form.tsx";
import { ReviewsList } from "../../components/review-list/review-list.tsx";
import type { ReviewType } from "../../types/reviews.ts";
import Map from "../../components/map/map.tsx";
import type { City, Point } from "../../types/city.ts";
import { CitiesCardList } from "../../components/CitiesCardList/CitiesCardList.tsx";

type OfferProps = {
    offers: FullOffer[];
    reviews: ReviewType[];
}

function OfferPage({ offers, reviews }: OfferProps) {
    const params = useParams();
    const offer = offers.find((item) => item.id === params.id);

    if (!offer) {
        return <NotFound />;
    }


    const nearbyOffers: OffersList[] = offers
        .filter((item) => {
            return item.id !== offer.id && item.city.name === offer.city.name;
        })
        .slice(0, 3)
        .map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            price: item.price,
            previewImage: item.images[0],
            isPremium: item.isPremium,
            rating: item.rating,
            city: item.city,
            location: item.location,
            isFavorite: item.isFavorite
        }));

    const offerReviews: ReviewType[] = reviews.filter((item) => item.offerId === offer.id);

    const city: City = {
        title: offer.city.name,
        lat: offer.city.location.latitude,
        lng: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
    }

    const cityPoints: Point[] = [
        {
            title: offer.title,
            lat: offer.location.latitude,
            lng: offer.location.longitude,
        },
        ...nearbyOffers.map(item => ({
            title: item.title,
            lat: item.location.latitude,
            lng: item.location.longitude,
        }))
    ];

    const selectedPoint: Point = {
        title: offer.title,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
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
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">3</span>
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

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {offer.images.map((image) => (
                                <div key={image} className="offer__image-wrapper">
                                    <img className="offer__image" src={image} alt="Photo studio" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {offer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    {offer.title}
                                </h1>
                                <button className="offer__bookmark-button button" type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: `${offer.rating * 20}%` }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{offer.rating}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {offer.type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {offer.bedrooms} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {offer.maxAdults} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{offer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {offer.goods.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img
                                            className="offer__avatar user__avatar"
                                            src={offer.host.avatarUrl}
                                            width="74"
                                            height="74"
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">
                                        {offer.host.name}
                                    </span>
                                    {offer.host.isPro && (
                                        <span className="offer__user-status">
                                            Pro
                                        </span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">
                                        {offer.description}
                                    </p>
                                </div>
                            </div>

                            <ReviewsList reviews={offerReviews} />
                            <ReviewForm />
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

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>

                        <CitiesCardList
                            offersList={nearbyOffers}
                            isNearby={true}
                        />
                    </section>
                </div>
            </main>
        </div>
    )
}

export { OfferPage };