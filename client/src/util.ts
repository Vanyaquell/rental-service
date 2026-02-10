import type { City } from "./types/city.ts";
import type { OffersList } from "./types/offers.ts";
import { SortOffersType } from "./const.ts";
import type { SortOffer } from "./types/sort.ts";

export function getCity(cityName: string, cities: City[]): City {
    return cities.find(city => city.title === cityName)!;
}

export function getOffersByCity(city: string, offers: OffersList[]) {
    return offers.filter(offer => offer.city.name === city);
}

export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {
    switch (type) {
        case SortOffersType.PriceToligh:
            return offers.sort((a, b) => a.price - b.price);
        case SortOffersType.PriceToLow:
            return offers.sort((a, b) => b.price - a.price);
        case SortOffersType.TopRated:
            return offers.sort((a, b) => b.rating - a.rating);
        default:
            return offers;
    }
}