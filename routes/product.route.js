const productRouter = require('express').Router({ mergeParams: true }); 
const productController = require('../controllers/product.controller');

/**
 * @api {get}/shop/:shop_id/product Get Products
 * @apiName GetProducts
 * @apiGroup Product  
 * @apiDescription Get All products for a shop
 * @apiSuccess {Number} id product's id
 * @apiSuccess {String} name product's name
 * @apiSuccess {Number} value product's value
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/1/product/
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request GET \
 * --url https://shopify.adi.run/rest/v1/shop/1/product
 */
productRouter.get('/', function(req,res){
	return productController.getAll(req, res);
});

/**
 * @api {get}/shop/:shop_id/product/:product_id Get Product
 * @apiName GetProduct
 * @apiGroup Product  
 * @apiDescription Get a single product
 * @apiSuccess {Number} id product's id
 * @apiSuccess {String} name product's name
 * @apiSuccess {Number} value product's value
 * @apiSuccess {Array} lineItem lineItems associated with the product
 * @apiSampleRequest https://shopify.adi.run/rest/v1/shop/1/product/1
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request GET \
 * --url https://shopify.adi.run/rest/v1/shop/1/product/1
 */
productRouter.get('/:product_id', function(req,res){
	return productController.getSingle(req, res);
});

/**
 * @api {post}/shop/:shop_id/product Create Product
 * @apiName CreateProduct
 * @apiGroup Product  
 * @apiDescription Create a new product
 * @apiExample Example usage:
 * curl --request POST \
 * --url https://shopify.adi.run/rest/v1/shop/1/product \
 * --header 'Content-Type: application/json' \
 * --data '{
 *	"name":"A new product",
 *	"value": 199.99
 * }'
 * @apiSuccess {Number} id Product's id
 * @apiVersion 1.0.0
 */
productRouter.post('/', function (req, res){
	productController.createSingle(req, res);
});
productRouter.post('/:product_id', function (req, res){
	res.status(401).send('Cannot POST product/'+req.params.product_id);
});
/**
 * @api {delete}/shop/:shop_id/product/:product_id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product  
 * @apiDescription Delete an existing product
 * @apiParam {Number} product_id Product's id
 * @apiSuccess {String} status Status of the request
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "Product not found"
 *     }
 * @apiVersion 1.0.0
 * @apiExample Example usage:
 * curl --request DELETE \
 * --url https://shopify.adi.run/rest/v1/shop/1/product/1
 */
productRouter.delete('/:product_id', function (req, res){
	productController.deleteSingle(req, res);
});

/**
 * @api {put}/shop/:shop_id/product/:product_id Edit Product
 * @apiName EditProduct
 * @apiGroup Product  
 * @apiDescription Edit an existing product
 * @apiExample Example usage:
 * curl --request PUT \
 * --url https://shopify.adi.run/rest/v1/shop/1/product/1 \
 * --header 'Content-Type: application/json' \
 * --data '{
 *	"name":"Updated Product Name",
 *	"value": 49.99
 * }'
 * @apiSuccess {Number} id product's id
 * @apiSuccess {String} name product's name
 * @apiSuccess {Number} value product's value
 * @apiSuccess {Array} lineItem lineItems associated with the product
 * @apiVersion 1.0.0
 */
productRouter.put('/:product_id', function (req, res){
	productController.putSingle(req, res);
});

module.exports = productRouter;