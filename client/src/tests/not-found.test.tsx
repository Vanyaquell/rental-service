import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components/not-found/not-found';
import { AppRoute } from '../const';

describe('PageNotFound', () => {
    const renderPage = () => render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );

    it('отображает заголовок 404', () => {
        renderPage();
        expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('отображает текст "Страница не найдена"', () => {
        renderPage();
        expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    });

    it('ссылка на главную страницу присутствует', () => {
        renderPage();
        const link = screen.getByRole('link', { name: /Перейти на главную страницу/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', AppRoute.Main);
    });
});