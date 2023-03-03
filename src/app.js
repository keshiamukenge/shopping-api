import PingControllers from './controllers/PingControllers.js'
import express from 'express'

const app = express();
const port = 3000;

class App {
	constructor() {
		this.port = port;
		this.app = app;

		this.ping = new PingControllers();

		this.setupRouter();
		this.listen();

	}

	setupRouter() {
		this.app.get('/api', (req, res) => {
			res.send('Shopping api')
		})

		this.app.get('/api/ping', (req, res) => {
			this.ping.getPong(req, res);
		})
	}

	listen() {
		app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}

new App();
