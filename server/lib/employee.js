const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
  try {
    const { name } = req.body;

    // Comprobar si ya existe un empleado con el mismo nombre
    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Ya existe un empleado con este nombre' });
    }

    // Crear un nuevo empleado
    const employee = new Employee({ name });
    employee.lists = [];
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el empleado' });
  }
};


const getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const employee = await Employee.findOne({ name }).populate('lists.parcels');
    if (!employee) {
      return res.status(404).json({ message: 'Employeed not found or not exists' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error on get employee by name' });
  }
};


module.exports = {
  createEmployee,
  getEmployeeByName
}