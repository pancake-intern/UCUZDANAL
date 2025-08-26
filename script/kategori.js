

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


document.addEventListener('DOMContentLoaded', function() {
  
  checkUserSession();
});

function checkUserSession() {
 
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
  const loginButton = document.getElementById('signinButton');
  const signupButton = document.getElementById('signupButton');
  const profileSection = document.getElementById('profile-section');
  const exitButton = document.getElementById('exitaccount')
  if (isUserLoggedIn) {
   debugger
    if (loginButton) loginButton.style.display = 'none';
    if (signupButton) signupButton.style.display = 'none';
    
    
    if (profileSection) profileSection.style.display = 'flex';
    
    
    updateProfileInfo(profileSection);
    
  } else {
   
    
  }
}

function updateProfileInfo(profileSection) {
    const username = localStorage.getItem('username')
    const greeting= document.createElement('p')
    greeting.classList.add("profile-section","goldtext","mx-1","my-auto")
;
    greeting.innerText=`Hoşgeldin ${username}`
    profileSection.appendChild(greeting)
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

