const path = require('path')
const express= require('express')
const morgan = require('morgan')
const handlebars =require('express-handlebars')
const { dirname } = require('path')
const app = express()
const port = 3000

const route=require('./routes');

 app.use(express.static(path.join(__dirname,'public')))
// console.log("PATH", path.join(__dirname, 'public'))
 
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
// xu ly from submit
app.use(morgan('combined'))
// templete engie
           app.engine('hbs',handlebars({
  extname: '.hbs'
}))
app.set('view engine','hbs')
// set view handlebar
app.set('views',path.join(__dirname,'resources/views'))
// console.log('PATH:', path.join(__dirname,'resources/views'))

// tao route duong dan
 route(app);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// hello world