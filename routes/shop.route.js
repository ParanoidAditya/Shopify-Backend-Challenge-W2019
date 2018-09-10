const shopRouter = require('express').Router();
const shopController = require('../controllers/shop.controller');

/**
 * @api {get}/shop Get Shops
 * @apiName GetShops
 * @apiGroup Shop  
 * @apiDescription Get all shops
 * @apiSuccess {Number} id Shop's id.
 * @apiSuccess {String} name Shop's name.
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/
 * @apiVersion 1.0.0
 */
shopRouter.get('/', function (req, res){
	return shopController.getAll(req, res);
});

/**
 * @api {get}/shop/:shop_id Get Shop
 * @apiName GetShop
 * @apiGroup Shop  
 * @apiDescription Get a single shop
 * @apiSuccess {Number} id Shop's id
 * @apiSuccess {String} name Shop's name
 * @apiSuccess {String} plan Shop's plan
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/1
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "Shop not found"
 *     }
 * @apiVersion 1.0.0
 */
shopRouter.get('/:shop_id', function (req, res){
	return shopController.getSingle(req, res);
});

/**
 * @api {post}/shop Create Shop
 * @apiName CreateShop
 * @apiGroup Shop  
 * @apiDescription Create a new shop
 * @apiExample Example usage:
 *     body:
 *     {
 *       "name": "My New Store",
 *       "plan": "basic"
 *     }
 * @apiSuccess {Number} id Shop's id
 * @apiVersion 1.0.0
 */
shopRouter.post('/', function (req, res){
	return shopController.createSingle(req, res);
});

shopRouter.post('/:shop_id', function (req, res){
	res.status(401).send('Cannot POST shop/'+req.params.shop_id);
});
/**
 * @api {delete}/shop/:shop_id Delete Shop
 * @apiName DeleteShop
 * @apiGroup Shop  
 * @apiDescription Delete an existing shop
 * @apiParam {Number} shop_id Shop's id
 * @apiSuccess {String} status Status of the request
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "Shop not found"
 *     }
 * @apiVersion 1.0.0
 */
shopRouter.delete('/:shop_id', function (req, res){
	return shopController.deleteSingle(req, res);
});


/**
 * @api {put}/shop/:shop_id Edit Shop
 * @apiName EditShop
 * @apiGroup Shop  
 * @apiDescription Edit an existing shop
 * @apiSuccess {Number} id Shop's id
 * @apiSuccess {String} name Shop's name
 * @apiSuccess {String} plan Shop's plan
 * @apiParam {Number} shop_id Shop's id
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "Shop not found"
 *     }
 * @apiExample Example usage:
 *     body:
 *     {
 *       "name": "My New Store",
 *       "plan": "basic"
 *     }
 * @apiVersion 1.0.0
 */
shopRouter.put('/:shop_id', function (req, res){
	return shopController.putSingle(req, res);
});

module.exports = shopRouter;