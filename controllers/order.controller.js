const Order = require('../models/schema').Order;
const LineItem = require('../models/schema').LineItem;


const controller = {};

controller.getAll = function(req, res) {
	Order.findAll({attributes: ['id', 'value'], where: {shopId: req.params.shop_id}}).then(function (orders){
		res.json(orders);
	});
};

controller.getSingle = function(req, res) {
	Order.find({ attributes: ['id', 'value', 'createdAt', 'updatedAt'],
		where:{'id':req.params.order_id, 'shopId': req.params.shop_id}}).then(function(order){
		if (order == null) {
			res.statusCode = 404;
			res.json({'Error': 'order not found'});
			return;
		}
		order.getLines({attributes:['id','value','name','quantity']}).then(function(lines){
			let temp = order.dataValues;
			temp.LineItem = [];
			lines.forEach(line => {
				temp.LineItem.push(line.dataValues);
			});
			res.json(temp);
		});
	});
};

controller.deleteSingle = function(req, res) {
	Order.destroy({
		where: {
			'id': req.params.order_id
		}
	}).then( function(status) {
		if (status == 1) {
			res.json({'status':'deleted'});
			return;
		}
		res.statusCode = 404;
		res.json({'status': 'Order not found'});
	});
};

controller.createSingle = function(req, res) {
	let lineItems = [];
	let total = 0;
	req.body.items.forEach(function(item){
		LineItem.find({where:{'productId': item.product_id}}).then(function(line){
			let temp = {};
			temp.value = line.value;
			temp.quantity = item.quantity;
			temp.name = item.name;
			total = total + (line.value * temp.quantity);
			lineItems.push(temp);
		});
	});
	Order.create({
		value: total,
		shopId: req.params.shop_id
	}).then(function (order){
		if (order.value != total){
			order.update({value: total}).then(function(){
			});
		}
		lineItems.forEach(function(lineItem){
			order.createLine({
				name: lineItem.name,
				value: lineItem.value,
				quantity: lineItem.quantity
			});
		});
		res.statusCode = 201;
		res.json({'id': order.id});
	});
};

controller.putSingle = function(req, res) {
	res.send('not implemented');
};
module.exports = controller;
