const Shop = require('../models/schema').Shop;


const controller = {};

controller.getAll = function(req, res){
	Shop.findAll({attributes: ['id', 'name']}).then(function (shops){
		res.json(shops);
	});
};

controller.getSingle = function(req, res){
	Shop.findById(req.params.shop_id,{attributes: ['id', 'name', 'plan']}).then(function (shop){
		if (shop == null) {
			res.statusCode = 404;
			res.json({'status': 'Shop not found'});
			return;
		}
		res.json(shop);
	});
};

controller.deleteSingle = function(req, res){
	Shop.destroy({
		where: {
			'id': req.params.shop_id
		}
	}).then( function(status) {
		if (status == 1) {
			res.json({'status':'deleted'});
			return;
		}
		res.statusCode = 404;
		res.json({'status': 'Shop not found'});
	});
};

controller.createSingle = function(req, res){
	Shop.create({name: req.body.name, plan:req.body.plan}).then(function(shop){
		res.statusCode = 201;
		res.json({'id':shop.id});
	});
};

controller.putSingle = function(req, res){
	Shop.update(
		{name: req.body.name, plan: req.body.plan},
		{where: {id: req.params.shop_id} }
	).then(function(status) {
		if (status == 1) 
			return controller.getSingle(req, res);
		res.statusCode = 404;
		res.json({'status': 'Shop not found'});
	});
};

controller.exists = function (shop_id){
	return Shop.findById(shop_id);
};

module.exports = controller;