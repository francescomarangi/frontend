//centralizza tutte le chiamate HTTP verso il backend

import axios from 'axios';
const API_BASE = "https://polizone-backend.onrender.com"; 

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("polizone_token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
}

export async function register(username, email, password) {
    const response = await api.post("/auth/register", { username, email, password });
    return response.data;
}

export async function logout() {
    const response = await api.post("/auth/logout");
    return response.data;
}


export async function getProducts(filters = {}) {
    const response = await api.get("/products", { params: filters });
    return response.data;
}

export async function getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export async function addOrderItems(orderData) {
    const response = await api.post("/orders", orderData);
    return response.data;
}

export async function getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
}

export async function updateOrderToPaid(id, paymentResult) {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
}

export async function createPaymentIntent(paymentData) {
    const response = await api.post("/orders/payment-intent", paymentData);
    return response.data;
}

export async function healthCheck() {
    const response = await api.get("/health");
    return response.data;
}
export default api;