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
    const { ORDERS: orders } = data;
    expect(orders.length).toEqual(2);

    // Update the test to check for the matching order ID's
    // O_ID 50022251 is excluded as the OMS_ORDERID = 135103229

    const [order1, order2] = orders;
    expect(order1.O_ID).toEqual("12345");
    expect(order2.O_ID).toEqual("500324412");
  });
});
