const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB подключена'));

app.use('/api', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on  ${process.env.PORT} port`);
});