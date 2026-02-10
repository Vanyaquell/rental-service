import { createAction } from '@reduxjs/toolkit';
import type { OffersList } from '../types/offers';
import type { City } from "../types/city.ts";


const changeCity = createAction('offers/changedity', (city: City) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

export { changeCity, offersCityList };