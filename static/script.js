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

    let currentCarouselId = null;

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetCarouselId = button.getAttribute("data-carousel");
            const targetCarousel = document.getElementById(targetCarouselId);

            if (!targetCarousel) return;

            // If the same button is clicked again, collapse the container
            if (currentCarouselId === targetCarouselId) {
                carouselContainer.classList.remove("show");

                currentCarouselId = null;
                return;
            }

            // Show the selected carousel
            carousels.forEach(c => c.classList.add("d-none"));
            targetCarousel.classList.remove("d-none");

            // Animate the container open if needed
            if (!carouselContainer.classList.contains("show")) {
                carouselContainer.classList.remove("d-none");

                // Force reflow
                void carouselContainer.offsetWidth;

                carouselContainer.classList.add("show");
            }

            currentCarouselId = targetCarouselId;
        });
    });

    // Moon phase logic
    const moonChart = document.querySelector('.moon-chart');
    const moonPhases = document.querySelectorAll('.moon-phase');
    let centeredPhase = null;

    const rotationDuration = 80000; // 80s for full rotation

    function updateRotation() {
        if (!centeredPhase) return; // no centered moon, no counter rotation

        const elapsed = performance.now() % rotationDuration;
        const degrees = (elapsed / rotationDuration) * 360;

        // Counter rotate the centered phase by -degrees
        // Also keep its translate(-50%, -50%) for centering
        centeredPhase.style.transform = `translate(-50%, -50%) rotate(${-degrees}deg)`;

        requestAnimationFrame(updateRotation);
    }

    moonPhases.forEach(phase => {
        phase.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const href = phase.getAttribute('data-href');

            if (phase === centeredPhase) {
                if (href) {
                    document.body.classList.remove("fade-in");
                    document.body.classList.add("fade-out");
                    setTimeout(() => {
                        window.location = href;
                    }, 500);
                }
            } else {
                moonPhases.forEach(p => {
                    p.classList.remove('centered', 'dimmed');
                    if (p !== phase) p.classList.add('dimmed');
                    p.style.transform = ''; // reset transform on others
                });
                phase.classList.add('centered');
                centeredPhase = phase;

                // Start updating rotation for centered phase
                requestAnimationFrame(updateRotation);
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.moon-phase')) {
            moonPhases.forEach(p => {
                p.classList.remove('centered', 'dimmed');
                p.style.transform = ''; // reset transforms
            });
            centeredPhase = null;
        }
    });
});