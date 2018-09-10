let config = {};

config.dbHost = process.env.DB_HOST || 'localhost';
config.dbPort = process.env.DB_PORT || '3306';
config.dbName = process.env.DB_NAME || 'shopify';
config.dbUsername = process.env.DB_USER || 'aditya';
config.dbPassword = process.env.DB_PASS || 'S3cr3t';
config.serverPort = process.env.LISTEN_PORT || 3000;
config.dbSeed = process.env.DB_SEED === 'true' || false;
config.dbOptions = {};
if (config.dbSeed){
	config.dbOptions.force = true; 
}
module.exports = config;
