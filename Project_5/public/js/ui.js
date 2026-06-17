/**
 * UI Module for Customer Website
 */

/**
 * Show Alert
 */
function showAlert(message, type = "info") {
    const alertBox = document.getElementById("alertBox");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    alertBox.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Load and display products
 */
async function loadProducts() {
    const container = document.getElementById("productsContainer");
    
    try {
        container.innerHTML = '<p class="loading">Loading products...</p>';
        
        const products = await getProducts();
        
        if (!products || products.length === 0) {
            container.innerHTML = '<p class="loading">No products available at the moment</p>';
            return;
        }
        
        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}">` : "🧵"}
                </div>
                <div class="product-content">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    <div class="product-price">₹${parseFloat(product.price).toFixed(2)}</div>
                </div>
            </div>
        `).join("");
        
    } catch (error) {
        console.error("Error loading products:", error);
        container.innerHTML = `<p class="loading" style="color: red;">Error: ${error.message}</p>`;
        showAlert(error.message, "error");
    }
}

/**
 * Submit inquiry form
 */
async function submitInquiry(event) {
    event.preventDefault();
    
    try {
        const inquiry = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };
        
        // Validate
        if (!inquiry.name || !inquiry.email || !inquiry.message) {
            showAlert("Please fill all fields", "error");
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inquiry.email)) {
            showAlert("Please enter a valid email address", "error");
            return;
        }
        
        await submitInquiry(inquiry);
        
        // Clear form
        event.target.reset();
        
        showAlert("✅ Thank you! We will get back to you soon.", "success");
        
    } catch (error) {
        console.error("Error submitting inquiry:", error);
        showAlert(error.message, "error");
    }
}

/**
 * Scroll to sections
 */
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

/**
 * Initialize on page load
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Customer Website Loaded");
    
    // Load initial products
    loadProducts();
    
    // Check backend connection
    apiCall("/products", "GET")
        .then(() => {
            console.log("✅ Backend connected successfully");
            showAlert("✅ Welcome! Browse our products.", "success");
        })
        .catch(() => {
            console.error("❌ Cannot connect to backend");
            showAlert("⚠️ Connection issue. Please try again.", "error");
        });
});
