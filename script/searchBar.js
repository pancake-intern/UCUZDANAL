document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchButton');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const ask = searchInput.value.trim();

                if (ask) {
                    
                    window.location.href = `/index.html?search=${encodeURIComponent(ask)}`;
                }
            }
        });
    }
});