const Sequelize = require('sequelize');
const config = require('../core/config');

const db = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
	dialect: 'mysql',
	host: config.dbHost,
	port: config.dbPort,
	logging: false,
});

const ShopModel = db.define('shop', {
	name: { type: Sequelize.STRING },
	plan: { type: Sequelize.STRING }
});

const ProductModel = db.define('product', {
	name: { type: Sequelize.STRING },
	value: { type: Sequelize.DOUBLE({ decimals: 2 }) },
});

const OrderModel = db.define('order', {
	value: { type: Sequelize.DOUBLE({ decimals: 2 }) },
});

const LineItemModel = db.define('line', {
	name: { type: Sequelize.STRING },
	value: { type: Sequelize.DOUBLE({ decimals: 2 }) },
	quantity: { type: Sequelize.INTEGER },
});

ShopModel.hasMany(ProductModel);
ShopModel.hasMany(OrderModel);
ProductModel.hasMany(LineItemModel);
OrderModel.hasMany(LineItemModel);
 
const LineItem = db.models.line;
const Shop = db.models.shop;
const Product = db.models.product;
const Order = db.models.order;

module.exports = {
	Shop, Product, Order, LineItem, db
};
