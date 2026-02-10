import { Review } from "../review/review.tsx";
import type { ReviewType } from "../../types/reviews.ts";

type ReviewsListProps = {
    reviews: ReviewType[];
}

function ReviewsList(props: ReviewsListProps) {
    const { reviews } = props;

    return (
        <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ul className="reviews__list">
                {reviews.map((review) => (
                    <Review
                        key={review.id}
                        review={review}
                    />
                ))}
            </ul>
        </section>
    );
}
export { ReviewsList };