// Fade in on page load
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

// Fade out on link click
document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    // Only apply for internal links
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location = link.href;
            }, 500); // match transition time
        });
    }
});
