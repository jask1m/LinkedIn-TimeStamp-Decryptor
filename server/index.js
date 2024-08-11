const { extractId, toUnixTimeStamp, getTimeStamp } = require("./utils/helpers");

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log(`server running at http://localhost:4000`);
});

app.post('/', (req, res) => {
  const {url} = req.body;
  const id = extractId(url);
  if (id) {
    binary_rep = toUnixTimeStamp(id);
    const timestamp = getTimeStamp(binary_rep);
    res.send(timestamp);
  } else {
    throw new Error("invalid URL please try again");
  }
});
