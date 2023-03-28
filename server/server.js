const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { updateParcel, addParcel, deleteParcel } = require('./lib/parcel');
const { addList, getAllLists, deleteList } = require('./lib/list');
const { createEmployee, getEmployeeByName } = require('./lib/employee');

const app = express();
dotenv.config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((error) => {
  console.log('Error al conectarse a MongoDB:', error);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.get('/', (req, res) => {
  res.send('API online');
});

// Rutas para el controlador de listas
app.post('/employees', createEmployee); // Crea un nuevo empleado
app.get('/employees/:employeeName', getEmployeeByName); // Obtiene un empleado por el nombre
app.post('/employees/:employeeName/lists', addList); // Crea una nueva lista para el empleado con ID employeeName

app.get('/employees/:employeeName/lists', getAllLists); // Obtiene todas las listas para el empleado con ID employeeName
app.delete('/employees/:employeeName/lists/:listId', deleteList); // Elimina la lista con ID listId del empleado con ID employeeName

// Rutas para el controlador de paquetes
app.post('/employees/:employeeName/lists/:listId/parcels', addParcel); // Agrega un nuevo paquete a la lista con ID listId del empleado con ID employeeName
app.patch('/employees/:employeeName/lists/:listId/parcels/:parcelId', updateParcel); // Actualiza el paquete con ID parcelId en la lista con ID listId del empleado con ID employeeName
app.delete('/employees/:employeeName/lists/:listId/parcels/:parcelId', deleteParcel); // Elimina el paquete con ID parcelId de la lista con ID listId del empleado con ID employeeName


// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server run on ${port}`);
});

