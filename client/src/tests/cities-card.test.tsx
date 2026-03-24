import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';
import { AppRoute } from '../const';
import { renderWithProviders } from './render-with-providers';

describe('CitiesCard', () => {
    const fakeOffer = makeFakeOffer();

    const renderCard = (isPremium: boolean = false, isFavorite: boolean = false) => {
        return renderWithProviders(
            <CitiesCard
                id={fakeOffer.id}
                title={fakeOffer.title}
                type={fakeOffer.type}
                price={fakeOffer.price}
                previewImage={fakeOffer.previewImage}
                isPremium={isPremium}
                rating={fakeOffer.rating}
                isFavorite={isFavorite}
            />
        );
    };

    it('заголовок объявления отображается на карточке', () => {
        renderCard();
        expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    });

    it('цена объявления присутствует в разметке', () => {
        renderCard();
        expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    });

    it('метка "Premium" отображается когда isPremium = true', () => {
        renderCard(true);
        expect(screen.getByText('Premium')).toBeInTheDocument();
    });

    it('метка "Premium" отсутствует когда isPremium = false', () => {
        renderCard(false);
        expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    });

    it('ссылка на страницу объявления содержит id в href', () => {
        renderCard();
        const link = screen.getByRole('link', { name: fakeOffer.title });
        expect(link).toHaveAttribute('href', `${AppRoute.Offer}/${fakeOffer.id}`);
    });
});
