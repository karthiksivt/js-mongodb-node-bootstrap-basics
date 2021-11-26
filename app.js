const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const app = express();
const port = 5000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/practiceform');
}


// Define Mangoose Schema 

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    
  });

const Formapp = mongoose.model('Formapp', formSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// This is to render html files through node js 
// after this code you need to install    : npm install ejs 
app.engine('html', require('ejs').renderFile);


// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.html', params);
})

app.post('/', (req, res)=>{
    var myData = new Formapp(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the databse")
    });

})


// START THE SERVER
app.listen(port, ()=>{
    console.log('The application started successfully on port ${port}');
});