var express= require('express');

var path=require('path');
var bodyParser=require('body-parser');
var cons =require('consolidate');
var dust=require('dustjs-helpers');
var pg=require('pg');
var pool = new pg.Pool();
var app1=express();


// db connecting string
var connectst = "postgres://vp:201552055@localhost:5432/recipedb";
app1.engine('dust',cons.dust);

app1.set('view engine', 'dust');
app1.set('views',__dirname+ '/views');


 app1.use(express.static(path.join(__dirname, 'public')));
 
 app1.use(bodyParser.json());
 app1.use(bodyParser.urlencoded({ extended: false}));


app1.get('/',function (req,res) {
	//console.log('test');
	// body...

	pool.connect(connectst, function(err,client, done) {
		if(err)
		{
			return console.error('error fetching client',err);

		}
		pool.query('SELECT * FROM recipes', function (err,result) {
			if (err) {
				
				return console.error('error running query',err);
			}
			// body...
			res.render('index', {recipes: result.rows});
			
			 
			done();
		});
		// body...
	});
	
});

app1.listen(3000, function() {
	console.log('at 3000');
	// body...
});

