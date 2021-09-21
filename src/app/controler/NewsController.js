class NewsController{
    index(rep, res){
    // get /new
     res.render('news');
    }


   show(rep, res){
       res.send('NEWS DETAIL!!!')
   }
}
module.exports=new NewsController;

