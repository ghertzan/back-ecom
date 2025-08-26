export const abmFormFormatter = (req, res, next) => {
	const product = req.body;
	try {
		product.price = parseFloat(product.price);
		product.stock = parseInt(product.stock);
		if (product.status) {
			product.status = true;
		} else {
			product.status = false;
		}
	} catch (error) {
		throw new Error(error.message);
	}
	next();
};
