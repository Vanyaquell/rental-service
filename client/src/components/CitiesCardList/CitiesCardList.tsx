import type { OffersList } from "../../types/offers";
import { CitiesCard } from "../cities-card/cities-card.tsx";

type CitiesCardListProps = {
    offersList: OffersList[];
    isNearby?: boolean;
    onOfferHover?: (id: string) => void;
    onOfferLeave?: () => void;
};

function CitiesCardList({
    offersList,
    isNearby = false,
    onOfferHover,
    onOfferLeave
}: CitiesCardListProps) {
    const listClass = isNearby
        ? "near-places__list places__list"
        : "cities__places-list places__list tabs__content";

    return (
        <div className={listClass}>
            {offersList.map((item) => (
                <CitiesCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    type={item.type}
                    price={item.price}
                    previewImage={item.previewImage}
                    isPremium={item.isPremium}
                    rating={item.rating}
                    isNearby={isNearby}
                    onMouseOver={onOfferHover}
                    onMouseOut={onOfferLeave}
                    isFavorite={item.isFavorite}
                />
            ))}
        </div>
    );
}

export { CitiesCardList };