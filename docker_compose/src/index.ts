import express from "express";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
    res.json({
        message: "post endpoint"
    });
});
app.get("/", (req, res) => {
    res.json({
        message: "get endpoint"
    });
});
app.listen(3000, () => {
    console.log("post is running on 3000");
});