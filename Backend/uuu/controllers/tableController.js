const Table = require('../models/Table');

const getTables = async (req, res) => {
  try {
      console.log("Fetching tables from DB..."); // Debugging
      const tables = await Table.find(); // Assuming Mongoose
      console.log("Tables found:", tables);
      res.status(200).json(tables);
  } catch (error) {
      console.error("Error fetching tables:", error);
      res.status(500).json({ message: "Server error" });
  }
};

const addTable = async (req, res) => {
  try {
    console.log("Received data:", req.body); // ✅ Debugging
    const { name, seats } = req.body;

    if (!name || !seats) {
      return res.status(400).json({ msg: "Name and seats are required" });
    }

    const table = new Table({ name, seats });
    await table.save();
    console.log("Table saved:", table); // ✅ Debugging

    res.json({ msg: "Table added successfully", table });
  } catch (err) {
    console.error("Error adding table:", err.message);
    res.status(500).send("Server error");
  }
};

const deleteTable = async (req, res) => {
  console.log('🟢 Delete request received for table ID:', req.params.id, 'User:', req.user);

  try {
    if (!req.params.id) {
      console.log('❌ No ID provided in request');
      return res.status(400).json({ msg: 'Invalid request: No ID provided' });
    }

    const table = await Table.findById(req.params.id);
    console.log('🔍 Table found:', table); // ✅ Log the table before deletion

    if (!table) {
      console.log('❌ Table not found in database');
      return res.status(404).json({ msg: 'Table not found' });
    }

    await Table.findByIdAndDelete(req.params.id);
    console.log('✅ Table deleted successfully:', req.params.id);
    res.json({ msg: 'Table deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting table:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { getTables, addTable, deleteTable }; // ✅ Correct export