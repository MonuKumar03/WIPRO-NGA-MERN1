// USER STORY 2: Payment Processing using Promises

function processPayment(order) {
  return new Promise((resolve, reject) => {
    console.log("Processing payment...");

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (!success) {
        return reject("Payment failed due to transaction issue.");
      }

      resolve(`Payment successful for order ID ${order.id}`);
    }, 1000);
  });
}

const sampleOrder = { id: 101, item: "Pizza", price: 299 };

processPayment(sampleOrder)
  .then(message => {
    console.log(message);
  })
  .catch(err => {
    console.log("Error:", err);
  });
