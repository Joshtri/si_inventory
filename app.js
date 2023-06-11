const express = require ("express");
const serveFavicon = require ("serve-favicon");
const path = require ("path");
const ejs = require  ('ejs');
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session');

const loginRoutes = require  ('./routes/login.js');
const adminRoutes = require  ('./routes/admin.js');
const dashboardRoutes = require('./routes/dashboard.js');
const kategoriRoutes = require('./routes/kategori.js');
const produkRoutes = require('./routes/produk.js');


//import database from utils.
const db = require("./utils/database.js").connect;

const app = express();
const PORT = process.env.PORT || 3000;

// const __dirname = path.resolve();

// Middleware session
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 440000 } // Session expires in 1 minute (adjust as needed)
}));


// Menambahkan library utk log request😭😭😭
app.use(morgan('tiny'));

app.use(cors());
 
// Menambahkan middleware body-parser pada aplikasi
app.use(bodyparser.json());
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))


// Connect to the database
app.set('view engine', 'ejs');
app.use(express.json());
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
app.use('/data', adminRoutes, kategoriRoutes, produkRoutes);

  
app.listen(PORT,()=>{
    console.log("Server start on port :" + PORT);
});