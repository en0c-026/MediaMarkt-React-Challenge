const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { updatePackage, addPackage, deletePackage } = require('./lib/package');
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
  res.send('API funcionando');
});

// Rutas para el controlador de listas
app.post('/employees', createEmployee); // Crea un nuevo empleado
app.get('/employees/:name', getEmployeeByName); // Obtiene un empleado por el nombre
app.post('/employees/:employeeId/lists', addList); // Crea una nueva lista para el empleado con ID employeeId

app.get('/employees/:employeeId/lists', getAllLists); // Obtiene todas las listas para el empleado con ID employeeId
app.delete('/employees/:employeeId/lists/:listId', deleteList); // Elimina la lista con ID listId del empleado con ID employeeId

// Rutas para el controlador de paquetes
app.post('/employees/:employeeId/lists/:listId/packages', addPackage); // Agrega un nuevo paquete a la lista con ID listId del empleado con ID employeeId
app.patch('/employees/:employeeId/lists/:listId/packages/:packageId', updatePackage); // Actualiza el paquete con ID packageId en la lista con ID listId del empleado con ID employeeId
app.delete('/employees/:employeeId/lists/:listId/packages/:packageId', deletePackage); // Elimina el paquete con ID packageId de la lista con ID listId del empleado con ID employeeId


// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

