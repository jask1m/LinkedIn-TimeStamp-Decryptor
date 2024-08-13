const { extractId, toUnixTimeStamp, getTimeStamp } = require("./helpers");

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.options('*', cors());

app.post('/', (req, res) => {
  const { url } = req.body;
  const id = extractId(url);
  if (id) {
    binary_rep = toUnixTimeStamp(id);
    const timestamp = getTimeStamp(binary_rep);
    res.send(timestamp);
  } else {
    res.status(400).json({ error: "Invalid URL, please try again" });
  }
});

module.exports = app;
