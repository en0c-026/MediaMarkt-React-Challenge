// List.js
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  parcelId: {
    type: String,
    required: true,
    unique: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  deliveryDriver: {
    name: String,
    licensePlate: String,
    signature: {
      data: Buffer,
      contentType: String,
    },
  },
});

const listSchema = new mongoose.Schema({
  parcels: [parcelSchema],
  name: {
    type: String,
    required: true,
    unique: true
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
