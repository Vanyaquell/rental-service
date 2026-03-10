import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';
import { Offer } from './offer.js';

class Review extends Model { }

const updateOfferRating = async (offerId, transaction) => {
    const reviews = await Review.findAll({
        where: { OfferId: offerId },
        attributes: ['rating'],
        transaction
    });

    if (reviews.length === 0) {
        await Offer.update(
            { rating: 0 },
            { where: { id: offerId }, transaction }
        );
        return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const roundedRating = Math.round(averageRating * 10) / 10;

    await Offer.update(
        { rating: roundedRating },
        { where: { id: offerId }, transaction }
    );
};

Review.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 1024]
        }
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    hooks: {
        afterCreate: async (review, options) => {
            await Offer.increment('commentsCount', {
                by: 1,
                where: { id: review.OfferId },
                transaction: options.transaction
            });

            await updateOfferRating(review.OfferId, options.transaction);
        },

        afterUpdate: async (review, options) => {
            await updateOfferRating(review.OfferId, options.transaction);
        },

        afterDestroy: async (review, options) => {
            await Offer.decrement('commentsCount', {
                by: 1,
                where: { id: review.OfferId },
                transaction: options.transaction
            });

            await updateOfferRating(review.OfferId, options.transaction);
        }
    }
});

Review.belongsTo(User, {
    as: 'author',
    foreignKey: {
        name: 'authorId',
        allowNull: false
    }
});

Review.belongsTo(Offer, {
    foreignKey: {
        name: 'OfferId',
        allowNull: false
    }
});

export { Review };