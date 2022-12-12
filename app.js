const express = require('express');
const dotenv = require('dotenv');

const initiateDBConnection = require('./Config/db');

const authRouter = require('./routes/auth')
const orderRouter = require('./routes/orders')
const restaurantRouter = require('./routes/restaurants')
const reviewRouter = require('./routes/reviews')
const userRouter = require('./routes/user')

dotenv.config({
    path: './config/.env'
  });

  const PORT = process.env.PORT;
  const app = express();
  
  app.use(express.json());

  app.use(cors())

  app.use('/auth', authRouter);
  app.use('/order', orderRouter);
  app.use('/restaurants', restaurantRouter);
  app.use('/review', reviewRouter);
  app.use('/user', userRouter);




  app.listen(PORT, async () => {
    console.log(`Server has been started and is listening to port ${PORT}`);
    await initiateDBConnection();
  });