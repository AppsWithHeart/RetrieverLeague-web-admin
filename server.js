/**
 * Created by uroszivaljevic on 10/17/17.
 */

const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/dist/app/"));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname + "/dist/app/", "index.html"));
// });

app.listen(port, function () {
    console.log("SERVER START");
});
