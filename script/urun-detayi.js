async function getproductbyID() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if(!productId)  return;
    debugger;
    try {
        
        const response= await fetch(`https://dummyjson.com/products/${productId}`)
        const product=await response.json()
        console.log(product)
        const container = document.getElementById('product-details-container');
        
        
       

        
        const productDetailsHTML = `
            <div class="col-md-2">
                <div class="product-image-gallery">
                   
                </div>
            </div>
            <div class="col-md-5">
               
            </div>

            <div class="col-md-5 goldtext">
                <h1 class="mb-3">${product.title}</h1>
                <p class="lead">${product.description}</p>
               
                <p><strong>Marka:</strong> ${product.brand}</p>
                <p><strong>Kategori:</strong> ${product.category}</p>
                <p><strong>Stok:</strong> ${product.stock} adet</p>
                <p><strong>Puan:</strong> ${product.rating} / 5.0</p>
                <h2 class="my-4">${product.price} $ <span class="text-grey fs-5 text-decoration-line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)} $</span></h2>

                <button id="addToCartBtn" class="btn btn-lg btn-warning fw-bold w-100">Sepete Ekle</button>
            </div>
        `;

       
        container.innerHTML = productDetailsHTML;
        
    } catch (error) {
        alert("HATA.")
    }
}
getproductbyID()