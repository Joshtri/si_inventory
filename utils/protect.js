// Middleware proteksi
const protect = (req, res, next) => {
  if (req.session.userData) {
    // Pengguna sudah login, lanjutkan ke halaman yang diminta
    next();
  } else {
    // Pengguna belum login, redirect ke halaman login
    res.redirect('/login');
  }
};


module.exports = {
  protect
}