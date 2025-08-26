import crypto from "crypto";

export function idGenerator() {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return array[0];
}

export function currencyFormat(amount) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(amount);
}
