require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const productRoutes = require('./routes/product-routes');
const homeRoutes = require('./routes/new-routes');
const BookRoutes = require('./routes/bookRoutes');
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.log("MongoDB connection error:", e));

app.use(express.json());

app.use('/ref',BookRoutes)
app.use('/products', productRoutes);
app.use('/api', homeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is now running on port ${process.env.PORT}`);
});
