import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTables = () => {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState('');
  const [seats, setSeats] = useState(1);
  const [editTableId, setEditTableId] = useState(null);

  // Fetch tables on component mount
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get('/api/table');
      setTables(res.data);
    } catch (err) {
      console.error('Error fetching tables:', err);
    }
  };

  const handleAddOrUpdateTable = async (e) => {
    e.preventDefault();
    try {
      if (editTableId) {
        // Update existing table
        await axios.put(`/api/table/${editTableId}`, { name: tableName, seats });
        alert('Table updated successfully');
      } else {
        // Add new table
        await axios.post('/api/table', { name: tableName, seats });
        alert('Table added successfully');
      }
      setTableName('');
      setSeats(1);
      setEditTableId(null);
      fetchTables(); // Refresh table list
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (table) => {
    setTableName(table.name);
    setSeats(table.seats);
    setEditTableId(table._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await axios.delete(`/api/table/${id}`);
        alert('Table deleted successfully');
        fetchTables(); // Refresh table list
      } catch (err) {
        console.error('Error deleting table:', err);
      }
    }
  };

  return (
    <div>
      <h2>Manage Tables</h2>
      
      <form onSubmit={handleAddOrUpdateTable}>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          required
        />
        <button type="submit">{editTableId ? 'Update Table' : 'Add Table'}</button>
      </form>

      <h3>Existing Tables</h3>
      <ul>
        {tables.map((table) => (
          <li key={table._id}>
            {table.name} - {table.seats} Seats
            <button onClick={() => handleEdit(table)}>Edit</button>
            <button onClick={() => handleDelete(table._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTables;
