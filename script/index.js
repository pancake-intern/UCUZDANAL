// async function getProducts() {
	
// 	const productsData = await (await fetch(`https://dummyjson.com/products?limit=1000`)).json();
// 	productsData.products.map((values) => {
// 		console.log(values);

// 	});
	
// }
// getProducts();



let currentPage = 1;
const productsPerPage = 28; 
let totalProducts = 0;
let productsinCard=0;// ürünler sepete eklenince anasayfada sepete git yerine bu sayıyı ekle. snap olur p olur dene birini lastchild olarak koy.
localStorage.setItem("productsinCard",productsinCard)




async function getData(page){
	currentPage=page;
	const skip= (page-1) * productsPerPage;

	try {
		
		const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`)
		const data= await response.json()
		console.log(data)

		totalProducts=data.total
		const products= data.products

		const productContainer=document.getElementById('product-list')
		productContainer.innerHTML= ''

		products.forEach(product => {
			const productcardHTML= `
			 <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100 text-white bg-dark">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description.substring(0, 50)}...</p>
                            <div class="mt-auto">
                                <p class="fs-5 fw-bold">${product.price} $</p>
                                <button class="btn fw-bold btn-warning addtoCard w-100">Sepete Ekle</button>
                            </div>
                        </div>
                    </div>
                </div>
			`
			productContainer.innerHTML += productcardHTML;
			


			document.querySelectorAll(".addtoCard").forEach(btn => {
			btn.addEventListener("click", () => {
				
				const productPrice= document.querySelector(".addtoCard")
				console.log(productPrice)
				productsinCard += 1;
				localStorage.setItem("productsinCard", productsinCard);
				const shoppingCard = document.querySelector('#productCounter');
				shoppingCard.innerText = '';
				shoppingCard.innerText = `${productsinCard}`;
				
			});
		});
		});



	} catch (error) {
		console.log("olmuyor bi hatan var")
	}



}
getData(1)

