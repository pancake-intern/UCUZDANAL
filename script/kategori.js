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
                    <a href="/pages/urun-detayi.html?id=${product.id}" class="text-decoration-none">
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
                    </a>
                </div>
            `;
            productContainer.innerHTML += productcardHTML;
        });

        
        document.querySelectorAll('.addtoCard').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            
           
            const productId = parseInt(button.dataset.productId, 10);
            
            
            const productToAdd = products.find(p => p.id === productId);
            
            if (productToAdd) {
                
                addToCart(productToAdd, button);
            }
        });
        });

    } catch (error) {
        console.error("Ürünler getirilirken bir hata oluştu:", error);
        document.getElementById('product-list').innerHTML = '<p class="text-danger">Ürünler yüklenemedi.</p>';
    }
}

async function getData(page) {
    currentPage = page;
    const skip = (page - 1) * productsPerPage;
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
        const data = await response.json();
        totalProducts = data.total;
        displayProducts(data.products);
        createPagination();

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            
           
            const productId = parseInt(button.dataset.productId, 10);
            
            
            const productToAdd = data.products.find(p => p.id === productId);
            
            if (productToAdd) {
                
                addToCart(productToAdd, button);
            }
        });
        });
    } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
    }
}


function createPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) {
        console.error("Pagination container bulunamadı.");
        return;
    }
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) {
            li.classList.add('active');
        }

        const a = document.createElement('a');
        a.classList.add('page-link','bg-secondary' ,'signupButton');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault(); 
            getData(i);
        });

        li.appendChild(a);
        paginationContainer.appendChild(li);
    }
}


async function performSearch(query) {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        
        
        displayProducts(data.products);
        
        
        document.getElementById('pagination-container').innerHTML = '';
        
    } catch (error) {
        console.error("Arama sırasında hata oluştu:", error);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        
        document.getElementById('searchButton').value = searchQuery;
        performSearch(searchQuery);


    } else {
       
    }
});

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

