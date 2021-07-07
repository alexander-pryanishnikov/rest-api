const { getProductStock } = require('./productService');
const { createReserve } = require('./reserveService');
const { createOrder } = require('./orderService');

class CreateOrderService {
	orderStoresIds = new Set();
	reserves = [];

	async findStores(cartProducts) {
		for await (let { id: productId, qnt: productQuantity } of cartProducts) {
			const stocks = await getProductStock(productId);
			for await (const store of stocks.stocksByStores) {
				const reserveCount = Math.min(store.quantity, productQuantity);
				const response = await createReserve(store.storeId, productId, productQuantity);
				if (response.reserveId) {
					productQuantity -= reserveCount;
					this.applyReservation(response.reserveId, store.storeId);
				}
				if (productQuantity === 0) {
					break;
				}
			}
		}
	}

	async applyReservation(reserveId, storeId) {
		this.reserves.push({
			reserveId
		});
		this.orderStoresIds.add(storeId)
	}

	async createOrder(clientId, dateDelivery) {
		const response = await createOrder(clientId, dateDelivery, this.reserves);
		if (response.orderId) {
			return response.orderId;
		} else {
			throw Error('Заказ не создан')
		}
	}

    getStoresIds() {
        return Array.from(this.orderStoresIds);
    }
}

module.exports = CreateOrderService;