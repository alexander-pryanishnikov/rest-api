const { Router } = require('express')
const router = new Router()

const { getOrderInfo } = require('./services/orderService');
const getStoresInfo = require('./services/storesInfoService');
const CreateOrderService = require('./services/createOrderService')
const app = require("express");

// вернуть клиенту номер, состав заказа, информацию о
// магазине, информацию о доставке.
router.post('/api/cart', async (req, res) => {
  const { products: cartProducts, clientId, dateDelivery } = req.body;

  const createOrderService = new CreateOrderService();
  await createOrderService.findStores(cartProducts);
  const orderId = await createOrderService.createOrder(clientId, dateDelivery);
  if (orderId) {
    const storesIds = createOrderService.getStoresIds();
    res.json({
      ...(await getOrderInfo(orderId)),
      stores: (await getStoresInfo(storesIds)),
    })
  }
})


module.exports = router