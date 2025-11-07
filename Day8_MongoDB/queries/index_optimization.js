async function indexOptimization(db) {
  const collection = db.collection("energy_readings");

  console.log("\n=== Creating index on timestamp ===");
  await collection.createIndex({ timestamp: 1 });

  console.log("\n=== Creating compound index on meterId + timestamp ===");
  await collection.createIndex({ meterId: 1, timestamp: 1 });

  console.log("\n=== Current indexes ===");
  console.table(await collection.indexes());
}

module.exports = indexOptimization;
