const socket = io();

const abmForm = document.getElementById("abmForm");

const productsList = document.getElementById("productsList");

function listOfProducts(productsArray) {
	let infoProducts = "";
	if (productsArray.length === 0) {
		infoProducts = `<p class="fs-3">No hay productos para mostrar</p>`;
	} else {
		productsArray.forEach((product) => {
			infoProducts += `
                <li class=" list-group-item gap-2 d-flex flex-row align-items-center justify-content-around"> 
					<div class="...">
						<p><strong>Nombre:</strong> ${product.title}</p>
						<p><strong>Descripción:</strong> ${product.description}</p>
						<p><strong>Stock:</strong> ${product.stock}</p>
						<p><strong>Precio:</strong> ${product.price}</p>
					</div>
  							
					<div class="...">
						<button type="button" class="btn btn-danger" id="${product.id}" onClick="deleteProduct(${product.id})">Eliminar</button>
					</div>
                    
                </li>
        `;
		});
	}
	productsList.innerHTML = infoProducts;
}

socket.on("products", (products) => {
	listOfProducts(products);
});

socket.on("product-added", (products) => {
	listOfProducts(products);
});

socket.on("deleted-product", (product) => {
	Swal.fire({
		title: "Echo",
		text: `El producto ${product.title} fue eliminado`,
		icon: "success",
	});
});

abmForm?.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(abmForm);
	const data = Object.fromEntries(formData);

	fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => res.json());
});

const deleteProduct = (id) => {
	socket.emit("delete-product", id);
};
