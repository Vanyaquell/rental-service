import type { OffersList } from "../../types/offers";
import { FavoritesCard } from "../favorite-card/favorite-card.tsx";

type FavoritesCardListProps = {
    offersList: OffersList[];
};

function FavoritesCardList({ offersList }: FavoritesCardListProps) {
    const favoriteOffers = offersList.filter((offer) => offer.isFavorite);

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
                            />
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export { FavoritesCardList };