require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.SSR_PORT || 5172;
const host = process.env.SSR_HOST || "0.0.0.0";

const logFile = path.join(__dirname, "ssr-debug.log");

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage);
}

// app.use("/dist", express.static(path.resolve("./public/build/client/client.js")));

app.get("/server", async (req, res) => {
    try {
        log("Received request for URL: " + req.query.url);
        const url = req.query.url || '/';
        log("Importing render function...");
        const { render } = await import("../public/build/server/server.js");
        log("Render function imported");
        const { html } = render(url);
        log("SSR rendered for URL: " + url + " HTML length: " + html.length);
        res.send(html);
    } catch (error) {
        log("Error during SSR: " + error.message + "\n" + error.stack);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});

app.listen(port, host, () => {
    log(`SSR server is running at http://${host}:${port}`);
});