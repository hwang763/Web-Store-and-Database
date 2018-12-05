// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app        = express();


// use it before all route definitions
app.use(cors({origin: '*'}));


// configure body parser
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port= 8082; // SET UP A PORT< MIGHT HAVE TO BE ADAPTIVE

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/items'); // SET UP A DIFFERENT DATABASE 

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

//app.use (express.static('Test'));

let Schema = mongoose.Schema;

var itemSchema = new Schema ({
    name:String,
    descript:String,
    quantity:Number,
    price:Number,
    tax:Number,
    

    
});
 var Item = mongoose.model("Item",itemSchema);
module.exports = Item; 

var userSchema = new Schema({
    email:String ,
    password:String,
    type:String,
    activation:String
    
})

var User = mongoose.model("User",userSchema);
module.exports=User;

var dmcaSchema = new Schema({
    type:String,
    descript:String
})

var DMCA = mongoose.model("DMCA",dmcaSchema);
module.exports=DMCA;

var disputeSchema = new Schema({
    type:String,
    decript:String
})

var Dispute = mongoose.model("Dispute",disputeSchema);
module.exports=Dispute;
// creating routes for the api


app.get('/api',function(req, res){
    res.json({ message: 'hooray! welcome to our api!' });	
});

// the following get and post are just general requests
app.get('/api/DMCA/:notice_type',function(req, res) {
    var type = req.params.notice_type;
    DMCA.findOne({type})
    .then(dmca=>res.json(dmca))
    .catch(err=>console.log(err));
});

app.post('/api/DMCA',function(req,res){
    DMCA.create({
        type:req.body.type,
        descript:req.body.descript
    }).then(dmca=>{
        res.json(dmca);
        console.log(dmca);
    });
});

app.put('/api/DMCA/:notice_type',function(req,res){
    var type=req.params.notice_type;
    DMCA.findOne({type})
    .then(dmca => {
        dmca.update({
            descript:req.body.descript
        })
        .then(user => res.json(user));
    })
    .catch(err => console.log(err));
});

app.get('/api/items',cors(),function(req,res,next){
    console.log('getting activities');
    Item.find({}).then(eachOne=>{
        res.json(eachOne)
    });
});

app.post('/api/items',function(req,res,next){
    Item.create({
        name : req.body.name,
        descript :req.body.descript,
        quantity:req.body.quantity,
        price: req.body.price,
        tax: req.body.tax
    }).then(item=>{
        res.json(item)
        console.log(item);
    }); 
});

// the following requests are for specific IDs

app.post('/api/login',function(req,res){
    var tempEmail=req.body.email;
    User.count({'email':tempEmail},function(err,count){
        if (err)
            console.log(err);
        if (count>0){
            res.json("exists");
        }
        else if (count==0){
            User.create({
        email : req.body.email,
        password : req.body.password,
        type:req.body.type,
        activation:req.body.activation
        }).then (user=>{
        res.json(user);
        console.log(user);
         });
        }
    });
});
app.route('/api/login/verification').post((req, res)=>{
    var email = req.body.email;
    var userPassword = req.body.password;
    User.findOne({email})
    .then(user=>{
        if (user.password!=userPassword){
            res.json("incorrect");
        }
        else if (user.activation=="inactive"){
            res.json("deactivated");
        }
        else{
            if(user.type=="user"){
                res.json("user");
            }
            else if (user.type=="manager"){
                res.json("manager");
            }
        }
    })
    .catch(err=>{
        console.log(err);
        res.json("no match");
    });
});
app.route('/api/login/:email').put((req,res)=>{
    const email = req.params.email;
    User.findOne({email})
    .then(user => {
        user.update({
            activation: req.body.activation,
            type: req.body.type
        })
        .then(user => res.json(user))
    })
    .catch(err => console.log(err));
});

app.get('/api/items/:item_name',function(req,res){
    var name = req.params.item_name;
    Item.findOne({name})
    .then(item=>res.json(item));
     
});

app.put('/api/items/:item_name',function(req,res){
    const name = req.params.item_name;
    Item.findOne({name})
    .then(item => {
        item.update({
            name : req.body.name,
            descript:req.body.descript,
            quantity: req.body.quantity,
            price:req.body.price,
            tax:req.body.tax
        })
        .then(item=>res.json(item))
    })
    .catch(err=>console.log(err));
});

app.put('/api/purchase/:item_name'),function(req,res){
    const name = req.params.item_name;
    Item.findOne({name})
    .then(item=>{
        item.update({
            count: req.body.count
        
        })
        .then(item => res.json(item))
    })
    .catch(err => res.json(err));
};

app.delete('/api/items/:item_name',function(req,res){
    	var name = req.params.item_name;
    Item.findOne({name})
    .then (item=> {
        item.remove().then( ()=>res.json("Item deleted"))
    });
});


//starting our server 
app.listen(port);
console.log('Magic happens on port ' + port);