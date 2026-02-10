import { Link } from "react-router-dom";
import { useState } from "react";
import { AppRoute } from "../../const.ts";
import type { FullOffer } from "../../types/offers.ts";

type CitiesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    previewImage: string;
    rating: number;
    isNearby?: boolean;
    onMouseOver?: (id: string) => void;
    onMouseOut?: () => void;
    isFavorite: boolean;
}

function CitiesCard({
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    rating,
    isNearby = false,
    onMouseOver,
    onMouseOut,
    isFavorite
}: CitiesCardProps) {
    const [, setActiveOfferId] = useState('');

    const handleMouseOver = () => {
        setActiveOfferId(id);
        if (onMouseOver) {
            onMouseOver(id);
        }
    };

    const handleMouseOut = () => {
        setActiveOfferId('');
        if (onMouseOut) {
            onMouseOut();
        }
    };

    const imageWrapperClass = isNearby
        ? "near-places__image-wrapper place-card__image-wrapper"
        : "cities__image-wrapper place-card__image-wrapper";

    const articleClass = isNearby
        ? "near-places__card place-card"
        : "cities__card place-card";

    return (
        <article
            className={articleClass}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={imageWrapperClass}>
                <Link to={`${AppRoute.Offer}/${id}`}>
                    <img
                        className="place-card__image"
                        src={previewImage}
                        width="260"
                        height="200"
                        alt="Place image"
                    />
                </Link>
            </div>

            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className={`place-card__bookmark-button ${isFavorite ? "place-card__bookmark-button--active" : ''} button`} type="button">
                        {isFavorite ? <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="/img/sprite.svg#icon-bookmark"></use>
                        </svg> : <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="/img/sprite.svg#icon-bookmark"></use>
                        </svg>}

                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${rating * 20}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`${AppRoute.Offer}/${id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
}

export { CitiesCard };