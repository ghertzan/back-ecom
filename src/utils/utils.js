import crypto from "crypto";

export function idGenerator() {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return array[0];
}
