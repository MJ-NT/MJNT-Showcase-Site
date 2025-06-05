document.addEventListener("DOMContentLoaded", () => {
    // Fade-in effect
    document.body.classList.add("fade-in");

    // Smooth transition for internal links
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                document.body.classList.remove("fade-in");
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location = link.href;
                }, 500);
            });
        }
    });

    // TTRPG carousel logic
    const carouselButtons = document.querySelectorAll(".ttrpg-link");
    const carousels = document.querySelectorAll(".carousel");
    const carouselContainer = document.getElementById("carousel-container");

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetCarouselId = button.getAttribute("data-carousel");

            // Hide all carousels
            carousels.forEach(c => c.classList.add("d-none"));

            // Show the target carousel
            const targetCarousel = document.getElementById(targetCarouselId);
            targetCarousel.classList.remove("d-none");

            // Show the container
            carouselContainer.classList.remove("d-none");
        });
    });
});