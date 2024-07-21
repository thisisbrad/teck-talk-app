const express = require("express");
const swagger = require("express-jsdoc-swagger");

var app = express();
swagger(app)({
	info: {
		title: "Tech Talk Api",
		version: "1.0.0",
	},
	baseDir: "./app/api/routes",
	swaggerUIPath: "/",
	security: {
		UserAuth: {
			type: 'apiKey',
			in: 'cookie',
			name: 'connect.sid',
			description: 'Basic user authentication'
		}
	}
});




app.listen(4444, ()=>console.log(`Swagger Docs up on http://localhost:4444`))
