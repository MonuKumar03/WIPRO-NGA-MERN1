// USER STORY 1: Order Fetching using Callbacks

function fetchOrder(orderId, callback) {
  console.log("Fetching order...");

  setTimeout(() => {
    const mockDB = {
      101: { id: 101, item: "Pizza", price: 299 },
      102: { id: 102, item: "Burger", price: 149 }
    };

    if (!mockDB[orderId]) {
      return callback("Order not found!", null);
    }

    callback(null, mockDB[orderId]);
  }, 1000);
}

fetchOrder(101, (err, order) => {
  if (err) {
    return console.log("Error:", err);
  }
  console.log("Order fetched successfully:", order);
});

fetchOrder(999, (err, order) => {
  if (err) {
    return console.log("Error:", err);
  }
  console.log("Order fetched successfully:", order);
});
