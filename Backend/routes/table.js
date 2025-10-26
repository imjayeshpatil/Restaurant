const express = require('express');
const router = express.Router();
const { getTables, addTable, deleteTable } = require('../controllers/tableController');
const authMiddleware = require('../middleware/auth');

// Public route to get tables
router.get('/', getTables);

// Admin-only route to add table
router.post('/', authMiddleware, addTable);

// ✅ Add this DELETE route
router.delete('/:id', authMiddleware, deleteTable);

module.exports = router;
