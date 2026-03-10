import { type ChangeEvent, type FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { postReviewAction } from "../../store/api-action";

type ReviewFormProps = {
    offerId: string;
}

function ReviewForm({ offerId }: ReviewFormProps) {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    };

    const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value);
    };

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();

        if (!rating || review.trim().length < 5 || !offerId) {
            return;
        }

        setIsSubmitting(true);

        try {
            await dispatch(postReviewAction({
                offerId,
                comment: review,
                rating
            })).unwrap();

            setRating(null);
            setReview("");
        } catch (error) {
            console.error('Failed to post review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = rating !== null && review.trim().length >= 5;

    const getStarStyle = (starValue: number) => {
        const activeRating = hoveredRating !== null ? hoveredRating : rating;
        if (activeRating && starValue <= activeRating) {
            return { fill: '#ff9000' };
        }
        return { fill: '#c7c7c7' };
    };

    return (
        <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {[5, 4, 3, 2, 1].map((value) => (
                    <div key={`rating-${value}`}>
                        <input
                            className="form__rating-input visually-hidden"
                            name="rating"
                            value={value}
                            id={`${value}-stars`}
                            type="radio"
                            checked={rating === value}
                            onChange={handleRatingChange}
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor={`${value}-stars`}
                            className="reviews__rating-label form__rating-label"
                            onMouseEnter={() => setHoveredRating(value)}
                            onMouseLeave={() => setHoveredRating(null)}
                            title={value === 5 ? 'perfect' : value === 4 ? 'good' : value === 3 ? 'not bad' : value === 2 ? 'badly' : 'terribly'}
                        >
                            <svg
                                className="form__star-image"
                                width="37"
                                height="33"
                                style={getStarStyle(value)}
                            >
                                <use href="/img/sprite.svg#icon-star"></use>
                            </svg>
                        </label>
                    </div>
                ))}
            </div>
            <textarea
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
                value={review}
                onChange={handleReviewChange}
                disabled={isSubmitting}
                minLength={5}
                maxLength={1024}
            />
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">5 characters</b>.
                </p>
                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}

export { ReviewForm };