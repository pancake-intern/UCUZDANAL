

let productsinCard = 0;



//sadece sayaç, productsincardı tıklanan şeyin verisini alacak şekilde kayddet.

const storedProductCount = localStorage.getItem("productsinCard");
if (storedProductCount) {
    productsinCard = parseInt(storedProductCount, 10);
    const shoppingCard = document.querySelector('#productCounter');
    if (shoppingCard) {
        shoppingCard.innerText = productsinCard;
    }
}



async function getProductsByCategory() {
    
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    // KONTROL MEKANİZMASIY
    if (!category) {
        document.getElementById('category-title').innerText = "Kategori seçilmedi!";
        console.error("URL'de kategori belirtilmemiş.");
        return;
    }

   // İLKHARF BÜYÜK
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    document.getElementById('category-title').innerText = `${categoryTitle} Kategorisindeki Ürünler`;

    try {
       
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await response.json();
        const products = data.products;

        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = ''; 

        
        products.forEach(product => {
           
            const productcardHTML = `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100 text-white bg-dark">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description.substring(0, 50)}...</p>
                            <div class="mt-auto">
                                <p class="fs-5 fw-bold">${product.price} $</p>
                                <button class="btn fw-bold btn-warning addtoCard w-100" data-product-id="${product.id}">Sepete Ekle</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productcardHTML;
        });

        
        document.querySelectorAll(".addtoCard").forEach(btn => {
            btn.addEventListener("click", () => {
                productsinCard += 1;
                localStorage.setItem("productsinCard", productsinCard);
                const shoppingCard = document.querySelector('#productCounter');
                if (shoppingCard) {
                    shoppingCard.innerText = productsinCard;
                }
                btn.innerText = "Sepete Eklendi!";
                btn.classList.remove("btn-warning");
                btn.classList.add("btn-success");
                
            });
        });

    } catch (error) {
        console.error("Ürünler getirilirken bir hata oluştu:", error);
        document.getElementById('product-list').innerHTML = '<p class="text-danger">Ürünler yüklenemedi.</p>';
    }
}


getProductsByCategory();














































// const categoryMap = {
//     "Giyim": [
//         "womens-shoes", "womens-watches", "womens-jewellery", "womens-dresses", "womens-bags", "tops",
//         "sunglasses", "sports-accessories", "mens-watches", "mens-shoes", "mens-shirts"
//     ],
//     "Teknoloji": ["vehicle", "tablets", "smartphones", "motorcycle", "mobile-accessories", "laptops"],
//     "Kozmetik": ["skin-care", "beauty", "fragrances"],
//     "Mutfak": ["kitchen-accessories", "groceries"],
//     "Moda": ["home-decoration", "furniture"]
// }
// function filterProducts(products){
//     const filteredforproductsaim={}
//     const filteredProducts={}
//     for(const mainCategory in categoryMap){
//         filteredProducts[mainCategory] =[];
//     }
//     products.forEach(product => {

//         const pcategory= product.category;
//         console.log(pcategory);
//         for (mainCategory in categoryMap) {
//             if (categoryMap[mainCategory].includes(pcategory)) {
//                 filteredProducts[mainCategory].push(product);
//                 break; 
//             }
//             pcategory=product.category;
            
//         }
//     });
// }    
// filterProducts(products)

