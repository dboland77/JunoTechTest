const handler = (event, context) => {
  let shipments = JSON.parse(event.body);

  // Need to filter the results for non-Juno orders
  shipments.ORDERS = shipments.ORDERS.filter(
    (order) => order.O_ID === order.OMS_ORDER_ID
  );

  return shipments;
};

module.exports = handler;
