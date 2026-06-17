const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const form = document.querySelector(".contact form");
const formResponse = document.querySelector(".form-response");

// Mobile menu toggle
if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Close mobile menu on nav link click
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});

// Highlight active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
setActiveNavLink();

// Contact form handling
if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = this.elements.name.value.trim();
        const email = this.elements.email.value.trim();
        const message = this.elements.message.value.trim();

        if (!name || !email || !message) {
            formResponse.textContent =
                "Please complete all fields before sending.";
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/inquiries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        message
                    })
                }
            );

            const result = await response.json();

            formResponse.textContent = result.message;

            this.reset();

        } catch (error) {
            formResponse.textContent =
                "Could not connect to the server.";
            console.error(error);
        }
    });
}
