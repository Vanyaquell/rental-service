import { createReducer } from '@reduxjs/toolkit';
import { changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserEmail, setCurrentOffer, setCurrentOfferReviews, setCurrentOfferLoadingStatus, setCurrentOfferError } from './action';
import { AuthorizationStatus, CITIES_LOCATION } from "../const";
import { getCity } from "../util";
import type { City } from '../types/city';
import type { OffersList } from '../types/offers';
import type { FullOffer } from '../types/offers';
import type { ReviewType } from '../types/reviews';
import type { AuthorizationStatusType } from '../types/authorization-status';

const defaultCity = getCity('Paris', CITIES_LOCATION);

const token = localStorage.getItem('rent-service-token');
const initialAuthStatus = token
    ? AuthorizationStatus.UnknownAuth
    : AuthorizationStatus.NoAuth;

export type InitialState = {
    city: City | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
    userEmail: string | null;
    currentOffer: FullOffer | null;
    currentOfferReviews: ReviewType[];
    isCurrentOfferLoading: boolean;
    currentOfferError: string | null;
}

const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: initialAuthStatus,
    error: null,
    isOffersDataLoading: false,
    userEmail: null,
    currentOffer: null,
    currentOfferReviews: [],
    isCurrentOfferLoading: false,
    currentOfferError: null,
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
        .addCase(setUserEmail, (state, action) => {
            state.userEmail = action.payload;
        })
        .addCase(setCurrentOffer, (state, action) => {
            state.currentOffer = action.payload;
        })
        .addCase(setCurrentOfferReviews, (state, action) => {
            state.currentOfferReviews = action.payload;
        })
        .addCase(setCurrentOfferLoadingStatus, (state, action) => {
            state.isCurrentOfferLoading = action.payload;
        })
        .addCase(setCurrentOfferError, (state, action) => {
            state.currentOfferError = action.payload;
        });
});

export { reducer };