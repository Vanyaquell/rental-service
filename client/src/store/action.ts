import { createAction } from '@reduxjs/toolkit';
import type { OffersList } from '../types/offers';
import type { City } from "../types/city.ts";
import type { FullOffer } from '../types/offers';
import type { ReviewType } from '../types/reviews';
import { AuthorizationStatus } from '../const.ts';
import type { AuthorizationStatusType } from '../types/authorization-status.ts';

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const changeCity = createAction('offers/changedcity', (city: City) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

const setUserEmail = createAction<string | null>('user/setUserEmail');

const setCurrentOffer = createAction<FullOffer | null>('offer/setCurrentOffer');

const setCurrentOfferReviews = createAction<ReviewType[]>('offer/setCurrentOfferReviews');

const setCurrentOfferLoadingStatus = createAction<boolean>('offer/setCurrentOfferLoadingStatus');

const setCurrentOfferError = createAction<string | null>('offer/setCurrentOfferError');

const setServerUnavailable = createAction<boolean>('data/setServerUnavailable');

export {
    changeCity,
    offersCityList,
    requireAuthorization,
    setError,
    setOffersDataLoadingStatus,
    setUserEmail,
    setCurrentOffer,
    setCurrentOfferReviews,
    setCurrentOfferLoadingStatus,
    setCurrentOfferError,
    setServerUnavailable
};