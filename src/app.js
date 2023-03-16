import express from 'express'
import bodyParser from 'body-parser';

import PingController from './controllers/PingController.js'
import ShopingController from './controllers/ShopingController.js';

const app = express();
const port = 3000;

class App {
	constructor() {
		this.port = port;
		this.app = app;

		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }))
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
					<li><code>[GET] /ping</code></li>
					<li><code>[GET] /stock</code></li>
					<li><code>[GET] /products</code></li>
					<li><code>[GET] /products/id</code></li>
					<li><code>[PUT] /basket</code></li>
					<li><code>[POST] /basket/checkout</code></li>
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

		this.app.get('/api/basket/checkout', (req, res) => {
			this.shopingController.sendCheckout(req, res);
		})

		this.app.put('/api/basket', (req, res) => {
			this.shopingController.addProductToBasket(req, res);
		})
	}

	listen() {
		app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}

new App();
