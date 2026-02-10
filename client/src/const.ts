import type { City } from "./types/city.ts";

const Setting = {
    rentalOffersCount: 312,
} as const;

const AppRoute = {
    Main: '/',
    Login: '/login',
    Favorites: '/favorites',
    Offer: '/offer'
}

const AuthorizationStatus = {
    Auth: "AUTH",
    NoAuth: "NO_AUTH",
    UnknownAuth: "UNKNOWN",
}

const CITIES_LOCATION: City[] = [
    {
        title: 'Paris',
        lat: 48.5112,
        lng: 2.2055,
        zoom: 8
    },
    {
        title: 'Cologne',
        lat: 50.9375,
        lng: 6.9603,
        zoom: 8
    },
    {
        title: 'Brussels',

        lat: 50.8503,
        lng: 4.3517,
        zoom: 8
    },
    {
        title: 'Amsterdam',
        lat: 52.2226,
        lng: 4.5322,
        zoom: 8
    },
    {
        title: 'Hamburg',
        lat: 53.5511,
        lng: 9.9937,
        zoom: 8
    },
    {
        title: 'Dusseldorf',
        lat: 51.2277,
        lng: 6.7735,
        zoom: 8
    },
];

const SortOffersType = {
    Popular: 'Popular',
    PriceToligh: 'Price: low to high',
    PriceToLow: 'Price: high to low',
    TopRated: 'Top rated first',
};


export { SortOffersType };
export { CITIES_LOCATION }
export { Setting };
export { AppRoute };
export { AuthorizationStatus };