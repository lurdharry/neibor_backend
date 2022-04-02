exports.home = async (req,res) =>{
    res.render('client/home',{layout:'layout/main'})
}