const socket = io();

const abmForm = document.getElementById("abmForm");

const productsList = document.getElementById("productsList");

const clearBtn = document.getElementById("clearBtn");

function currencyFormat(amount) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(amount);
}

function listOfProducts(productsArray) {
	let infoProducts = "";
	if (productsArray.length === 0) {
		infoProducts = `<p class="fs-3">No hay productos para mostrar</p>`;
	} else {
		productsArray.forEach((product) => {
			infoProducts += `
                <li class=" list-group-item d-flex flex-column "> 
					<div class=" align-content-start">
						<p><strong>Nombre:</strong> ${product.title}</p>
						<p><strong>Descripción:</strong> ${product.description}</p>
						<p><strong>Stock:</strong> ${product.stock}</p>
						<p><strong>Precio:</strong> ${currencyFormat(product.price)}</p>
					</div>
  							
					<div class=" align-content-around justify-content-around m-1 ">
						<button type="button" class="btn btn-danger" id="${
							product.id
						}" onClick="deleteProduct(${product.id})">Eliminar</button>
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
		title: "Listo!",
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
	abmForm.reset();
});

const deleteProduct = (id) => {
	socket.emit("delete-product", id);
};

clearBtn?.addEventListener("click", (e) => {
	abmForm.reset();
});
