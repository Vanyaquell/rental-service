import { createAction } from '@reduxjs/toolkit';
import type { OffersList } from '../types/offers';
import type { City } from "../types/city.ts";
import type { CityOffer } from '../types/offers';
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

export { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus };
