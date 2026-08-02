import express from 'express';
const app = express();

app.get("/", (req, res) => res.send("hello world")); // health checker

app.get("/cpu", (req, res) => {
    for (let i = 0; i < 1000000; i++) {
        Math.random();
    }
    res.send("hello world");
});
app.listen(3000);
