const db = require('../utils/database');
const util = require('util');

const query = util.promisify(db.query).bind(db);

const fetchData = async () => {
  try {
    const [totalAdminResult, totalProdukResult] = await Promise.all([
      query("SELECT COUNT(*) as adminCount FROM admin"),
      query("SELECT COUNT(*) as produkCount FROM produk")
    ]);

    const adminCount = totalAdminResult[0].adminCount;
    const produkCount = totalProdukResult[0].produkCount;
    // const ipdnCount = ipdnResult[0].ipdnCount;
    // const polriCount = polriResult[0].polriCount;


    return {adminCount, produkCount};
  } catch (error) {
    throw error;
  }
};


exports.dashboardPages = async(req,res)=>{
  const data = {
    title:"Dashboard Admin"
  }



  const {
    adminCount, produkCount
  } = await fetchData();

  const { username } = req.session.userData;

  res.render('dashboard',{
    dashboardData : data,
    adminCount,
    produkCount,
    username
  });
};


exports.logout = (req,res)=>{
    // Hapus data pengguna dari sesi
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
}

exports.myProfilePages = (req,res)=>{
  const data = {
    title : "Profile View"
  };

  const {userData} = req.session;

  // Mengambil data pengguna dari basis data berdasarkan username
  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, userData.username, (err, result) => {
    if (err) {
      throw err;
    }

    // Merender tampilan profil dengan data pengguna
    res.render("profil_akun", {
      profileData: result[0]
    });
  });
}