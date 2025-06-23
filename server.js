const express = require('express');
const connectDB = require('./config/db');
const productoRoutes = require('./routes/ProductoRoutes');
const carritoRoutes = require('./routes/CarritoRoutes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Configurar motor de plantillas: express-handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Rutas API
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);

// Ruta web principal (productos)
const Producto = require('./models/Producto');
app.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.render('productos', { productos });
});

// Ruta vista del carrito (solo mock para simular)
app.get('/carrito', async (req, res) => {
  const productos = await Producto.find().lean();
  res.render('carrito', { productos });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/admin', async (req, res) => {
  const productos = await Producto.find();
  res.render('admin', { productos });
});

