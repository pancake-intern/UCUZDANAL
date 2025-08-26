document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary');
    
    container.innerHTML = '';
    summaryContainer.innerHTML = ''; 

    if (cart.length === 0) {
        container.innerHTML = '<p>Sepetinizde henüz ürün bulunmuyor.</p>';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        const cartItemHTML = `
            <div class="card mb-3 bg-dark goldtext">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="">
                            Adet: ${item.quantity}</span>

                            </p>
                 
                         
                          
                          <button class="btn btn-success shadow increaseButton" data-id="${item.id}">+</button>
                          <button class="btn shadow btn-danger decreaseButton" data-id="${item.id}">-</button>
                          <button class="btn shadow deleteAllButton" data-id="${item.id}">
                          <i class="bi bi-trash goldtext"></i></button>
                          
                            <p class="card-text">Fiyat: ${item.price.toFixed(2)} $</p>
                            <p class="card-text fs-bold">Toplam: ${itemTotalPrice.toFixed(2)}$</p>
                            </div>
                    </div>
                </div>
            </div>
        `;//tofixed noktadan sonra 2 basamak kadar gösteriyor
        container.innerHTML += cartItemHTML;
    });

    const summaryHTML = `
        <h3>Toplam Tutar: <span class="text-warning">${totalPrice.toFixed(2)} $</span></h3>
        <button class="btn payButton btn-lg goldtext text-dark fs-bold">Ödemeye Geç</button>
    `;
    summaryContainer.innerHTML = summaryHTML;

    addCartListeners();
}

function addCartListeners() {
    document.querySelectorAll('.increaseButton').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            increaseQuantity(productId);
        });
    });

    document.querySelectorAll('.decreaseButton').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            decreaseQuantity(productId);
        });
    });

    document.querySelectorAll('.deleteAllButton').forEach(button => {
        button.addEventListener('click', function() {
           
            const productId = this.getAttribute('data-id');
            deleteItem(productId);
        });
    });
}

/** @param {string} productId  */
function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(p => p.id == productId); 

    if (item) {
        if (item.quantity >= item.stock) {
            alert("Ürün stoğunu aştınız.");
            return;
        }
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();     
        updateCartCounter();   
    }
}



/** @param {string} productId  */
function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemIndex = cart.findIndex(p => p.id == productId); 

    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
           
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();     
        updateCartCounter();    
    }
}

/** @param {string} productId  */
function deleteItem(productId) {
    debugger;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(p => p.id != productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCartItems();    
    updateCartCounter();    
}