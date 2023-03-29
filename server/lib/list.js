const Employee = require("../models/Employee");

const addList = async (req, res) => {

  try {
    const { employeeName } = req.params;

    const employee = await Employee.findOne({ name: employeeName });
    employee.lists.push(req.body)

    await employee.save();
    res.status(200).json(JSON.stringify(employee));
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
    const { employeeName, listId } = req.params;
    // Buscar al empleado por ID y eliminar el objeto listSchema con el nombre proporcionado
    const employee = await Employee.findOne({ name: employeeName });
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    employee.lists = employee.lists.filter((l) => l._id.toString() !== listId)
    await employee.save()
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el objeto listSchema del array lists del empleado' });
  }
};

module.exports = { addList, getAllLists, deleteList };
