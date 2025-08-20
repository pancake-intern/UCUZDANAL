let currentPage = 1;
const productsPerPage = 28;
let totalProducts = 0;
let productsinCard = 0;


const storedProductCount = localStorage.getItem("productsinCard");
if (storedProductCount) {
    productsinCard = parseInt(storedProductCount, 10);
    const shoppingCard = document.querySelector('#productCounter');
    if (shoppingCard) {
        shoppingCard.innerText = productsinCard;
    }
}

async function getData(page) {
    currentPage = page;
    const skip = (page - 1) * productsPerPage;

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
        const data = await response.json();
        console.log(data);

        totalProducts = data.total;
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
                shoppingCard.innerText = productsinCard;
            });
        });

       
        createPagination();

    } catch (error) {
        console.error("Hata oluştu:", error);
    }
}

function createPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) {
        console.error("Pagination container not found.");
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
        a.classList.add('page-link');
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


getData(1);