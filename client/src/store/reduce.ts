import { createReducer } from '@reduxjs/toolkit';
import { mapFullOffersToOffersList } from '../mocks/offers-list';
import { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus } from './action.ts';
import { offers } from "../mocks/offers.ts";
import { AuthorizationStatus, CITIES_LOCATION } from "../const.ts";
import { getCity } from "../util.ts";
import type { City } from '../types/city.ts';
import type { OffersList, CityOffer } from '../types/offers.ts';
import type { AuthorizationStatusType } from '../types/authorization-status.ts';

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
    city: City | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
}
const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.UnknownAuth,
    error: null,
    isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        })
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload;
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })

});

export { reducer };