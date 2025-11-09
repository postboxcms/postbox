import express from "express";
import path from "path";
import { render } from "./dist/server/server.js";

const app = express();
const port = process.env.PORT || 3000;

app.use('/dist',express.static(path.resolve("./dist/client")));

app.get("/ssr", (req, res) => {
    try {
        const url = req.query.url || '/';
        const { html } = render(url);
        res.send(html);
    } catch (error) {
        console.error("Error during SSR:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`SSR server is running at http://localhost:${port}`);
});