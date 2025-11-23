require("dotenv").config();
const express = require("express");
const { render } = require("../public/build/server/server.js");

const app = express();
const port = process.env.SSR_PORT || 5172;

// app.use("/dist", express.static(path.resolve("./public/build/client/client.js")));

app.get("/server", (req, res) => {
    try {
        const url = req.query.url || '/';
        const { html } = render(url);
        console.log("SSR rendered for URL:", url);
        res.send(html);
    } catch (error) {
        console.error("Error during SSR:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`SSR server is running at http://localhost:${port}`);
});