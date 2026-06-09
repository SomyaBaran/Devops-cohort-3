const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world 2");
});


app.listen(3000);