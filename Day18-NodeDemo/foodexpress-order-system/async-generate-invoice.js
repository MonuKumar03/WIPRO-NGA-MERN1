// USER STORY 3: Invoice Generation using Async/Await

function generateInvoice(order) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        invoiceId: "INV-" + Date.now(),
        orderId: order.id,
        amount: order.price,
        message: "Invoice generated successfully"
      });
    }, 1000);
  });
}

async function startInvoiceGeneration() {
  try {
    console.log("Generating invoice...");

    const order = { id: 101, item: "Pizza", price: 299 };

    const invoice = await generateInvoice(order);

    await new Promise(res => setTimeout(res, 1000));

    console.log("Invoice:", invoice);
  } catch (err) {
    console.log("Error:", err);
  }
}

startInvoiceGeneration();
