const https = require("https");
const httpHeaders = require("http-headers");

const url = "https://mockapi.io/endpoint"; // Zamień na swój adres MockAPI

https
	.get(url, (res) => {
		const headers = httpHeaders(res);
		console.log("Nagłówki odpowiedzi:", headers);
	})
	.on("error", (e) => {
		console.error("Błąd:", e.message);
	});
