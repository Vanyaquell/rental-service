export type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type ReviewType = {
    id: number;
    offerId: string;
    comment: string;
    date: string;
    rating: number;
    user: User;
}