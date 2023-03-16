import fetch from 'node-fetch';
export default class ShopingController {
	constructor() {
		this.cart = []
		this.ordersId = [];
	}
	
	async getStock(req, res) {
		const response = await fetch('https://microservices.valentin-magry.fr/api/stock');
		const data = await response.json();

		res.send(data);
	}

	async getProducts(req, res) {
		const response = await fetch('http://microservices.tp.rjqu8633.odns.fr/api/products');
		const data = await response.json();

		res.send(data);
	}

	async getProduct(id, res) {
		const response = await fetch(`http://microservices.tp.rjqu8633.odns.fr/api/products/${id}`);
		const product = await response.json();
		
		return product;
	}

	async sendCheckout(req, res) {
		if(this.cart.length === 0) {
			res.status(400);
			res.send();

			return;
		};

		const response = await fetch('https://microservice-api-knl.vercel.app/api/order', {
			method: 'POST',
			body: JSON.stringify(this.cart),
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if(response.status === 200) {
			const data = await response.json();
			this.ordersId.push(data?.id);
			res.send(JSON.stringify(this.ordersId));

			this.cart = [];
		}

	}

	async addProductToBasket(req, res) {
		const product = await this.getProduct(req.body.id, res);

		if(!product?._id) {
			res.status(400);
			res.send();

			return;
		}

		for(let i = 0; i < req.body.quantity; i++) {
			this.cart.push({
				id: product._id,
				name: product.name,
				description: product.description,
				unitPrice: product.ean,
				quantity: 1
			});
		}

		res.status(204);
		res.send();
	}
	
	async getBasket(req, res) {
		res.send(this.cart);
	}
}