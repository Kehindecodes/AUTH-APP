const http = require('http');
const app = require('./app');
require('dotenv').config();
// const { mongoConnect } = require('./services/mongo');
const server = http.createServer(app);



const PORT = process.env.PORT || 8080;

async function startServer() {
	
	server.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
}

startServer();
