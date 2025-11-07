const { MongoClient } = require('mongodb');
const basicQueries = require('./queries/basic_queries');
const aggregations = require('./queries/aggregations');
const indexOptimization = require('./queries/index_optimization');
const fs = require('fs');

const uri = "mongodb+srv://monujaiswalk123_db_user:Atlas123@eduprodb.dxdiyz3.mongodb.net/";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("GreenPlusDB");

    // Use collection name with underscore (safer than hyphen)
    const collectionName = "energy_readings";
    const collection = db.collection(collectionName);

    // Check if collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log("Collection empty, inserting data...");

      // Read JSON data
      const rawData = fs.readFileSync('./data/energy_readings.json', 'utf8');
      const data = JSON.parse(rawData);

      // Convert timestamp strings to Date objects
      const formattedData = data.map(d => ({
        ...d,
        timestamp: new Date(d.timestamp)
      }));

      // Insert into MongoDB
      await collection.insertMany(formattedData);
      console.log(`✅ Inserted ${formattedData.length} documents`);
    } else {
      console.log(`Collection already has ${count} documents`);
    }

    // Create indexes
    await indexOptimization(db);

    // Run queries
    await basicQueries(db);
    await aggregations(db);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
