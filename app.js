const express = require('express');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./src/routes/userRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const cartItemRoutes = require('./src/routes/cartItemRoutes');

const app = express();
const port = 3005;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

/* app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 86400,
  },
})); */

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/cartItem', cartItemRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
