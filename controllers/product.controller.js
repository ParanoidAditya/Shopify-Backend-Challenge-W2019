const Product = require('../models/schema').Product;

const controller = {};

controller.createSingle = function (req, res){
	Product.create({
		name: req.body.name,
		value: req.body.value,
		shopId: req.params.shop_id,
	}).then(function(product){
		product.createLine({
			value: product.value,
			productId: product.id
		});
		res.status = 201;
		res.json({'id':product.id});
	});
};

controller.getAll = function (req, res){
	Product.findAll({ attributes: ['id', 'name', 'value' ], 
		where: {shopId:  req.params.shop_id } }).then(function (products){
		res.json(products);
	});
};

controller.getSingle = function (req, res){
	Product.find({ attributes: ['id', 'name', 'value'], 
		where:{'id':req.params.product_id, 'shopId': req.params.shop_id}}).then(function(product){
		if (product == null) {
			res.statusCode = 404;
			res.json({'Error': 'Product not found'});
			return;
		}
		product.getLines({attributes:['id','value']}).then(function(lines){
			let temp = product.dataValues;
			temp.LineItem = [];
			lines.forEach(line => {
				temp.LineItem.push(line.dataValues);
			});
			res.json(temp);
		});
	});
};

controller.deleteSingle = function (req, res){
	Product.destroy({
		where: {
			'id': req.params.product_id
		}
	}).then( function(status) {
		if (status == 1) {
			res.json({'status':'deleted'});
			return;
		}
		res.statusCode = 404;
		res.json({'status': 'Product not found'});
	});
};

controller.putSingle = function (req, res){
	Product.find({where: {id:  req.params.product_id}}).then(function (product){
		if (product == null) {
			res.statusCode = 404;
			res.json({'Error': 'Product not found'});
			return;
		}
		product.getLines().then(function(lines){
			lines.forEach(line => {
				line.update({value: req.body.value});
			});
		});
		product.update({name: req.body.name, value: req.body.value});
		return controller.getSingle(req, res);
	});
};

module.exports = controller;