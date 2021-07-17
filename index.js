const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cookieParser=require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/auth');
const car = require('./routes/car');
const company = require('./routes/company');

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use('/car',car);
app.use('/company',company);
app.use('/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    }
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
});
