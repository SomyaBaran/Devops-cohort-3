import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
const app = express();


app.use(express.json());

app.post("/", async (req, res) => {
    await prisma.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString(),

        }
    })
    res.json({
        message: "post endpoint"
    });
});
app.get("/", async (req, res) => {
    const data = await prisma.user.findMany();
    res.json({ data });
});


app.listen(3000, () => {
    console.log("post is running on 3000");
});