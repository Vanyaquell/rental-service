import type { OffersList, FullOffer } from "../types/offers";

export const offersList: OffersList[] = [
    {
        id: 'bbb8dec3-3f92-4d64-9a8e-c6db5d38c2b',
        title: 'Wood and stone place',
        type: 'apartment',
        price: 370,
        previewImage: '../../public/img/amsterdam.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 48.85561,
                longitude: 2.334499,
                zoom: 13
            }
        },
        location: {
            latitude: 48.868618000000004,
            longitude: 2.342499,
            zoom: 18
        },
        isFavorite: true,
        isPremium: false,
        rating: 4.9
    },
    {
        id: 'a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
        title: 'Modern Loft in City Center',
        type: 'room',
        price: 120,
        previewImage: '../../public/img/amsterdam_loft.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 52.370216,
                longitude: 4.895168,
                zoom: 13
            }
        },
        location: {
            latitude: 52.37454,
            longitude: 4.897976,
            zoom: 16
        },
        isFavorite: false,
        isPremium: true,
        rating: 4.7
    },
    {
        id: 'c3d4e5f6-7g8h-9i0j-k1l2-m3n4o5p6q7r8',
        title: 'Cozy Cottage by the Lake',
        type: 'house',
        price: 280,
        previewImage: '../../public/img/amsterdam_cottage.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 50.938361,
                longitude: 6.959974,
                zoom: 13
            }
        },
        location: {
            latitude: 50.941346,
            longitude: 6.958186,
            zoom: 14
        },
        isFavorite: true,
        isPremium: true,
        rating: 4.9
    },
    {
        id: 'd5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s',
        title: 'Luxury Penthouse with Pool',
        type: 'apartment',
        price: 650,
        previewImage: '../../public/img/amsterdam_penthouse.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 48.85561,
                longitude: 2.334499,
                zoom: 13
            }
        },
        location: {
            latitude: 48.860611,
            longitude: 2.337249,
            zoom: 17
        },
        isFavorite: false,
        isPremium: true,
        rating: 5.0
    },
    {
        id: 'f9g0h1i2-3j4k-5l6m-7n8o-9p0q1r2s3t4u',
        title: 'Studio Near Central Station',
        type: 'hotel',
        price: 85,
        previewImage: '../../public/img/amsterdam_studio.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 50.85045,
                longitude: 4.34878,
                zoom: 13
            }
        },
        location: {
            latitude: 50.846557,
            longitude: 4.351697,
            zoom: 15
        },
        isFavorite: true,
        isPremium: false,
        rating: 4.2
    },

];
export const mapFullOffersToOffersList = (fullOffers: FullOffer[]): OffersList[] => {
    return fullOffers.map((offer) => ({
        id: offer.id,
        title: offer.title,
        type: offer.type,
        price: offer.price,
        city: offer.city,
        location: offer.location,
        isFavorite: offer.isFavorite,
        isPremium: offer.isPremium,
        rating: offer.rating,
        previewImage: offer.images[0] || ''
    }));
};