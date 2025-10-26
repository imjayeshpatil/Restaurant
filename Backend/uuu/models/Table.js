const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: { type: Number, required: true },
});

module.exports = mongoose.model('Table', TableSchema);