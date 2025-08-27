let totalProducts = 0;

let productsinCard = JSON.parse(localStorage.getItem("productsinCard"))

async function getproductbyID() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if(!productId)  return;
    
     
    try {
        
        const response= await fetch(`https://dummyjson.com/products/${productId}`)
        const product=await response.json()
        console.log(product)
        const container = document.getElementById('product-details-container');
        
        let imageGalleryHTML = '';
        product.images.forEach((img, index) => {
            imageGalleryHTML += `<img src="${img}" 
            class="img-fluid mb-2 my-2 ${index === 0 ? 'active' : ''}" >`; 
        })

        
        const productDetailsHTML = `
            <div class="col-md-2 rounded">
                <div class="product-image-gallery  rounded my-2">
                   ${imageGalleryHTML}
                </div>
            </div>
            <div class="col-md-5">
               <img src="${product.thumbnail}" id="main-product-image" class="img-fluid rounded" alt="${product.title}">
            </div>

            <div class="col-md-5 goldtext">
                <h1 class="mb-3">${product.title}</h1>
                <p class="lead text-light">${product.description}</p>
               
                <p><strong>Marka:</strong> ${product.brand}</p>
                <p><strong>Kategori:</strong> ${product.category}</p>
                <p><strong>Stok:</strong> ${product.stock} adet</p>
                <p><strong>Puan:</strong> ${product.rating} / 5.0</p>
                <h2 class="my-4">${product.price} $ <span class="text-secondary fs-5 text-decoration-line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)} $</span></h2>

                <button id="addToCartButton" class="btn btn-lg btn-warning fw-bold w-100">Sepete Ekle</button>
            </div>
        `;
        container.innerHTML = productDetailsHTML;

  const addtoCartButton=document.getElementById("addToCartButton")
  addtoCartButton.addEventListener('click', addCart)
           
            
           function addCart() {
            debugger;
            const productToAdd = product.id;
            console.log(productToAdd)
             if(product.stock ==0){
                alert("ÜRÜN STOĞU TÜKENMİŞTİR")
            return;
           }
            if (productToAdd) {
                
                addToCart(productToAdd, addtoCartButton);
            }
        }
        

    }
        
        
    catch (error) {
        alert("HATA.")
    }
}

getproductbyID()
