let currentPage = 1;
const productsPerPage = 190;
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
          
            const categories= product;

            if(!mainCategories.includes(categories)){
            mainCategories.push(categories);}
           
            });
            mainCategories.forEach(values => {
                console.log(values)
                
            });
        const categoriesRendered=["Laptop","Mens-shirts","Mens-shoes","Mens-watches",
            "Mobile-accessories","Motorcycle","Skin-care","Smartphones","Sports-accesories","Sunglasses","Tablets","Tops","Vehicle","Womens-bags","Womens-dresses","Womens-jewellery","Womens-Shoes","Womens-watches"]
            console.log(categoriesRendered)
    } catch(error){

    
    }}

getcategoryData()