class SiteController{
    home(rep, res){
    // get /home
     res.render('home')
    }


   search(rep, res){
    //    get /search
       res.render('seach')
   }
}
module.exports=new SiteController;

