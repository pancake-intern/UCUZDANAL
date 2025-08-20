const categoryMap = {
    "Giyim": [
        "womens-shoes", "womens-watches", "womens-jewellery", "womens-dresses", "womens-bags", "tops",
        "sunglasses", "sports-accessories", "mens-watches", "mens-shoes", "mens-shirts"
    ],
    "Teknoloji": ["vehicle", "tablets", "smartphones", "motorcycle", "mobile-accessories", "laptops"],
    "Kozmetik": ["skin-care", "beauty", "fragrances"],
    "Mutfak": ["kitchen-accessories", "groceries"],
    "Moda": ["home-decoration", "furniture"]
}
function filterProducts(products){
    const filteredProducts={}
    for(const mainCategory in categoryMap){
        filteredProducts[mainCategory] =[];
    }
    products.forEach(product => {

        const pcategory= product.category;
        
    });
}    