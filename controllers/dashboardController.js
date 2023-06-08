


exports.dashboardPages = (req,res)=>{
  const data = {
    title:"Dashboard Admin"
  }
  res.render('dashboard',{
    dashboardData : data
  });
};