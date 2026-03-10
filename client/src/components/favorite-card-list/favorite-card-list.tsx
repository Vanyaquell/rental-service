import { useState, useEffect } from "react";
import type { OffersList } from "../../types/offers";
import { FavoritesCard } from "../favorite-card/favorite-card";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

type FavoritesCardListProps = {
    offersList: OffersList[];
};

function FavoritesCardList({ offersList }: FavoritesCardListProps) {
    const [favoriteOffers, setFavoriteOffers] = useState<OffersList[]>([]);

    useEffect(() => {
        setFavoriteOffers(offersList.filter((offer) => offer.isFavorite));
    }, [offersList]);

    const handleRemoveOffer = (offerId: string) => {
        setFavoriteOffers(prev => prev.filter(offer => offer.id !== offerId));
    };

    if (favoriteOffers.length === 0) {
        return (
            <div className="favorites__empty" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#000000',
                    marginBottom: '16px'
                }}>
                    Nothing yet saved.
                </h2>
                <p style={{
                    fontSize: '18px',
                    color: '#6c757d',
                    marginBottom: '8px',
                    lineHeight: '1.5'
                }}>
                    Save properties to narrow down search or plan your future trips.
                </p>
            </div>
        );
    }

    const offersByCity = favoriteOffers.reduce<Record<string, OffersList[]>>((acc, offer) => {
        const cityName = offer.city.name;
        if (!acc[cityName]) {
            acc[cityName] = [];
        }
        acc[cityName].push(offer);
        return acc;
    }, {});

    return (
        <ul className="favorites__list">
            {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                            <a className="locations__item-link" href="#">
                                <span>{cityName}</span>
                            </a>
                        </div>
                    </div>
                    <div className="favorites__places">
                        {cityOffers.map((offer) => (
                            <FavoritesCard
                                key={offer.id}
                                id={offer.id}
                                title={offer.title}
                                type={offer.type}
                                price={offer.price}
                                previewImage={offer.previewImage}
                                isPremium={offer.isPremium}
                                rating={offer.rating}
                                onRemove={() => handleRemoveOffer(offer.id)}
                            />
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export { FavoritesCardList };