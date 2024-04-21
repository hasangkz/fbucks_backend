// nodemon ile calistirmak istedigmiz zaman artik 'npm run server' komutunu calistirmamiz yeter

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');
const logger = require('morgan');
const app = express();

const categoryRoute = require('./routes/categories.js');
const productRoute = require('./routes/products.js');
const billRoute = require('./routes/bills.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
dotenv.config();

const portNumber = process.env.PORT || 5005;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongoose has been connected!');
  } catch (error) {
    throw new Error('Error Mongoose!');
  }
};

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
//middlewares
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://fbucks-frontend.onrender.com'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(logger('dev'));
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/bills', billRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  return res.send('hasangkz');
});

app.listen(portNumber, () => {
  connect();
  console.log('server is listening for: ', portNumber);
});
