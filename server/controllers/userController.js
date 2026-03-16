import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const registration = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body;

        if (!email || !password || !userType || !username) {
            return next(ApiError.badRequest('Все поля обязательны'));
        }

        if (password.length < 6 || password.length > 12) {
            return next(ApiError.badRequest('Пароль должен быть от 6 до 12 символов'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        let avatarImage = '/static/default-avatar.png';

        if (req.file) {
            avatarImage = `/static/${req.file.filename}`;
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            userType,
            username,
            avatar: avatarImage,
            password: hashPassword
        });

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatar,
                isPro: user.userType === 'pro'
            }
        });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return next(ApiError.badRequest('Ошибка валидации: ' + error.errors.map(e => e.message).join(', ')));
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        next(ApiError.internal('Ошибка регистрации: ' + error.message));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return next(ApiError.badRequest('Пользователь не найден'));

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return next(ApiError.badRequest('Неверный пароль'));

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        next(ApiError.internal('Ошибка авторизации'));
    }
};

const checkAuth = (req, res) => {
    const user = req.user;

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            userType: user.userType,
            avatar: user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isPro: user.userType === 'pro',
        token
    });
};

const logout = (req, res) => {
    res.status(204).send();
};

export { logout, checkAuth, login };