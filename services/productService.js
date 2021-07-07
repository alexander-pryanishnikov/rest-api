const { apiGet } = require('./apiService')

module.exports.getProductStock = async (productId) => {
    return await apiGet(`/products/${productId}/quantity`);
} 