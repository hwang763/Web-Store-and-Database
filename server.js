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
    purchase:Number
});
 var Item = mongoose.model("Item",itemSchema);
module.exports = Item; 

var userSchema = new Schema({
    email:String ,
    password:String,
    type:String,
    activation:String
    
});

var User = mongoose.model("User",userSchema);
module.exports=User;

var dmcaSchema = new Schema({
    type:String,
    descript:String
});

var DMCA = mongoose.model("DMCA",dmcaSchema);
module.exports=DMCA;

var disputeSchema = new Schema({
    type:String,
    descript:String,
    code:String,
    sender:String,
    sentTo:String
});

var Dispute = mongoose.model("Dispute",disputeSchema);
module.exports=Dispute;

var takedownSchema = new Schema({
    sendTo:String,
    signature:String,
    work:String,
    infringement:String,
    contact:String
});

var Takedown = mongoose.model("Takedown",takedownSchema);
module.exports=Takedown;

var commentSchema = new Schema({
    user:String,
    item:String,
    value:String,
    rating:Number,
    visible:String
});

var Comment = mongoose.model("Comment",commentSchema);
module.exports=Comment;

var listSchema = new Schema({
    user:String,
    name:String,
    descript:String,
    visible:String,
    fruits:[{fruit:String,quantity:String}]
});

var List = mongoose.model("List",listSchema);
module.exports=List;
// creating routes for the api


app.get('/api',function(req, res){
    res.json({ message: 'hooray! welcome to our api!' });	
});

// the following get and post are just general requests
app.post('/api/list',function(req, res) {
    List.create({
        user:req.body.user,
        name:req.body.name,
        descript:req.body.descript,
        visible:req.body.visible
    }).then(list=>{
        res.json(list);
        console.log(list);
    });
});

app.put('/api/list/:name',function(req, res) {
    var name = req.params.name;
    var submittedUser = req.body.user;
    List.findOne({"name":name,"user":submittedUser})
    .then(list=>{
        list.update({
            user:req.body.user,
            name:req.body.name,
            descript:req.body.descript,
            visible:req.body.visible
        })
        .then(list=>res.json(list));
    })
    .catch(err=>console.log(err));
});

app.put('/api/addtolist/:name',function(req, res) {
    var name=req.params.name;
    var user=req.body.user;
    var fruit = {"fruit":req.body.fruit,"quantity":req.body.quantity};
    List.findOne({"user":user,"name":name})
    .then(list=>{
        console.log(fruit);
        console.log(list);
        list.fruits.push(fruit);
        res.json(list);
    })
    .catch(err=>console.log(err));
});

app.put('/api/deleteFrom/:name',function(req, res) {
    var name=req.params.name;
    var user=req.body.user;
    List.findOne({"user":user,"name":name})
    .then(list=>{
        console.log(list);
        list.fruits.pull({"fruit":req.body.fruit});
        res.json(list);
    })
    .catch(err=>console.log(err));
});

app.get('/api/list/:user',function(req, res) {
    var listUser=req.params.user;
    List.find({user:listUser}).exec(function(err,list){
        if(!err){
            res.json(list);
            console.log(list);
        }
        else 
        console.log(err);
    });
    
    
});

app.get('/api/list',function(req, res) {
    List.find({'visible':"public"}).exec(function(err,list){
        if(!err){
            res.json(list);
        }
        else {
            console.log(err);
        }
    });
});

app.post('/api/deleteList/:name',function(req, res) {
    var name=req.params.name;
    var user=req.body.user;
    List.findOne({"name":name,"user":user})
    .then(list=>{
        list.remove().then(list=>res.json("deleted"));
    }).catch(err=>console.log(err));
});

app.post('/api/comment',function(req,res){
    Comment.create({
        user:req.body.user,
        item:req.body.item,
        value:req.body.value,
        rating:req.body.rating,
        visibility:"visible"
    }).then(comment=>{
        res.json(comment);
        console.log(comment);
    });
});

app.get('/api/comment/:item_name',function(req, res) {
    var selectedItem=req.params.item_name;
    Comment.find({item:selectedItem}).sort({rating:-1}).exec(function(err,comment){
        if (!err){
            res.json(comment);
        if(comment==[]){
            console.log("empty");
        }}
        else
            console.log(err);
    });
});

app.put('/api/comment/vis/:id',function(req, res) {
    var commentID=req.params.id;
    Comment.findOne({"_id":commentID})
    .then(comment=>{
        comment.update({
            visible:req.body.visible
        }).then(comment=>res.json(comment));
    }).catch(err=>console.log(err));
}); 

app.post('/api/Takedown',function(req,res){
    Takedown.create({
        sendTo:req.body.sendTo,
        signature:req.body.signature,
        work:req.body.work,
        infringement:req.body.infringement,
        contact:req.body.contact
    }).then(takedown=>{
        res.json(takedown);
        console.log(takedown);
    });
});

app.get('/api/Request/:notice_code',function(req, res) {
    var code = req.params.notice_code;
    Dispute.findOne({code})
    .then(dispute=>res.json(dispute))
    .catch(err=>console.log(err));
});

app.post('/api/Request',function(req,res){
    Dispute.create({
        type:req.body.type,
        descript:req.body.descript,
        code:req.body.code,
        sender:req.body.sender,
        sentTo:req.body.sentTo
    }).then(dispute=>{
        res.json(dispute);
        console.log(dispute);
    });
});

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
    Item.find().sort({purchase:-1}).exec(function(err,item){
        if (!err)
            res.json(item);
        else
            console.log(err);
    });
});

app.post('/api/items',function(req,res,next){
    Item.create({
        name : req.body.name,
        descript :req.body.descript,
        quantity:req.body.quantity,
        price: req.body.price,
        tax: req.body.tax,
        purchase:req.body.purchase
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