import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingPage } from '../components/loading-page/loading-page';

describe('LoadingPage', () => {
    it('отображает текст загрузки', () => {
        render(<LoadingPage />);
        expect(screen.getByText(/Загрузка предложений/i)).toBeInTheDocument();
    });
});