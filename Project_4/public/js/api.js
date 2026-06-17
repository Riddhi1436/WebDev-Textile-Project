/**
 * API Integration Module
 * Handles all API calls to the backend
 */

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall(endpoint, method = "GET", data = null) {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]:`, error);
        throw error;
    }
}

/**
 * PRODUCTS API
 */

// Get all products
async function getProducts() {
    try {
        const data = await apiCall("/products", "GET");
        return data;
    } catch (error) {
        throw new Error("Failed to load products: " + error.message);
    }
}

// Create new product
async function createProduct(product) {
    try {
        const data = await apiCall("/products", "POST", product);
        return data;
    } catch (error) {
        throw new Error("Failed to create product: " + error.message);
    }
}

// Update product
async function updateProduct(id, product) {
    try {
        const data = await apiCall(`/products/${id}`, "PUT", product);
        return data;
    } catch (error) {
        throw new Error("Failed to update product: " + error.message);
    }
}

// Delete product
async function deleteProduct(id) {
    try {
        const data = await apiCall(`/products/${id}`, "DELETE");
        return data;
    } catch (error) {
        throw new Error("Failed to delete product: " + error.message);
    }
}

/**
 * INQUIRIES API
 */

// Get all inquiries
async function getInquiries() {
    try {
        const data = await apiCall("/inquiries", "GET");
        return data;
    } catch (error) {
        throw new Error("Failed to load inquiries: " + error.message);
    }
}

// Submit new inquiry
async function submitInquiry(inquiry) {
    try {
        const data = await apiCall("/inquiries", "POST", inquiry);
        return data;
    } catch (error) {
        throw new Error("Failed to submit inquiry: " + error.message);
    }
}

// Update inquiry
async function updateInquiry(id, inquiry) {
    try {
        const data = await apiCall(`/inquiries/${id}`, "PUT", inquiry);
        return data;
    } catch (error) {
        throw new Error("Failed to update inquiry: " + error.message);
    }
}

// Delete inquiry
async function deleteInquiry(id) {
    try {
        const data = await apiCall(`/inquiries/${id}`, "DELETE");
        return data;
    } catch (error) {
        throw new Error("Failed to delete inquiry: " + error.message);
    }
}
