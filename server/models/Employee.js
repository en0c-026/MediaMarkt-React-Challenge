// List.js
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  parcelId: {
    type: String,
    required: true,
  }, 
  employeeName: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  carrierId: {
    type: String,
    required: false,
  }
});

const listSchema = new mongoose.Schema({
  parcels: [parcelSchema],
  name: {
    type: String,
    required: true,
  }
});

const employeeSchema = new mongoose.Schema({
  lists: [listSchema],
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Employee = mongoose.model('EmployeeSchema', employeeSchema);

module.exports = Employee;
