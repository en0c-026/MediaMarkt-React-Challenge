const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrierSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  companyName: { type: String, required: true },
  driver: { type: String, required: true },
  licensePlate: { type: String, required: true },
  centerAdress: { type: String, required: true }
});

const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
