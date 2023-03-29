const Employee = require("../models/Employee");

const addParcel = async (req, res) => {
  try {
    const employee = await Employee.findOne({ name: req.body.employeeName });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const list = employee.lists.find((l) => l._id.toString() === req.params.listId);
    if (!list) {
      return res.status(404).send('List not found');
    }

    list.parcels.push(req.body);

    await employee.save();

    return res.status(201).json(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateParcel = async (req, res) => {
  try {
    const { employeeName, listId, parcelId } = req.params;

    // Buscar el empleado por nombre
    const employee = await Employee.findOne({ name: employeeName });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Buscar la lista por id
    const list = employee.lists.find((l) => l._id.toString() === listId);

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    // Buscar el paquete por id
    const parcelIndex = list.parcels.findIndex(pkg => pkg.parcelId === parcelId);

    if (parcelIndex === -1) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }

    // Actualizar el paquete con los nuevos datos
    list.parcels[parcelIndex] = req.body;

    // Guardar los cambios en la base de datos
    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const deleteParcel = async (req, res) => {
  try {
    const { employeeName, listId, parcelId } = req.params;

    // Buscar el empleado por nombre
    const employee = await Employee.findOne({ name: employeeName });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Buscar la lista por id
    const list = employee.lists.find((l) => l._id.toString() === listId);


    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    // Eliminar el paquete por id
    list.parcels = list.parcels.filter(pkg => pkg.parcelId !== parcelId);

    // Guardar los cambios en la base de datos
    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  addParcel,
  updateParcel,
  deleteParcel
};
