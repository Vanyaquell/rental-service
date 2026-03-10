import { useCallback } from 'react';
import { useAppDispatch } from './index';
import { toggleFavoriteAction } from '../store/api-action';

export const useFavorite = () => {
    const dispatch = useAppDispatch();

    const toggleFavorite = useCallback(async (offerId: string, isFavorite: boolean) => {
        const status = isFavorite ? 0 : 1;

        try {
            await dispatch(toggleFavoriteAction({ offerId, status })).unwrap();
            return true;
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            return false;
        }
    }, [dispatch]);

    return { toggleFavorite };
};