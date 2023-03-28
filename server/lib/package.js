const Employee = require("../models/Employee");

const addPackage = async (req, res) => {
  try {
    const employee = await Employee.findOne({ name: req.params.employeeId });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const list = employee.lists.find((l) => l._id.toString() === req.params.listId);
    if (!list) {
      return res.status(404).send('List not found');
    }

    const newPackage = {
      packageId: req.body.packageId,
      carrier: req.body.carrier,
      employeeId: employee._id,
      delivered: req.body.delivered || false,
      deliveryDriver: req.body.deliveryDriver,
    };

    list.packages.push(newPackage);

    await employee.save();

    return res.status(201).json(newPackage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updatePackage = async (req, res) => {
  try {
    const { employeeId, listId, packageId } = req.params;
    const { packageData } = req.body;

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
    const packageIndex = list.packages.findIndex(pkg => pkg.packageId === packageId);

    if (packageIndex === -1) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }

    // Actualizar el paquete con los nuevos datos
    list.packages[packageIndex] = packageData;

    // Guardar los cambios en la base de datos
    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { employeeId, listId, packageId } = req.params;

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
    list.packages = list.packages.filter(pkg => pkg.packageId !== packageId);

    // Guardar los cambios en la base de datos
    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  addPackage,
  updatePackage,
  deletePackage
};
