
let currentPage = 1;
const productsPerPage = 28;
let totalProducts = 0;



function displayProducts(products) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = ''; 

    if (!products || products.length === 0) {
        productContainer.innerHTML = '<p class="text-center text-white col-12">Aradığınız kriterlere uygun ürün bulunamadı.</p>';
        return;
    }

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
                                <button class="btn fw-bold btn-warning w-100 add-to-cart-btn" data-product-id="${product.id}">Sepete Ekle</button>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
        productContainer.innerHTML += productcardHTML;
    });

   
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
       
        getData(1);
    }
});