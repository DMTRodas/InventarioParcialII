import axios from 'axios';

const API_URL = 'http://localhost:8080/api/items';

class ItemService {
    getAllProducts() {
        return axios.get(API_URL);
    }

    createProduct(product) {
        return axios.post(API_URL, product); // Cambié "item" por "product"
    }

    updateProduct(productId, product) {
        return axios.put(`${API_URL}/${productId}`, product); // Cambié "item" por "product"
    }

    deleteProduct(productId) {
        return axios.delete(`${API_URL}/${productId}`);
    }
}

const itemServiceInstance = new ItemService();
export default itemServiceInstance;

