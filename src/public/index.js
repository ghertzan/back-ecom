const abmForm = document.getElementById("abmForm");

const productsList = document.getElementById("productsList");

const clearBtn = document.getElementById("clearBtn");

const pagination = document.getElementById("pagination");

function currencyFormat(amount) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(amount);
}

function listOfProducts(productsArray, info) {
	let infoProducts = "";
	let infoPagination = "";
	if (productsArray.length === 0) {
		infoProducts = `<p class="fs-3">No hay productos para mostrar</p>`;
	} else {
		const { count, totalPages, nextLink, prevLink } = info;
		infoPagination = `
		<li class="page-item"><a onClick="getData(${prevLink})" href=# class="page-link">Previous</a></li>

		<li class="page-item"><a onClick="getData(${nextLink})" href=# class="page-link" >Next</a></li>
		`;
		pagination.innerHTML = infoPagination;
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
							product._id
						}" onClick="deleteProduct(${product._id})">Eliminar</button>
					</div>
                    
                </li>
        `;
		});
	}
	productsList.innerHTML = infoProducts;
}

// abmForm?.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	const formData = new FormData(abmForm);
// 	const data = Object.fromEntries(formData);

// 	fetch("/api/products", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	}).then((res) => res.json());
// 	abmForm.reset();
// });

// clearBtn?.addEventListener("click", (e) => {
// 	abmForm.reset();
// });

getData = (url) => {
	console.log("hola");

	fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			listOfProducts(data.payload, data.info);
		});
};

fetch("http://localhost:8080/api/products/")
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		listOfProducts(data.payload, data.info);
	});
