document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

// Scroll Animations
const sections = document.querySelectorAll('.fade-in, .slide-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));
