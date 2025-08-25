const socket = io();

const abmForm = document.getElementById("abmForm");

const productsList = document.getElementById("productsList");

socket.on("products", (products) => {
	let infoProducts = "";
	products.forEach((product) => {
		infoProducts += `
                <li class=" list-group-item"> 
                    <p><strong>Nombre:</strong> ${product.title}</p>
                    <p><strong>Descripción:</strong> ${product.description}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Precio:</strong> ${product.price}</p>
                </li>
        `;
	});

	productsList.innerHTML = infoProducts;
});

abmForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(abmForm);
	console.log(typeof formData.get("price"));

	const data = Object.fromEntries(formData);

	fetch("/api/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => res.json());
});

socket.on("product-added", (products) => {
	let infoProducts = "";
	products.forEach((product) => {
		infoProducts += `
                <li class=" list-group-item"> 
                    <p><strong>Nombre:</strong> ${product.title}</p>
                    <p><strong>Descripción:</strong> ${product.description}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p><strong>Precio:</strong> ${product.price}</p>
                </li>
        `;
	});
	productsList.innerHTML = infoProducts;
});
