import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../types/state.js';
import type { OffersList, FullOffer } from '../types/offers.js';
import type { ReviewType } from '../types/reviews.js';
import {
    offersCityList,
    requireAuthorization,
    setOffersDataLoadingStatus,
    setUserEmail,
    setCurrentOffer,
    setCurrentOfferReviews,
    setCurrentOfferLoadingStatus,
    setCurrentOfferError,
    setServerUnavailable
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import type { AuthData, UserData } from '../types/user-data';
import { setError } from './action';
import { store } from './index';

const SERVER_TIMEOUT = 2000;

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchOffers',
    async (_arg, { dispatch, extra: api }) => {
        dispatch(setOffersDataLoadingStatus(true));
        dispatch(setServerUnavailable(false));

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Server timeout')), SERVER_TIMEOUT);
        });

        const requestPromise = api.get<OffersList[]>(APIRoute.Offers);

        try {
            const { data } = await Promise.race([requestPromise, timeoutPromise]) as { data: OffersList[] };
            dispatch(setOffersDataLoadingStatus(false));
            dispatch(offersCityList(data));
        } catch (error) {
            console.error('Failed to fetch offers:', error);
            dispatch(setOffersDataLoadingStatus(false));
            dispatch(setServerUnavailable(true));
            dispatch(setError('Сервер недоступен'));
        }
    },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/checkAuth',
    async (_arg, { dispatch, extra: api }) => {
        try {
            const token = localStorage.getItem('rent-service-token');

            if (!token) {
                dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
                dispatch(setUserEmail(null));
                return;
            }

            const response = await api.get(APIRoute.Login);

            const userEmail = response.data?.email ||
                response.data?.user?.email;

            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            dispatch(setUserEmail(userEmail));

        } catch (error) {
            localStorage.removeItem('rent-service-token');
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUserEmail(null));
        }
    },
);

export const loginAction = createAsyncThunk<
    UserData,
    AuthData,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'user/login',
    async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.post(APIRoute.Login, { email, password });

            if (data.token) {
                localStorage.setItem('rent-service-token', data.token);
            }

            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            dispatch(setUserEmail(email));

            return data;
        } catch (err) {
            localStorage.removeItem('rent-service-token');
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUserEmail(null));
            return rejectWithValue('Login failed');
        }
    }
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/logout',
    async (_arg, { dispatch, extra: api }) => {
        try {
            const token = localStorage.getItem('rent-service-token');

            if (token) {
                await api.delete(APIRoute.Logout);
            }

        } catch (error) {
        } finally {
            localStorage.removeItem('rent-service-token');
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUserEmail(null));
        }
    },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'offer/fetchOffer',
    async (offerId, { dispatch, extra: api }) => {
        try {
            dispatch(setCurrentOfferLoadingStatus(true));
            dispatch(setCurrentOfferError(null));

            const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
            dispatch(setCurrentOffer(data));

            dispatch(fetchReviewsAction(offerId));
        } catch (error) {
            dispatch(setCurrentOfferError('Offer not found'));
        } finally {
            dispatch(setCurrentOfferLoadingStatus(false));
        }
    },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'offer/fetchReviews',
    async (offerId, { dispatch, extra: api }) => {
        try {
            const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${offerId}`);
            dispatch(setCurrentOfferReviews(data));
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    },
);

export const postReviewAction = createAsyncThunk<
    void,
    { offerId: string; comment: string; rating: number },
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/postReview',
    async ({ offerId, comment, rating }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            await api.post(`${APIRoute.Comments}/${offerId}`, {
                comment,
                rating
            });

            await dispatch(fetchReviewsAction(offerId));
        } catch (error) {
            return rejectWithValue('Failed to post review');
        }
    }
);

export const clearErrorAction = createAsyncThunk(
    'clearError',
    () => {
        setTimeout(
            () => store.dispatch(setError(null)),
            TIMEOUT_SHOW_ERROR,
        );
    },
);

export const toggleFavoriteAction = createAsyncThunk<
    void,
    { offerId: string; status: number },
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'offer/toggleFavorite',
    async ({ offerId, status }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);

            dispatch(fetchOffersAction());

        } catch (error: any) {
            console.error('Failed to toggle favorite:', error);
            return rejectWithValue('Failed to toggle favorite');
        }
    }
);