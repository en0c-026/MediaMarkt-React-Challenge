const Employee = require("../models/Employee");

const addParcel = async (req, res) => {
  try {
    const employee = await Employee.findOne({ name: req.params.employeeId });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const list = employee.lists.find((l) => l._id.toString() === req.params.listId);
    if (!list) {
      return res.status(404).send('List not found');
    }

    const newParcel = {
      parcelId: req.body.parcelId,
      carrier: req.body.carrier,
      employeeId: employee._id,
      delivered: req.body.delivered || false,
      deliveryDriver: req.body.deliveryDriver,
    };

    list.parcels.push(newParcel);

    await employee.save();

    return res.status(201).json(newParcel);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateParcel = async (req, res) => {
  try {
    const { employeeId, listId, parcelId } = req.params;
    const { parcelData } = req.body;

    // Buscar el empleado por nombre
    const employee = await Employee.findOne({ name: employeeId });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Buscar la lista por id
    const list = employee.lists.id(listId);

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    // Buscar el paquete por id
    const parcelIndex = list.parcels.findIndex(pkg => pkg.parcelId === parcelId);

    if (parcelIndex === -1) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }

    // Actualizar el paquete con los nuevos datos
    list.parcels[parcelIndex] = parcelData;

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
    const { employeeId, listId, parcelId } = req.params;

    // Buscar el empleado por nombre
    const employee = await Employee.findOne({ name: employeeId });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // Buscar la lista por id
    const list = employee.lists.id(listId);

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
