const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tour.model');
dotenv.config({ path: './config.env' });

// db Connect
const mongoUri = process.env.DB_URI;
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('We are Connected 😁');
  } catch (error) {
    console.log('An Error detected y SAHBI 😢:', error);
  }
};

connectToDB();

// Read JSON File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import DATA into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete Data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
