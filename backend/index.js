const express = require('express');
const cors = require('cors');
const app = express();
const statisticsRoute = require('./routes/statisticsRoute');
const visualizationsRoute = require('./routes/visualizationsRoute');
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
}
);

app.use('/statistics', statisticsRoute);
app.use('/visualizations', visualizationsRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});