const { getStoreInfo } = require('./storeService');

module.exports = async (storesIds) => {
    const promises = storesIds.map(async (storeId) => {
        return await getStoreInfo(storeId);
    });
    return Promise.all(promises);
}