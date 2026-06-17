/**
 * API Integration Module for Customer Website
 */

const API_BASE_URL = "http://localhost:6000/api";

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

/**
 * INQUIRIES API
 */

// Submit new inquiry
async function submitInquiry(inquiry) {
    try {
        const data = await apiCall("/inquiries", "POST", inquiry);
        return data;
    } catch (error) {
        throw new Error("Failed to submit inquiry: " + error.message);
    }
}
