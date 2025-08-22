// Bu fonksiyon, localStorage'daki veriyi kullanarak navbar'daki sayacı günceller.
// main.js'de zaten var ama burada da kullanacağımız için tekrar tanımlayabiliriz
// veya main.js'in yüklendiğinden emin olabiliriz.
function updateCartCounter() {
    const count = localStorage.getItem("productsinCard") || 0;
    const counterElement = document.querySelector('#productCounter');
    if (counterElement) {
        counterElement.innerText = count;
    }
}

// Ürün detaylarını getiren ve sayfada gösteren ana fonksiyon
async function getProductDetails() {
    // 1. URL'den 'id' parametresini al
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Eğer ID yoksa hata ver ve dur
    if (!productId) {
        document.getElementById('product-details-container').innerHTML = '<p class="text-danger">Ürün ID\'si bulunamadı.</p>';
        return;
    }

    try {
        // 2. API'den ID'ye göre tek bir ürünün verisini çek
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        const container = document.getElementById('product-details-container');
        
        // Küçük resim galerisi için HTML oluştur
        let imageGalleryHTML = '';
        product.images.forEach((img, index) => {
            imageGalleryHTML += `<img src="${img}" class="img-fluid mb-2 ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}')">`;
        });

        // 3. Ürün detaylarını gösterecek HTML'i oluştur
        const productDetailsHTML = `
            <div class="col-md-2">
                <div class="product-image-gallery">
                    ${imageGalleryHTML}
                </div>
            </div>
            <div class="col-md-5">
                <img src="${product.thumbnail}" id="main-product-image" class="img-fluid rounded" alt="${product.title}">
            </div>

            <div class="col-md-5 goldtext">
                <h1 class="mb-3">${product.title}</h1>
                <p class="lead">${product.description}</p>
                <hr style="color: gold;">
                <p><strong>Marka:</strong> ${product.brand}</p>
                <p><strong>Kategori:</strong> ${product.category}</p>
                <p><strong>Stok:</strong> ${product.stock} adet</p>
                <p><strong>Puan:</strong> ${product.rating} / 5.0</p>
                <h2 class="my-4">${product.price} $ <span class="text-danger fs-5 text-decoration-line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)} $</span></h2>
                <button id="addToCartBtn" class="btn btn-lg btn-warning fw-bold w-100">Sepete Ekle</button>
            </div>
        `;

        // Oluşturulan HTML'i container'a yerleştir
        container.innerHTML = productDetailsHTML;

        // 4. Sepete Ekle butonuna işlevsellik kazandır
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            let currentProducts = parseInt(localStorage.getItem("productsinCard") || "0");
            currentProducts += 1;
            localStorage.setItem("productsinCard", currentProducts);
            
            // main.js'deki fonksiyonu çağırarak anında sayacı güncelle
            if(typeof updateCartCounter === 'function') {
                updateCartCounter();
            }

            // Butonu güncelle
            const btn = document.getElementById('addToCartBtn');
            btn.innerText = "Sepete Eklendi!";
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-success');
            btn.disabled = true;
        });

    } catch (error) {
        console.error("Ürün detayı getirilirken hata oluştu:", error);
        document.getElementById('product-details-container').innerHTML = '<p class="text-danger">Ürün yüklenemedi.</p>';
    }
}

// Küçük resme tıklandığında ana resmi değiştiren fonksiyon
function changeMainImage(newImageSrc) {
    document.getElementById('main-product-image').src = newImageSrc;
    // Aktif resim çerçevesini güncelle
    document.querySelectorAll('.product-image-gallery img').forEach(img => {
        img.classList.remove('active');
        if (img.src === newImageSrc) {
            img.classList.add('active');
        }
    });
}


// Sayfa yüklendiğinde ana fonksiyonu çalıştır
getProductDetails();
