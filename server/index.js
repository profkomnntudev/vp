const express = require("express");
const path = require('path');
const pg = require('pg');


const conString = "postgres://fczedzaw:CxR7MBjzFFI1_PcRXKFdb8aaALiRsifO@castor.db.elephantsql.com/fczedzaw";

/* in requests:
const client = new pg.Client(conString);
client.connect();
client.query("insert sql query")
*/

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});