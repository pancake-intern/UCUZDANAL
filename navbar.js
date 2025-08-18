async function getProducts() {
	
	const productsData = await (await fetch(`https://dummyjson.com/products`)).json();
	productsData.products.map((values) => {
		console.log(values.title);

	});
}
getProducts();