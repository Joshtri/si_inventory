const mysql = require ("mysql");

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_inventorySMA1'
  });


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed. Reconnecting...');
    connect();
  } else {
    throw err;
  }
});

module.exports = db;

