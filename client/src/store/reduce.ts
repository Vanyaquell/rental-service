import { createReducer } from '@reduxjs/toolkit';
import { mapFullOffersToOffersList } from '../mocks/offers-list';

import { changeCity, offersCityList } from './action';
import { offers } from "../mocks/offers.ts";
import { CITIES_LOCATION } from "../const.ts";
import { getCity } from "../util.ts";

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState = {
    city: defaultCity,
    offers: mapFullOffersToOffersList(offers)
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        });
});

export { reducer };