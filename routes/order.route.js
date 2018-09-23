const orderRouter = require('express').Router({ mergeParams: true }); 
const orderController = require('../controllers/order.controller');

/**
 * @api {get}/shop/:shop_id/order Get orders
 * @apiName GetOrders
 * @apiGroup Order  
 * @apiDescription Get All Orders for a shop
 * @apiSuccess {Number} id order's id
 * @apiSuccess {Number} value order's value
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/1/order/
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request GET \
 * --url https://shopify.adi.run/rest/v1/shop/1/order
 */
orderRouter.get('/', function(req,res){
	orderController.getAll(req, res);
});

/**
 * @api {get}/shop/:shop_id/order/:order_id Get Order
 * @apiName GetOrder
 * @apiGroup Order  
 * @apiDescription Get an existing Order
 * @apiSuccess {Number} id order's id
 * @apiSuccess {Number} value order's value
 * @apiSuccess {Date} createdAt date&time when the order was created
 * @apiSuccess {Date} updatedAt date&time when the order was updated
 * @apiSuccess {Array} lineItem lineItems associated with the order
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/1/order/1
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request GET \
 * --url https://shopify.adi.run/rest/v1/shop/1/order/1
 */
orderRouter.get('/:order_id', function (req, res){
	orderController.getSingle(req, res);
});

/**
 * @api {post}/shop/:shop_id/order Create Order
 * @apiName CreateOrder
 * @apiGroup Order  
 * @apiDescription Create a new order
 * @apiSuccess {Number} id Order's id
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request POST \
 * --url https://shopify.adi.run/rest/v1/shop/1/order \
 * --header 'Content-Type: application/json' \
 * --data '{
 *	"items": [{
 *		"name": "sample product",
 *		"product_id": 1,
 * 		"quantity": 10
 * 		}]
 * }'
 */
orderRouter.post('/', function (req, res){
	orderController.createSingle(req, res);
});
orderRouter.post('/:order_id', function (req, res){
	res.status(401).send('Cannot POST order/'+req.params.order_id);
});

/**
 * @api {delete}/shop/:shop_id/order/:order_id Delete Order
 * @apiName DeleteOrder
 * @apiGroup Order  
 * @apiDescription Delete a order. 
 * @apiParam {Number} order_id Order's id
 * @apiSuccess {String} status Status of the request
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "Order not found"
 *     }
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request DELETE \
 * --url https://shopify.adi.run/rest/v1/shop/1/order/1
 */
orderRouter.delete('/:order_id', function (req, res){
	orderController.deleteSingle(req, res);
});

/**
 * @api {put}/shop/:shop_id/order/:order_id Edit Order
 * @apiName EditOrder
 * @apiGroup Order   
 * @apiDescription  Not Implemented 🙁
 */
orderRouter.put('/:order_id', function (req, res){
	orderController.putSingle(req, res);
});

module.exports = orderRouter;