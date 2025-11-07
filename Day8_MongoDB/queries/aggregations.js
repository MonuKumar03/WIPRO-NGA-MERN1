async function aggregations(db) {
  const collection = db.collection("energy_readings");

  console.log("\n=== Total energy per meter ===");
  console.table(await collection.aggregate([
    { $group: { _id: "$meterId", totalEnergy_kWh: { $sum: "$energy_kWh" } } }
  ]).toArray());

  console.log("\n=== Average temperature by location ===");
  console.table(await collection.aggregate([
    { $group: { _id: "$location", avgTemperature_C: { $avg: "$temperature_C" } } }
  ]).toArray());

  console.log("\n=== Hourly energy consumption trend ===");
  console.table(await collection.aggregate([
    {
      $group: {
        _id: { meter: "$meterId", hour: { $hour: "$timestamp" } },
        totalEnergy_kWh: { $sum: "$energy_kWh" }
      }
    },
    { $sort: { "_id.hour": 1 } }
  ]).toArray());

  console.log("\n=== Comparing average energy usage across meters ===");
  console.table(await collection.aggregate([
    { $group: { _id: "$meterId", avgEnergy_kWh: { $avg: "$energy_kWh" } } },
    { $sort: { avgEnergy_kWh: -1 } }
  ]).toArray());

  console.log("\n=== High usage hours (>6 kWh) ===");
  console.table(await collection.aggregate([
    {
      $group: {
        _id: { meter: "$meterId", hour: { $hour: "$timestamp" } },
        avgEnergy_kWh: { $avg: "$energy_kWh" }
      }
    },
    { $match: { avgEnergy_kWh: { $gt: 6 } } }
  ]).toArray());
}

module.exports = aggregations;
