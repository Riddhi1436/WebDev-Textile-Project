/**
 * UI Module
 * Handles all DOM manipulations and user interactions
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
 * PRODUCTS UI
 */

// Load and display products
async function loadProducts() {
    const container = document.getElementById("productsContainer");
    
    try {
        container.innerHTML = '<p class="loading">Loading products...</p>';
        
        const products = await getProducts();
        
        if (!products || products.length === 0) {
            container.innerHTML = '<p class="loading">No products available</p>';
            return;
        }
        
        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">📦</div>
                <div class="product-content">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-desc">${product.description}</div>
                    <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-secondary" onclick="editProduct('${product._id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProductUI('${product._id}')">Delete</button>
                    </div>
                </div>
            </div>
        `).join("");
        
    } catch (error) {
        console.error("Error loading products:", error);
        container.innerHTML = `<p class="loading" style="color: red;">Error: ${error.message}</p>`;
        showAlert(error.message, "error");
    }
}

// Toggle product form visibility
function toggleProductForm() {
    const form = document.getElementById("productForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Submit new product
async function submitProduct(event) {
    event.preventDefault();
    
    try {
        const product = {
            name: document.getElementById("productName").value,
            description: document.getElementById("productDesc").value,
            price: parseFloat(document.getElementById("productPrice").value),
            category: document.getElementById("productCategory").value,
            image: document.getElementById("productImage").value || ""
        };
        
        // Validate
        if (!product.name || !product.description || !product.price || !product.category) {
            showAlert("Please fill all required fields", "error");
            return;
        }
        
        await createProduct(product);
        
        // Clear form
        event.target.reset();
        toggleProductForm();
        
        showAlert("Product created successfully!", "success");
        await loadProducts();
        
    } catch (error) {
        console.error("Error creating product:", error);
        showAlert(error.message, "error");
    }
}

// Delete product
async function deleteProductUI(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }
    
    try {
        await deleteProduct(id);
        showAlert("Product deleted successfully!", "success");
        await loadProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
        showAlert(error.message, "error");
    }
}

// Edit product (placeholder - can be expanded)
function editProduct(id) {
    showAlert("Edit feature coming soon!", "info");
}

/**
 * INQUIRIES UI
 */

// Load and display inquiries
async function loadInquiries() {
    const container = document.getElementById("inquiriesContainer");
    
    try {
        container.innerHTML = '<p class="loading">Loading inquiries...</p>';
        
        const inquiries = await getInquiries();
        
        if (!inquiries || inquiries.length === 0) {
            container.innerHTML = '<p class="loading">No inquiries yet</p>';
            return;
        }
        
        container.innerHTML = inquiries.map(inquiry => `
            <div class="inquiry-item">
                <div class="inquiry-name">👤 ${inquiry.name}</div>
                <div class="inquiry-email">📧 ${inquiry.email}</div>
                <div class="inquiry-message"><strong>Message:</strong> ${inquiry.message}</div>
                <div class="inquiry-date">Submitted: ${new Date(inquiry.createdAt).toLocaleString()}</div>
            </div>
        `).join("");
        
    } catch (error) {
        console.error("Error loading inquiries:", error);
        container.innerHTML = `<p class="loading" style="color: red;">Error: ${error.message}</p>`;
        showAlert(error.message, "error");
    }
}

// Submit inquiry form
async function submitInquiry(event) {
    event.preventDefault();
    
    try {
        const inquiry = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
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
        
        showAlert("✅ Inquiry submitted successfully! We'll get back to you soon.", "success");
        
        // Reload inquiries list
        setTimeout(() => {
            loadInquiries();
        }, 1000);
        
    } catch (error) {
        console.error("Error submitting inquiry:", error);
        showAlert(error.message, "error");
    }
}

// Scroll to contact section
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

/**
 * Initialize on page load
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded - Frontend Integration Active");
    
    // Load initial data
    loadProducts();
    loadInquiries();
    
    // Check backend connection
    apiCall("/products", "GET")
        .then(() => {
            console.log("✅ Backend connected successfully");
            showAlert("✅ Connected to backend server", "success");
        })
        .catch(() => {
            console.error("❌ Cannot connect to backend");
            showAlert("❌ Failed to connect to backend. Make sure all servers are running.", "error");
        });
});
