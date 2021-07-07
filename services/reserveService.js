const { apiPost } = require('./apiService');

module.exports.createReserve = async (storeId, productId, count) => {
  
    return await apiPost('reserves', {
        storeId: storeId,
        productId: stock.productId,
        count: reserveCount
    });
};