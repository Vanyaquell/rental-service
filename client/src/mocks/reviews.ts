import type { ReviewType } from "../types/reviews.ts";

const reviews: ReviewType[] = [
    {
        id: 1,
        offerId: 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b', // Paris apartment
        comment: "Прекрасное расположение апартаментов! В паре минут ходьбы от Эйфелевой башни и Лувра. Персонал приветливый, помогли с организацией экскурсий.",
        date: "2024-03-15T10:30:00.000Z",
        rating: 5,
        user: {
            name: "Алиса Соколова",
            avatarUrl: "https://i.pravatar.cc/150?img=1",
            isPro: true
        }
    },
    {
        id: 2,
        offerId: 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b', // Paris apartment
        comment: "Чистые и ухоженные номера, вкусный завтрак с круассанами. Вид на Париж из окна просто восхитительный. Отличный вариант для романтического отпуска.",
        date: "2024-03-10T14:45:00.000Z",
        rating: 4,
        user: {
            name: "Максим Орлов",
            avatarUrl: "https://i.pravatar.cc/150?img=2",
            isPro: false
        }
    },
    {
        id: 3,
        offerId: 'ccc86a0e-3f92-446d-9a6e-cbd4b5d38e2c', // Hamburg loft
        comment: "Современный и стильный лофт в самом центре Гамбурга. Вся обстановка новая и качественная. Отличное предложение по соотношению цена-качество.",
        date: "2024-03-05T09:15:00.000Z",
        rating: 5,
        user: {
            name: "София Кузнецова",
            avatarUrl: "https://i.pravatar.cc/150?img=3",
            isPro: true
        }
    },
    {
        id: 4,
        offerId: 'ddd86a0e-3f92-446d-9a6e-cbd4b5d38e2d', // Brussels studio
        comment: "Уютная и компактная студия прямо рядом с площадью Гран-Плас. Идеальный вариант для короткого визита в Брюссель. Хозяева оказались очень радушными.",
        date: "2024-02-28T16:20:00.000Z",
        rating: 4,
        user: {
            name: "Артём Лебедев",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            isPro: false
        }
    },
    {
        id: 5,
        offerId: 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e', // Amsterdam houseboat
        comment: "Невероятный опыт проживания на доме-лодке! Каждое утро просыпаться с видом на канал — это незабываемо. Обязательно приеду ещё раз!",
        date: "2024-02-20T11:10:00.000Z",
        rating: 5,
        user: {
            name: "Вероника Морозова",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            isPro: true
        }
    },
    {
        id: 6,
        offerId: 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e', // Amsterdam houseboat
        comment: "Оригинальное жильё с особым шармом. Немного покачивает ночью, но быстро привыкаешь. Очень удобное расположение.",
        date: "2024-02-15T13:55:00.000Z",
        rating: 4,
        user: {
            name: "Игорь Васнецов",
            avatarUrl: "https://i.pravatar.cc/150?img=6",
            isPro: false
        }
    }
];

export { reviews };