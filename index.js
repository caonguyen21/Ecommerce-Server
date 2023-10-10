const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const ordersRoute = require('./routes/orders');
const cartRoute = require('./routes/cart');

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Corrected product route definition
app.use('/api/products', productRoute);
// Auth route
app.use('/api/', authRoute);
// User route
app.use('/api/users', userRoute);
// Orders route
app.use('/api/orders', ordersRoute);
// Cart route
app.use('/api/cart', cartRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
