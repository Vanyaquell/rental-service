import { Offer } from "../models/offer.js";
import { User } from "../models/user.js";
import { adaptOfferToClient, adaptFullOfferToClient } from "../adapters/offerAdapter.js";
import ApiError from "../error/ApiError.js";
import fs from 'fs';
import path from 'path';

async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error('Не удалось получить список предложений', error);
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType'] // Выбираем только нужные поля
            }
        });

        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const adaptedOffer = adaptFullOfferToClient(offer, offer.author);

        res.status(200).json(adaptedOffer);
    } catch (error) {
        console.error('Не удалось получить предложение', error);
        next(ApiError.internal('Не удалось получить предложение: ' + error.message));
    }
}

export async function createOffer(req, res, next) {
    try {
        let offerData = { ...req.body };

        if (req.body.json) {
            try {
                const parsedJson = JSON.parse(req.body.json);
                offerData = { ...offerData, ...parsedJson };
            } catch (e) {
                return next(ApiError.badRequest('Неверный формат JSON в поле json'));
            }
        }

        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = offerData;

        if (!title || !description || !city || !type || !price || !userId) {
            return next(ApiError.badRequest('Отсутствуют обязательные поля'));
        }

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',');
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium: isPremium === 'true' || isPremium === true,
            isFavorite: isFavorite === 'true' || isFavorite === true,
            rating: parseFloat(rating),
            type,
            rooms: parseInt(rooms),
            guests: parseInt(guests),
            price: parseInt(price),
            features: parsedFeatures,
            commentsCount: commentsCount || 0,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            authorId: userId
        });

        return res.status(201).json(offer);
    } catch (error) {
        console.error('Ошибка создания предложения:', error);
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

async function getFavoriteOffers(req, res, next) {
    try {
        const favoriteOffers = await Offer.findAll({
            where: { isFavorite: true }
        });

        const adaptedOffers = favoriteOffers.map(adaptOfferToClient);

        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error('Не удалось получить избранные предложения', error);
        next(ApiError.internal('Не удалось получить избранные предложения: ' + error.message));
    }
}

const toggleFavorite = async (req, res, next) => {
    try {
        const { offerId, status } = req.params;

        const offer = await Offer.findByPk(offerId);

        if (!offer) {
            return next(ApiError.badRequest('Предложение не найдено'));
        }

        offer.isFavorite = status === '1';
        await offer.save();

        res.json(offer);
    } catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
};

export const initializeRatings = async (req, res, next) => {
    try {
        const offers = await Offer.findAll();

        for (const offer of offers) {
            const reviews = await Review.findAll({
                where: { OfferId: offer.id },
                attributes: ['rating']
            });

            if (reviews.length === 0) {
                offer.rating = 0;
            } else {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / reviews.length;
                offer.rating = Math.round(averageRating * 10) / 10;
            }

            await offer.save();
        }

        res.json({ message: 'Все рейтинги обновлены' });
    } catch (error) {
        next(ApiError.internal('Ошибка при обновлении рейтингов'));
    }
};

export { getAllOffers, getFullOffer, getFavoriteOffers, toggleFavorite };