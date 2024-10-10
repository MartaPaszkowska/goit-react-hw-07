import axios from "axios";

axios
	.get("https://670656a4a0e04071d2266a12.mockapi.io/contacts")
	.then((response) => {
		console.log("Nagłówki odpowiedzi:", response.headers);
	})
	.catch((error) => {
		console.error("Błąd:", error);
	});
