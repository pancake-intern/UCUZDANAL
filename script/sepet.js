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
                 
                         
                          
                          <button id="increaseButton" class="btn btn-success shadow ">+</button>
                          <button id="decreaseButton" class="btn shadow btn-danger">-</button>
                          <button id="deleteallButton" class="btn shadow ">
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
}
document.getElementById("increaseButton")