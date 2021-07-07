const { apiGet } = require('./apiService')

module.exports.getStoreInfo = async (storeId) => {
    return await apiGet(`/stores/${storeId}`);
} 