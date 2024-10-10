import axios from "axios";

axios
	.get("https://670656a4a0e04071d2266a12.mockapi.io/contacts")
	.then((response) => {
		console.log("Nagłówki odpowiedzi:", response.headers);
		console.log("Dane odpowiedzi:", response.data);
		console.log("Status odpowiedzi:", response.status);
	})
	.catch((error) => {
		console.error("Błąd podczas wykonywania żądania:", error);
		if (error.response) {
			console.error("Nagłówki błędu:", error.response.headers);
			console.error("Dane błędu:", error.response.data);
			console.error("Status błędu:", error.response.status);
		}
	});
