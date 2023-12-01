import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Curso de Node.JS");
});

server.listen(PORT, () => {
    console.log("Servidor ouvindo!");
    console.log("Na porta: http://localhost:3000");
});