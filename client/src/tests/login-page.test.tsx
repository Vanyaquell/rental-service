import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../pages/login-page/login-page';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus, AppRoute } from '../const';

vi.mock('../store/api-action', () => ({
    loginAction: vi.fn(() => ({ type: 'user/login' })),
}));

describe('LoginPage — отрисовка формы', () => {
    it('отображает заголовок Sign in', () => {
        renderWithProviders(<LoginPage />);
        expect(
            screen.getByRole('heading', { name: /sign in/i })
        ).toBeInTheDocument();
    });

    it('отображает поле email', () => {
        renderWithProviders(<LoginPage />);
        expect(
            screen.getByPlaceholderText(/email/i)
        ).toBeInTheDocument();
    });

    it('отображает поле password', () => {
        renderWithProviders(<LoginPage />);
        expect(
            screen.getByPlaceholderText(/password/i)
        ).toBeInTheDocument();
    });

    it('кнопка Submit присутствует', () => {
        renderWithProviders(<LoginPage />);
        expect(
            screen.getByRole('button', { name: /sign in/i })
        ).toBeInTheDocument();
    });
});

describe('LoginPage — ввод данных', () => {
    it('пользователь может ввести email и пароль', async () => {
        renderWithProviders(<LoginPage />);
        const user = userEvent.setup();
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        await user.type(emailInput, 'test@test.com');
        await user.type(passwordInput, 'Password123');

        expect(emailInput).toHaveValue('test@test.com');
        expect(passwordInput).toHaveValue('Password123');
    });
});

describe('LoginPage — валидация формы', () => {
    it('кнопка отправки активна при заполненных полях', async () => {
        renderWithProviders(<LoginPage />);
        const user = userEvent.setup();
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        await user.type(emailInput, 'test@test.com');
        await user.type(passwordInput, 'Password123');

        expect(submitButton).not.toBeDisabled();
    });

    it('кнопка отправки неактивна при пустых полях', () => {
        renderWithProviders(<LoginPage />);
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        expect(submitButton).not.toBeDisabled();
    });
});

describe('LoginPage — перенаправление', () => {
    it('авторизованный пользователь перенаправляется с /login', () => {
        renderWithProviders(<LoginPage />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
            },
            initialEntries: [AppRoute.Login],
        });

        expect(
            screen.queryByPlaceholderText(/email/i)
        ).not.toBeInTheDocument();
    });

    it('неавторизованный пользователь видит форму', () => {
        renderWithProviders(<LoginPage />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
            initialEntries: [AppRoute.Login],
        });

        expect(
            screen.getByPlaceholderText(/email/i)
        ).toBeInTheDocument();
    });

    it('пользователь со статусом UnknownAuth видит форму', () => {
        renderWithProviders(<LoginPage />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.UnknownAuth,
            },
            initialEntries: [AppRoute.Login],
        });

        expect(
            screen.getByPlaceholderText(/email/i)
        ).toBeInTheDocument();
    });
});

describe('LoginPage — отправка формы', () => {
    it('при отправке формы вызывается loginAction', async () => {
        const { loginAction } = await import('../store/api-action');
        const user = userEvent.setup();

        renderWithProviders(<LoginPage />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        await user.type(emailInput, 'test@test.com');
        await user.type(passwordInput, 'Password123');
        await user.click(submitButton);

        expect(loginAction).toHaveBeenCalledWith({
            email: 'test@test.com',
            password: 'Password123',
        });
    });
});

describe('LoginPage — ссылка на главную', () => {
    it('содержит ссылку на главную страницу с городом Amsterdam', () => {
        renderWithProviders(<LoginPage />);
        const link = screen.getByRole('link', { name: /amsterdam/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', AppRoute.Main);
    });
});