let currentPage = 1;
const productsPerPage = 28;
let totalProducts = 0;
let productsinCard = 0;


async function getcategoryData(page) {
    currentPage = page;
    const skip = (page - 1) * productsPerPage;

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${productsPerPage}`);
        const data = await response.json();
        const mainCategories=[];
        data.products.map((product) =>{
          
            const categories= product.category;
            
            if(!mainCategories.includes(categories)){
            mainCategories.push(categories);}
           
            });
            mainCategories.forEach(cat => {
                console.log(cat)
                
            });
        
    } catch(error){

    
    }}

getcategoryData()














































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

