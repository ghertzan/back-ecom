const socket = io();

const productsList = document.getElementById("productsList");

socket.on("products", (products) => {
	const infoProducts = products.map((product) => {
		return `<li id=${product.id} class='list-group-item'>
                    <p><strong>Nombre: </strong> ${product.title}</p>
                    <p><strong>Precio: </strong> ${product.price}</p>
                    <p><strong>Stock: </strong> ${product.stock}</p>
                </li>`;
	});

	productsList.innerHTML = infoProducts;
});
