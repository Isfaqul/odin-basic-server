const fs = require("fs/promises");
const http = require("http");

const PORT = 8080;
const HOST = "localhost";

const server = http.createServer((req, res) => {
  let path = "./pages/";

  if (req.url === "/") {
    res.statusCode = 200;
    path += "index.html";
  } else if (req.url === "/about") {
    res.statusCode = 200;
    path += "about.html";
  } else if (req.url === "/contact-me") {
    res.statusCode = 200;
    path += "contact-me.html";
  } else {
    res.statusCode = 404;
    path += "404.html";
  }

  serveFile(path, res); // Serve the file accordingly
});

server.listen(PORT, HOST);

async function serveFile(path, res) {
  try {
    const data = await fs.readFile(path, "utf-8");
    res.end(data);
  } catch (error) {
    res.statusCode = 500;
    console.log(error);
    res.end();
  }
}
