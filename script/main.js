/**  @param {object} product -*/
 
function addToCart(product, button) {
   
    let cart = JSON.parse(localStorage.getItem('cart')) || []; //pratik

    
    let existingProduct = cart.find(item => item.id === product.id);
    
     const currentQuantityInCart = existingProduct ? existingProduct.quantity : 0;

    
    if (currentQuantityInCart >= product.stock) {
       
        showStockErrorAnimation(button);
        return; }
    if (existingProduct) {
       
        existingProduct.quantity += 1;
    } else {
        
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            stock: product.stock,
            quantity: 1
        });
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));

   
    updateCartCounter(); 
    animateButton(button); 
}


function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
   
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);//miktar=quantity
    
    const shoppingCardCounters = document.querySelectorAll('#productCounter');
    if (shoppingCardCounters) {
        shoppingCardCounters.forEach(counter => {
            counter.innerText = totalItems;
        });
    }
   
    localStorage.setItem("productsinCard", totalItems);
}


function animateButton(button) {
    button.innerText = "Sepete Eklendi!";
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");

    setTimeout(() => {
        button.innerText = "Sepete Ekle";
        button.classList.remove("btn-success");
        button.classList.add("btn-warning");
    }, 1000);
}
function showStockErrorAnimation(button) {
    
    button.innerText = "Stok Tükendi!";

    button.classList.remove("btn-warning");
    button.classList.remove("btn-success");
    button.classList.add("btn-danger");
    button.disabled = true;

   
    setTimeout(() => {
        button.innerText = "Sepete Ekle";
        button.classList.remove("btn-danger");
        button.classList.add("btn-warning");
        button.disabled = false;
    }, 2000);
}

 document.addEventListener('DOMContentLoaded', updateCartCounter);

 //test main