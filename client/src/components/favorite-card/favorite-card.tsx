import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { AppRoute, AuthorizationStatus } from "../../const.ts";
import { useFavorite } from "../../hooks/use-favorite";
import { useAppSelector } from "../../hooks";
import "./favorite-card.css";

type FavoritesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    previewImage: string;
    rating: number;
    onRemove?: () => void;
}

function FavoritesCard({
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    rating,
    onRemove
}: FavoritesCardProps) {
    const [isRemoving, setIsRemoving] = useState(false);
    const { toggleFavorite } = useFavorite();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuth) {
            window.location.href = AppRoute.Login;
            return;
        }

        if (isRemoving) return;

        setIsRemoving(true);
        const success = await toggleFavorite(id, true);

        if (success && onRemove) {
            onRemove();
        }

        setIsRemoving(false);
    }, [id, toggleFavorite, onRemove, isRemoving, isAuth]);

    return (
        <article className="favorites__card place-card">
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="favorites__image-wrapper place-card__image-wrapper">
                <Link to={`${AppRoute.Offer}/${id}`}>
                    <img
                        className="place-card__image"
                        src={previewImage}
                        width="150"
                        height="110"
                        alt="Place image"
                    />
                </Link>
            </div>
            <div className="favorites__card-info place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button
                        className={`place-card__bookmark-button button place-card__bookmark-button--active`}
                        type="button"
                        onClick={handleFavoriteClick}
                        disabled={isRemoving}
                    >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="/img/sprite.svg#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                            {isRemoving ? "Removing..." : "In bookmarks"}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${rating * 20}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
}

export { FavoritesCard };