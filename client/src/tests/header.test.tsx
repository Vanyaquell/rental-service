import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus, AppRoute } from '../const';
import { makeFakeOffer } from './mocks';

describe('Header — неавторизованный пользователь', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<Header />);
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('не отображает Sign out', () => {
        renderWithProviders(<Header />);
        expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });

    it('не отображает email пользователя', () => {
        renderWithProviders(<Header />);
        expect(screen.queryByText(/@/)).not.toBeInTheDocument();
    });
});

describe('Header — авторизованный пользователь', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const mockEmail = 'test@example.com';

    it('отображает email пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: mockEmail,
                offers: mockOffers,
            },
        });
        expect(screen.getByText(mockEmail)).toBeInTheDocument();
    });

    it('отображает количество избранных предложений', () => {
        const offersWithFavorites = [
            { ...makeFakeOffer(), isFavorite: true },
            { ...makeFakeOffer(), isFavorite: true },
            { ...makeFakeOffer(), isFavorite: false },
        ];

        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: mockEmail,
                offers: offersWithFavorites,
            },
        });
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('отображает кнопку Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: mockEmail,
                offers: mockOffers,
            },
        });
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });

    it('не отображает ссылку Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: mockEmail,
                offers: mockOffers,
            },
        });
        expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    });

    it('ссылка на избранное ведет на страницу /favorites', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: mockEmail,
                offers: mockOffers,
            },
        });

        const favoritesLink = screen.getByRole('link', { name: /test@example\.com/i });
        expect(favoritesLink).toHaveAttribute('href', AppRoute.Favorites);
    });
});

describe('Header — статус UnknownAuth', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.UnknownAuth,
            },
        });
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('не отображает Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.UnknownAuth,
            },
        });
        expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });

    it('не отображает email пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.UnknownAuth,
                userEmail: 'test@example.com',
            },
        });
        expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    });
});