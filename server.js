import express from "express";
import path from "path";
import { render } from "./dist/server/server/server.js";

const app = express();
const port = process.env.PORT || 5172;

app.use("/dist", express.static(path.resolve("./dist/client/client/client.js")));

app.get("/ssr", (req, res) => {
    try {
        const url = req.query.url || '/';
        const { html } = render(url);
        console.log("SSR rendered for URL:", url);
        console.log("Generated HTML:", html);
        res.send(html);
    } catch (error) {
        console.error("Error during SSR:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`SSR server is running at http://localhost:${port}`);
});