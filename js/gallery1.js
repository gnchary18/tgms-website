
// Gallery Image Data

const galleryData = [

    {
        title: "Smart Classroom",
        category: "classrooms",
        image: "assets/images/gallery/classrooms/classroom1.jpg"
    },

    {
        title: "Classroom Activities",
        category: "classrooms",
        image: "assets/images/gallery/classrooms/classroom2.jpg"
    },

    {
        title: "Computer Laboratory",
        category: "labs",
        image: "assets/images/gallery/labs/lab1.jpg"
    },

    {
        title: "Practical Sessions",
        category: "labs",
        image: "assets/images/gallery/labs/lab2.jpg"
    },

    {
        title: "Student Activities",
        category: "activities",
        image: "assets/images/gallery/activities/activity1.jpg"
    },

    {
        title: "Group Activities",
        category: "activities",
        image: "assets/images/gallery/activities/activity2.jpg"
    },

    {
        title: "Sports Activities",
        category: "sports",
        image: "assets/images/gallery/sports/sports1.jpg"
    },

    {
        title: "Annual Sports Meet",
        category: "sports",
        image: "assets/images/gallery/sports/sports2.jpg"
    },

    {
        title: "Cultural Programme",
        category: "cultural",
        image: "assets/images/gallery/cultural/cultural1.jpg"
    },

    {
        title: "Campus Infrastructure",
        category: "infrastructure",
        image: "assets/images/gallery/infrastructure/building1.jpg"
    },

    {
        title: "Teaching Faculty",
        category: "staff",
        image: "assets/images/gallery/staff/staff1.jpg"
    },

    {
        title: "School Celebrations",
        category: "events",
        image: "assets/images/gallery/events/event1.jpg"
    }

];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentImages = [];
let currentIndex = 0;


// Display Gallery


function displayGallery(category = "all") {

    galleryGrid.innerHTML = "";

    const filteredImages = galleryData.filter(item => {

        return category === "all" ||
               item.category.toLowerCase() === category.toLowerCase();

    });

    if (filteredImages.length === 0) {
        galleryGrid.innerHTML =
            '<p class="no-images">No photos available in this category.</p>';
        return;
    }

    filteredImages.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "gallery-item";

        const img = document.createElement("img");

        img.src = item.image;
        img.alt = item.title;
        img.loading = "lazy";

        // Do not hide the entire card if an image is missing
        img.onerror = function() {
            this.alt = "Image not available";
            this.style.display = "none";
            card.classList.add("image-error");
        };

        const overlay = document.createElement("div");
        overlay.className = "gallery-overlay";

        const heading = document.createElement("h3");
        heading.textContent = item.title;

        const caption = document.createElement("span");
        caption.textContent = item.category.toUpperCase();

        overlay.appendChild(heading);
        overlay.appendChild(caption);

        card.appendChild(img);
        card.appendChild(overlay);

        card.addEventListener("click", function() {

            currentImages = filteredImages;
            currentIndex = index;

            openLightbox();

        });

        galleryGrid.appendChild(card);

    });

}



// Category Filter


filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected button
        this.classList.add("active");

        // Display selected category
        displayGallery(this.dataset.filter);

    });

});



// Lightbox Elements

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageCaption = document.getElementById("imageCaption");


// Open Lightbox

function openLightbox() {

    const item = currentImages[currentIndex];

    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    imageCaption.textContent = item.title;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


// Close Lightbox

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}

document.getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);


// Next Image

function nextImage() {

    currentIndex =
        (currentIndex + 1) % currentImages.length;

    openLightbox();

}


// Previous Image

function prevImage() {

    currentIndex =
        (currentIndex - 1 + currentImages.length)
        % currentImages.length;

    openLightbox();

}

document.getElementById("nextImage")
    .addEventListener("click", nextImage);

document.getElementById("prevImage")
    .addEventListener("click", prevImage);


// Keyboard Navigation

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closeLightbox();

    if (event.key === "ArrowRight") nextImage();

    if (event.key === "ArrowLeft") prevImage();

});


// Click Outside to Close

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Initial Gallery

displayGallery("all");
