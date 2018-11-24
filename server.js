// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();



// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = 8081; // SET UP A PORT< MIGHT HAVE TO BE ADAPTIVE

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears'); // SET UP A DIFFERENT DATABASE 

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
    quantity:Number,
    price:Number,
    tax:Number
});
 var Item = mongoose.model("Item",itemSchema);
module.exports = Item; 

// creating routes for the api

app.get('/api',function(req, res){
    res.json({ message: 'hooray! welcome to our api!' });	
});

// the following get and post are just general requests

app.get('/api/items',function(req,res){
    console.log('getting activities');
    Item.find({}).then(eachOne=>{
        res.json(eachOne)
    });
});

app.post('/api/items',function(req,res){
    Item.create({
        name : req.body.name,
        price: req.body.price,
        tax: req.body.tax
    }).then(item=>{
        res.json(item)
    }); 
});

// the following requests are for specific IDs

app.get('/api/items/:item_name',function(req,res){
    var name = req.params.item_name;
    Item.findOne({name})
    .then(item=>res.json(item));
     
});

app.put('/api/items/:item_id',function(req,res){
    Item.findById(req.params.item_id, function(err, item) {

			if (err)
				res.send(err);

			item.quantity = req.body.quantity;
			item.tax = req.body.tax;
			item.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Item updated!' });
			});

		});
});

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