function createDropdownNavbar() {
    
    const navbarContainer = document.getElementById("mynavbar");
    
    
    if (!navbarContainer) {
        console.error("ID'si 'mynavbar' olan bir element bulunamadı. Navbar oluşturulamadı.");
        return;
    }

   
    const categoryGroups = {
        'Teknoloji': ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
        'Giyim & Moda': ['mens-shirts', 'mens-shoes', 'mens-watches', 'womens-dresses', 'womens-shoes', 'womens-watches', 'womens-bags', 'womens-jewellery', 'tops', 'sunglasses'],
        'Ev & Yaşam': ['furniture', 'home-decoration', 'kitchen-accessories'],
        'Kozmetik & Bakım': ['beauty', 'fragrances', 'skin-care'],
        'Oto & Spor': ['motorcycle', 'vehicle', 'sports-accessories'],
        'Süpermarket': ['groceries']
    };

   
    const navbarHTML = `
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <ul class="navbar-nav" id="category-menu-list">
                    </ul>
            </div>
        </div>
    `;
    navbarContainer.innerHTML = navbarHTML;
    
  
    const menuList = navbarContainer.querySelector('#category-menu-list');

   
    for (const mainCategory in categoryGroups) {
        const subCategories = categoryGroups[mainCategory];

        if (subCategories.length > 1) { 
            const dropdownLi = document.createElement('li');
            dropdownLi.className = 'nav-item dropdown';
            let dropdownItemsHTML = '';
            subCategories.forEach(subCat => {
                const formattedName = subCat.charAt(0).toUpperCase() + subCat.slice(1).replace('-', ' ');
                dropdownItemsHTML += `<li><a class="dropdown-item" href="/pages/kategori.html?category=${subCat}"">${formattedName}</a></li>`;
            });
            dropdownLi.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${mainCategory}</a>
                <ul class="dropdown-menu">${dropdownItemsHTML}</ul>`;
            menuList.appendChild(dropdownLi);
        } else { 
            const singleLi = document.createElement('li');
            singleLi.className = 'nav-item';
            const subCat = subCategories[0];
            singleLi.innerHTML = `<a class="nav-link" href="/pages/kategori.html?category=${subCat}"">${mainCategory}</a>`;
            menuList.appendChild(singleLi);
        }
    }
}


document.addEventListener("DOMContentLoaded", createDropdownNavbar);