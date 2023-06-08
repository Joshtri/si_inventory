const express = require ("express");
const serveFavicon = require ("serve-favicon");
const path = require ("path");
const ejs = require  ('ejs');

const loginRoutes = require  ('./routes/login.js');
const adminRoutes = require  ('./routes/admin.js');
const dashboardRoutes = require('./routes/dashboard.js');


//import database from utils.
const db = require("./utils/database.js").connect;

const app = express();
const PORT = process.env.PORT || 3000;

// const __dirname = path.resolve();

// Connect to the database
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(serveFavicon(path.join(__dirname + '/public/favicon.png')));

// app.set('views',[
//     __dirname + '/views',
//     __dirname + '/views/update'
// ]);

app.set('views',[
  path.join(__dirname, '/views'),
  path.join(__dirname, '/views/update'),
  path.join(__dirname, '/views/data'),
  path.join(__dirname, '/views/add')
]);

// inisialisasi routes. 
app.use('/', loginRoutes,dashboardRoutes);
app.use('/data', adminRoutes);

  
app.listen(PORT,()=>{
    console.log("Server start on port :" + PORT);
});