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
            // Remove active class from btn
            carouselButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            // Add active class to current btn
            button.classList.add("active");

            const targetCarouselId = button.getAttribute("data-carousel");
            const targetCarousel = document.getElementById(targetCarouselId);

            // Handle case where targetCarousel doesn't exist
            if (!targetCarousel) return;

            // If the same button is clicked again, collapse the container
            if (currentCarouselId === targetCarouselId) {
                carouselContainer.classList.remove("show");

                // Remove active class from btn
                button.classList.remove("active");

                currentCarouselId = null;
                return;
            }

            // Ensure carousels are initially hidden
            carousels.forEach((carousel) => {
                carousel.classList.add("d-none");
            });
            // Show the selected carousel
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
    const moonPhases = document.querySelectorAll('.moon-phase');
    let centeredPhase = null;

    const rotationDuration = 80000; // 80s for full rotation

    function updateRotation() {
        if (!centeredPhase) return; // if no centered moon, no counter rotation necessary

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
                    // remove centered and dimmed for all phases
                    p.classList.remove('centered', 'dimmed');
                    // if the phase isn't the one centered, dim it
                    if (p !== phase) p.classList.add('dimmed');
                    p.style.transform = ''; // reset transform on others
                });
                // Add the centered class to the phase clicked
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

    // Katabasis card logic to center the card and display katabasis-text-container
    const katabasisCards = document.querySelectorAll('.katabasis-card');

    katabasisCards.forEach(card => {
        card.addEventListener('click', () => {
            const textContainer = card.querySelector('.katabasis-text-container');
            const heading = card.querySelector('.katabasis-heading');
            
            const isCentered = card.classList.contains('center');

            // Uncenter the other cards, hide all other text containers and show their headings when clicking on a different card
            katabasisCards.forEach(c => {
                const otherText = c.querySelector('.katabasis-text-container');
                const otherHeading = c.querySelector('.katabasis-heading');
                
                c.classList.remove('center');
                otherText.classList.remove('show');
                otherHeading.classList.remove('hidden');
            });
    
            if (!isCentered) {
                // Center the card
                card.classList.add('center');
                textContainer.classList.add('show');
                heading.classList.add('hidden');
    
            } else {
                // Uncenter the card
                card.classList.remove('center');
                textContainer.classList.remove('show');
                heading.classList.remove('hidden');
            }
        });
    });
});