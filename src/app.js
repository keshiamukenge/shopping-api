import express from 'express'

import PingController from './controllers/PingController.js'
import ShopingController from './controllers/ShopingController.js';

const app = express();
const port = 3000;

class App {
	constructor() {
		this.port = port;
		this.app = app;

		this.pingController = new PingController();
		this.shopingController = new ShopingController();

		this.setupRouter();
		this.listen();
	}

	setupRouter() {
		this.app.get('/api', (req, res) => {
			res.send(`
				<h1>Shopping api</h1>
				<h2>Endpoints :</h2>
				<ul>
					<li><code>/ping</code></li>
					<li><code>/stock</code></li>
					<li><code>/products</code></li>
					<li><code>/products/id</code></li>
				</ul>
			`)
		})

		this.app.get('/api/ping', (req, res) => {
			this.pingController.getPong(req, res);
		})

		this.app.get('/api/products', (req, res) => {
			this.shopingController.getProducts(req, res);
		})

		this.app.get('/api/products/:id', (req, res) => {
			this.shopingController.getProduct(req, res);
		})

		this.app.get('/api/stock', (req, res) => {
			this.shopingController.getStock(req, res);
		})
	}

	listen() {
		app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}

new App();
