const socket = io();

const productsDiv = document.getElementById("productsDiv");

socket.on("products", (products) => {
	const infoProducts = products.map((product) => {
		return `<div id=${product.id} class='productDiv'>
                    <p><strong>Nombre: </strong> ${product.title}</p>
                    <p><strong>Precio: </strong> ${product.price}</p>
                    <p><strong>Stock: </strong> ${product.stock}</p>
                </div>`;
	});

	productsDiv.innerHTML = infoProducts;
});
