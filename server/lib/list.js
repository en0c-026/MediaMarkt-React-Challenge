const Employee = require("../models/Employee");

const addList = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { name } = req.body;

    // Crear un nuevo objeto listSchema con el nombre proporcionado y una matriz vacía de paquetes
    const newList = {
      parcels: [],
      name,
    };

    // Buscar al empleado por ID y agregar el nuevo objeto listSchema al array lists
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $push: { lists: newList } },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear un nuevo objeto listSchema y agregarlo al array lists del empleado' });
  }
};

const getAllLists = async (req, res) => {
  try {
    const { employeeId } = req.params;
    // Buscar al empleado por ID y devolver el array lists
    const employee = await Employee.findById(employeeId);
    const lists = employee.lists;

    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el array lists del empleado' });
  }
};

const deleteList = async (req, res) => {
  try {
    const { employeeId, listName } = req.params;
    // Buscar al empleado por ID y eliminar el objeto listSchema con el nombre proporcionado
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $pull: { lists: { name: listName } } },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el objeto listSchema del array lists del empleado' });
  }
};

module.exports = { addList, getAllLists, deleteList };
