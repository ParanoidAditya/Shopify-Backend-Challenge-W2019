// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
	require('@google-cloud/trace-agent').start();
	require('@google-cloud/debug-agent').start();
}
  
const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	shopRouter = require('./routes/shop.route'),
	productRouter = require('./routes/product.route'),
	orderRouter = require ('./routes/order.route'),
	shopController = require('./controllers/shop.controller'),
	config = require('./core/config'),
	db = require('./models/schema').db,
	seed = require('./core/seed'),
	logging = require('./core/logging');  
  
db.sync(config.dbOptions).then(() =>{
	console.log('Synced with DB');
	if (config.dbSeed) seed();
});

const port = config.serverPort;
const app = express();
app.use(logging.requestLogger);

// Trust ingress-nginx
app.set('trust proxy', true);
app.use(cors());

// Only allow POSTing JSON
app.use(bodyParser.json({
	type: function() {
		return true;
	}
}));

// Pretty print JSON in responses
app.set('json spaces', 2);

// Let K8s know we alive
app.get('/healthz', function (req, res){
	res.json('Hello World');
});

app.use('/rest/v1/shop', shopRouter);

// Middleware to check if a shop exists 
app.use('/rest/v1/shop/:shop_id/', function (req, res, next) {
	shopController.exists(req.params.shop_id).then( function(data){
		if (data == null) {
			res.statusCode = 404;
			res.json({'Error': 'Shop not found'});
		}
		if (data != null ){
			next();
		}
	});
	
});

app.use('/rest/v1/shop/:shop_id/product', productRouter);
app.use('/rest/v1/shop/:shop_id/order', orderRouter);

// Handle 404
app.use(function(req, res) {
	res.status(404).json('404: resource not Found');
});

// Handle invalid json POST(s)
app.use(function(error, req, res, next) {
	if (error.type == 'entity.parse.failed'){
		res.status(400).json('Bad Request');
	}else{
		next();
	}
});
 
// Handle 500
app.use(function(error, req, res, next) {
	res.status(500).json('500: Internal Server Error');
});

app.listen(port, function (){
	console.log('server started - http://localhost:' + port);
});