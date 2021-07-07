const { apiGet, apiPost } = require('./services/apiService')

async function reserveStore() {
  for await (const storeId of allStoreIds) {
    const response = await apiGet(`${storeId}/stock?productId=${productIds}`);
    for (const stock of response.stocks) {
      if (productsById[stock.productId]) {
        const reserveCount = Math.min(stock.quantity, productsById[stock.productId]);
        try {
          // Делаем резерв
          const response = apiPost('reserves', {
            storeId: storeId,
              productId: stock.productId,
              count: reserveCount
          });
          if (response.reserveid) {
            reserves.push({
              reserveId: response.reserveid
            });
            productsById[stock.productId] -= reserveCount
            orderStoresIds.add(storeId)
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

module.exports = reserveStore
