import { faker } from '@faker-js/faker';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import type { InitialState } from '../store/reduce';
import type { OffersList, FullOffer, CityOffer } from '../types/offers';
import type { ReviewType } from '../types/reviews';

function makeFakeCityOffer(): CityOffer {
    const city = faker.helpers.arrayElement(CITIES_LOCATION);
    return {
        name: city.title,
        location: {
            latitude: city.lat,
            longitude: city.lng,
            zoom: city.zoom,
        },
    };
}

export function makeFakeOffer(): OffersList {
    const cityOffer = makeFakeCityOffer();
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        type: faker.helpers.arrayElement(['apartment', 'house', 'room', 'hotel']),
        price: faker.number.int({ min: 50, max: 500 }),
        city: cityOffer,
        location: {
            latitude: cityOffer.location.latitude + faker.number.float({ min: -0.1, max: 0.1 }),
            longitude: cityOffer.location.longitude + faker.number.float({ min: -0.1, max: 0.1 }),
            zoom: 13,
        },
        isFavorite: faker.datatype.boolean(),
        isPremium: faker.datatype.boolean(),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        previewImage: faker.image.url(),
    };
}

export function makeFakeFullOffer(): FullOffer {
    const baseOffer = makeFakeOffer();
    return {
        ...baseOffer,
        description: faker.lorem.paragraph(),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        goods: [faker.commerce.productName(), faker.commerce.productName()],
        host: {
            name: faker.person.fullName(),
            avatarUrl: faker.image.avatar(),
            isPro: faker.datatype.boolean(),
        },
        images: [faker.image.url(), faker.image.url()],
        maxAdults: faker.number.int({ min: 1, max: 10 }),
    };
}

export function makeFakeReview(): ReviewType {
    return {
        id: faker.number.int({ min: 1, max: 1000 }),
        offerId: faker.string.uuid(),
        comment: faker.lorem.sentence(),
        rating: faker.number.int({ min: 1, max: 5 }),
        date: new Date().toISOString(),
        user: {
            name: faker.person.fullName(),
            avatarUrl: faker.image.avatar(),
            isPro: faker.datatype.boolean(),
        },
    };
}

export function makeFakeStore(overrides: Partial<InitialState> = {}): InitialState {
    return {
        city: CITIES_LOCATION[0],
        offers: [],
        currentOffer: null,
        currentOfferReviews: [],
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
        error: null,
        isOffersDataLoading: false,
        isCurrentOfferLoading: false,
        currentOfferError: null,
        ...overrides,
    };
}