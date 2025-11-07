async function basicQueries(db) {
  const collection = db.collection("energy_readings");

  console.log("\n=== All readings for MTR001 ===");
  console.table(await collection.find({ meterId: "MTR001" }).toArray());

  console.log("\n=== Readings between 10:00 and 12:00 on 2025-10-29 ===");
  console.table(await collection.find({
    timestamp: {
      $gte: new Date("2025-10-29T10:00:00Z"),
      $lte: new Date("2025-10-29T12:00:00Z")
    }
  }).toArray());
}

module.exports = basicQueries;
