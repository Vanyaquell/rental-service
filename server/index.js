import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import cors from 'cors';
import router from './routes/offerRoutes.js';
dotenv.config();

const PORT = process.env.PORT || 5000;


const app = express();
app.use('/', router);
app.use(cors());
app.use(express.json());
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();