import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// data imports
// import User from './models/User.js';
// import { dataUser } from './data/index.js';
// import Product from './models/Product.js'; 
// import ProductStat from './models/ProductStat.js';
// import { dataProduct, dataProductStat } from './data/index.js';
// import Transaction from './models/Transactions.js';
// import { dataTransaction, dataOverallStat, dataAffiliateStat } from './data/index.js';
// import OverallStat from './models/OverallStat.js';
// import AffiliateStat from './models/AffiliateStat.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}). then(() => {
    app.listen(PORT, () => {
        console.log(`listening to port:- ${PORT}`)
    })
    // only add data once
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
}).catch((error) => {
    `${error} did not connect.`
});
