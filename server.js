const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

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

const port = process.env.PORT || 3000; // Added `const` to declare the variable properly
app.listen(port, () => {
  console.log('Yep SERVER is UP!!: ', port);
});
