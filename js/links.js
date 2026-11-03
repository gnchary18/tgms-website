
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cards = document.querySelectorAll(".website-card");
const noResults = document.getElementById("noResults");

function filterWebsites() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    cards.forEach(card => {

        const cardText = card.innerText.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === cardCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterWebsites);
categoryFilter.addEventListener("change", filterWebsites);
