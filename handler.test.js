const fs = require("fs");
const handler = require("./handler");

const event = {
  body: fs.readFileSync("./fixtures/shipments.json", "utf8"),
};

const context = {
  accountReference: "acme",
};

describe("Handler", () => {
  it("Parses the event data into JSON", () => {
    const data = handler(event, context);

    // Update the test because 2 results rather than 3 are now returned
    // Update to reflect the new return from handler
    const allOrders = Object.keys(data).flatMap((key) => data[key]);
    expect(allOrders.length).toEqual(2);

    // Update the test to check for the matching order ID's
    // O_ID 50022251 is excluded as the OMS_ORDERID = 135103229

    const [order1, order2] = allOrders;
    expect(order1.O_ID).toEqual("12345");
    expect(order2.O_ID).toEqual("500324412");
  });
  it("Check cancelled orders have quantity = 0", () => {
    const { _, cancelled_orders } = handler(event, context);

    const [cancelledOrder] = cancelled_orders;

    const orderQuantities = cancelledOrder.ORDER_LINES.map((orderLine) =>
      parseInt(orderLine.QUANTITY)
    );

    expect(Math.max.apply(this, orderQuantities)).toBe(0);
  });

  it("Check remaining orders are fulfillments", () => {
    const { fulfilled_orders, _ } = handler(event, context);

    const [fulfilledOrder] = fulfilled_orders;

    const orderQuantities = fulfilledOrder.ORDER_LINES.map((orderLine) =>
      parseInt(orderLine.QUANTITY)
    );

    expect(Math.max.apply(this, orderQuantities)).toBeGreaterThanOrEqual(1);
  });
});
