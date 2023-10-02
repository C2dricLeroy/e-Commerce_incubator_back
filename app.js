const express = require('express');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./src/routes/userRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Spécifiez les méthodes autorisées
  res.header('Access-Control-Allow-Credentials', 'true'); // Si vous avez besoin de prendre en charge les cookies
  next();
});

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/category', categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
