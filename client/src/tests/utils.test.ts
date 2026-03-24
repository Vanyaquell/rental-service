import { describe, it, expect } from 'vitest';
import { getOffersByCity, sortOffersByType, getCity } from '../util';
import { makeFakeOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';
import type { SortOffer } from '../types/sort';

describe('getCity', () => {
    it('возвращает город по названию', () => {
        const cityName = 'Paris';
        const result = getCity(cityName, CITIES_LOCATION);
        expect(result.title).toBe('Paris');
        expect(result.lat).toBe(48.5112);
        expect(result.lng).toBe(2.2055);
    });

    it('возвращает undefined если город не найден', () => {
        const cityName = 'NonExistentCity';
        const result = getCity(cityName, CITIES_LOCATION);
        expect(result).toBeUndefined();
    });
});

describe('getOffersByCity', () => {
    it('возвращает только объявления указанного города', () => {
        const parisOffer = { ...makeFakeOffer(), city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } } };
        const cologneOffer = { ...makeFakeOffer(), city: { name: 'Cologne', location: { latitude: 50.9384, longitude: 6.9599, zoom: 13 } } };
        const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);
        expect(result).toHaveLength(1);
        expect(result[0].city.name).toBe('Paris');
    });

    it('возвращает пустой массив, если город не найден', () => {
        const offers = [makeFakeOffer(), makeFakeOffer()];
        expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
    });

    it('возвращает пустой массив при пустом списке предложений', () => {
        expect(getOffersByCity('Paris', [])).toEqual([]);
    });
});

describe('sortOffersByType', () => {
    it('сортирует от дешёвых к дорогим (PriceToligh)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 300 },
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];
        const result = sortOffersByType([...offers], SortOffersType.PriceToligh as SortOffer);
        expect(result[0].price).toBe(100);
        expect(result[2].price).toBe(300);
    });

    it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 300 },
        ];
        const result = sortOffersByType([...offers], SortOffersType.PriceToLow as SortOffer);
        expect(result[0].price).toBe(300);
    });

    it('сортирует по рейтингу (TopRated)', () => {
        const offers = [
            { ...makeFakeOffer(), rating: 3 },
            { ...makeFakeOffer(), rating: 5 },
            { ...makeFakeOffer(), rating: 4 },
        ];
        const result = sortOffersByType([...offers], SortOffersType.TopRated as SortOffer);
        expect(result[0].rating).toBe(5);
    });

    it('сортировка Popular не меняет порядок', () => {
        const offers = [
            { ...makeFakeOffer(), price: 300 },
            { ...makeFakeOffer(), price: 100 },
        ];
        const originalOrder = [...offers];
        const result = sortOffersByType([...offers], SortOffersType.Popular as SortOffer);
        expect(result[0]).toEqual(originalOrder[0]);
        expect(result[1]).toEqual(originalOrder[1]);
    });

    it('не изменяет исходный массив', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];
        const copy = [...offers];
        sortOffersByType(offers, SortOffersType.PriceToligh as SortOffer);
        expect(offers).toEqual(copy);
    });

    it('возвращает пустой массив при пустом массиве предложений', () => {
        const result = sortOffersByType([], SortOffersType.Popular as SortOffer);
        expect(result).toEqual([]);
    });
});