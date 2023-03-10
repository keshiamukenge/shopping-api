import fetch from 'node-fetch';

export default class ShopingController {
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

	async getProduct(req, res) {
		const response = await fetch(`http://microservices.tp.rjqu8633.odns.fr/api/products/${req.params.id}`);
		const data = await response.json();
		res.send(data);
	}

	async sendCheckout(req, res) {
		const response = await fetch('https://microservice-api-knl.vercel.app/api/order', {
			method: 'POST',
			body: JSON.stringify(req.body),
			headers: {
				'Content-Type': 'application/json'
			},
		});
		const data = await response.json();
		res.send(data);
	}
}