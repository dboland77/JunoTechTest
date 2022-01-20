const handler = (event, context) => {
  let shipments = JSON.parse(event.body);

  const JunoOrders = filterNonJuno(shipments.ORDERS);

  const fulfilled_orders = fulfilled(JunoOrders);
  const cancelled_orders = cancelled(JunoOrders);

  return { fulfilled_orders, cancelled_orders };
};

// Need to filter the results for non-Juno orders
// Need to create separate filtered results so will change this to a function
// and create fulfiled and cancelled ones

const filterNonJuno = (orders) => {
  return orders.filter((order) => order.O_ID === order.OMS_ORDER_ID);
};

const fulfilled = (orders) => {
  return orders.filter((order) =>
    order.ORDER_LINES.some((orderLine) => parseInt(orderLine.QUANTITY) > 0)
  );
};

const cancelled = (orders) => {
  return orders.filter(
    (order) =>
      !order.ORDER_LINES.some((orderLine) => parseInt(orderLine.QUANTITY) > 0)
  );
};

module.exports = handler;
