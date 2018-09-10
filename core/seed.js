const Shop = require('../models/schema').Shop;

module.exports = function (){
	console.log('Seeding DB');
	Shop.create({
		name: 'My first Store',
		plan: 'basic'
	}).then(function (shop){
		shop.createProduct({
			name: 'Sample Product',
			value: 399.99,
		}).then(function (product){
			product.createLine({
				value: product.value
			});
		});
		shop.createOrder({
			value: 799.98
		}).then(function (order){
			order.createLine({
				name: 'Sample Product',
				value: 399.99,
				quantity: 2
			});
		});
	});	
	console.log('Seeded DB');
};