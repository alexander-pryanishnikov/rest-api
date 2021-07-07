const { apiGet, apiPost } = require('./apiService') 

module.exports.createOrder = (clientId, dateDelivery, reserves) => { 
  
    return apiPost('/orders', {
      clientID: clientId,
      deliveryDate: dateDelivery,
      reserveList: reserves,
    });

}

module.exports.getOrderInfo = (orderId) => { 
  
    return apiGet('/orders/${orderId}');

}