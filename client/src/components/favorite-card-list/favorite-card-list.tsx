import { useState, useEffect } from "react";
import type { OffersList } from "../../types/offers";
import { FavoritesCard } from "../favorite-card/favorite-card";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

type FavoritesCardListProps = {
    offersList: OffersList[];
    onRemove?: () => void;
};

function FavoritesCardList({ offersList, onRemove }: FavoritesCardListProps) {
    const [favoriteOffers, setFavoriteOffers] = useState<OffersList[]>([]);

    useEffect(() => {
        setFavoriteOffers(offersList.filter((offer) => offer.isFavorite));
    }, [offersList]);

    const handleRemoveOffer = (offerId: string) => {
        setFavoriteOffers(prev => prev.filter(offer => offer.id !== offerId));
        if (onRemove) {
            onRemove();
        }
    };

    if (favoriteOffers.length === 0) {
        return null;
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
                            <Link className="locations__item-link" to={AppRoute.Main}>
                                <span>{cityName}</span>
                            </Link>
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